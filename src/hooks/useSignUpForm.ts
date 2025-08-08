import { useState, useEffect } from 'react';
import { FormData, FormErrors } from '../types/registration';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api/v1';

export const useSignUpForm = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
    displayName: '',
    sportsInterested: [],
    skillLevel: 2.5,
    zipCode: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [cityName, setCityName] = useState('');

  // Fetch city name from ZIP code
  const fetchCityFromZip = async (zipCode: string) => {
    if (zipCode.length === 5) {
      try {
        const response = await fetch(`https://api.zippopotam.us/US/${zipCode}`);
        if (response.ok) {
          const data = await response.json();
          const city = data.places[0]['place name'];
          const state = data.places[0]['state abbreviation'];
          setCityName(`${city}, ${state}`);
        } else {
          setCityName('');
        }
      } catch (error) {
        setCityName('');
      }
    } else {
      setCityName('');
    }
  };

  // Debounced ZIP code lookup
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (formData.zipCode.length === 5) {
        fetchCityFromZip(formData.zipCode);
      } else {
        setCityName('');
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [formData.zipCode]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Full name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Confirm email validation
    if (!formData.confirmEmail) {
      newErrors.confirmEmail = 'Please confirm your email';
    } else if (formData.email !== formData.confirmEmail) {
      newErrors.confirmEmail = 'Email addresses do not match';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Display name validation
    if (!formData.displayName) {
      newErrors.displayName = 'Please select a display name';
    }

    // Sports interested validation
    if (formData.sportsInterested.length === 0) {
      newErrors.sportsInterested = 'Please select at least one sport';
    }

    // Skill level validation
    if (formData.skillLevel === 0) {
      newErrors.skillLevel = 'Please select your skill level';
    }

    // ZIP code validation
    const zipRegex = /^\d{5}(-\d{4})?$/;
    if (!formData.zipCode) {
      newErrors.zipCode = 'ZIP code is required';
    } else if (!zipRegex.test(formData.zipCode)) {
      newErrors.zipCode = 'Please enter a valid ZIP code';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Convert skillLevel to number if it's the skillLevel field
    const processedValue = name === 'skillLevel' ? parseFloat(value) || 0 : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setFormData(prev => ({
      ...prev,
      skillLevel: value
    }));
    
    if (errors.skillLevel) {
      setErrors(prev => ({
        ...prev,
        skillLevel: undefined
      }));
    }
  };

  const handleSportsSelection = (sport: string) => {
    setFormData(prev => {
      const currentSports = [...prev.sportsInterested];
      const sportIndex = currentSports.indexOf(sport);
      
      if (sportIndex > -1) {
        // Remove sport if already selected
        currentSports.splice(sportIndex, 1);
      } else {
        // Add sport if not selected
        currentSports.push(sport);
      }
      
      return {
        ...prev,
        sportsInterested: currentSports
      };
    });
    
    if (errors.sportsInterested) {
      setErrors(prev => ({
        ...prev,
        sportsInterested: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors({});
    setSuccess('');

    try {
      // Call the backend API endpoint that handles both Firebase and PostgreSQL
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          fullName: formData.fullName,
          displayName: formData.displayName,
          sportsInterested: formData.sportsInterested,
          skillLevel: formData.skillLevel,
          zipCode: formData.zipCode,
          cityName: cityName
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Sign up failed');
      }

      setSuccess(data.message || 'Account created successfully!');
      setFormData({
        fullName: '',
        email: '',
        confirmEmail: '',
        password: '',
        confirmPassword: '',
        displayName: '',
        sportsInterested: [],
        skillLevel: 2.5,
        zipCode: ''
      });
      setCityName('');
    } catch (err: any) {
      setErrors({
        general: err.message || 'Sign up failed'
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    errors,
    loading,
    success,
    cityName,
    handleInputChange,
    handleSliderChange,
    handleSportsSelection,
    handleSubmit
  };
};