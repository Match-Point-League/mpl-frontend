import { useState, useEffect } from 'react';
import { RegistrationFormData, RegistrationErrors } from '../types';
import { signUp } from '../services/authService';

export const useSignUpForm = () => {
  const [formData, setFormData] = useState<RegistrationFormData>({
    fullName: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
    displayName: '',
    preferredSports: [],
    skillLevel: 2.5,
    zipCode: ''
  });
  const [errors, setErrors] = useState<RegistrationErrors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [cityName, setCityName] = useState('');

  // Centralized error handling function for setting the city name
  const handleError = (error: string, field?: keyof RegistrationErrors) => {
    setCityName('');
    if (field) {
      setErrors(prev => ({
        ...prev,
        [field]: error
      }));
    } else {
      setErrors(prev => ({
        ...prev,
        general: error
      }));
    }
  };

  // Clear specific error
  const clearError = (field: keyof RegistrationErrors) => {
    setErrors(prev => ({
      ...prev,
      [field]: undefined
    }));
  };

  // Fetch city name from ZIP code
  const fetchCityFromZip = async (zipCode: string) => {
    if (zipCode.length !== 5) {
      setCityName('');
      clearError('zipCode');
      return;
    }

    let success = false;
    try {
      const response = await fetch(`https://api.zippopotam.us/US/${zipCode}`);
      if (response.ok) {
        const data = await response.json();
        const city = data.places[0]['place name'];
        const state = data.places[0]['state abbreviation'];
        setCityName(`${city}, ${state}`);
        clearError('zipCode');
        success = true;
      }
    } catch (error) {
      // Do nothing, let the error handling below handle it
    }

    if (!success) {
      handleError('Invalid ZIP code', 'zipCode');
    }
  };

  // Debounced ZIP code lookup
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchCityFromZip(formData.zipCode);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [formData.zipCode]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Convert skillLevel to number if it's the skillLevel field
    const processedValue = name === 'skillLevel' ? parseFloat(value) || 0 : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof RegistrationErrors]) {
      clearError(name as keyof RegistrationErrors);
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setFormData(prev => ({
      ...prev,
      skillLevel: value
    }));
    
    if (errors.skillLevel) {
      clearError('skillLevel');
    }
  };

  const handleSportsSelection = (sport: string) => {
    setFormData(prev => {
      const currentSports = [...prev.preferredSports];
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
        preferredSports: currentSports
      };
    });
    
    if (errors.preferredSports) {
      clearError('preferredSports');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setLoading(true);
    setErrors({});
    setSuccess('');

    try {
      // Send raw form data to backend - let backend handle all validation
      const data = await signUp(formData, cityName);

      if (data.success) {
        setSuccess(data.message || 'Account created successfully!');
        // Reset form on success
        setFormData({
          fullName: '',
          email: '',
          confirmEmail: '',
          password: '',
          confirmPassword: '',
          displayName: '',
          preferredSports: [],
          skillLevel: 2.5,
          zipCode: ''
        });
        setCityName('');
      } else {
        // Handle backend validation errors
        if (data.validationErrors) {
          setErrors(data.validationErrors);
        } else {
          handleError(data.error || 'Sign up failed');
        }
      }
    } catch (err: any) {
      handleError(err.message || 'Sign up failed');
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