import { useState } from 'react';
import { SignUpFormData, SignUpErrors } from '../types';
import { signUp } from '../services/authService';

// Default form state
const defaultFormState: SignUpFormData = {
  fullName: '',
  email: '',
  confirmEmail: '',
  password: '',
  confirmPassword: '',
  displayName: '',
  preferredSports: [],
  skillLevel: 2.5,
  zipCode: ''
};

export const useSignUpForm = () => {
  const [formData, setFormData] = useState<SignUpFormData>(defaultFormState);
  const [errors, setErrors] = useState<SignUpErrors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  // Centralized error handling function
  const handleError = (error: string, field?: keyof SignUpErrors) => {
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
  const clearError = (field: keyof SignUpErrors) => {
    setErrors(prev => ({
      ...prev,
      [field]: undefined
    }));
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
    if (errors[name as keyof SignUpErrors]) {
      clearError(name as keyof SignUpErrors);
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
      const response = await signUp(formData);

      if (response.success) {
        setSuccess(response.message || 'Account created successfully!');
        // Reset form on success
        setFormData(defaultFormState);
        // You can now access userId if needed: response.data.userId
      } else {
        // Handle backend validation errors
        if (response.data?.validationErrors) {
          setErrors(response.data.validationErrors);
        } else {
          handleError(response.error || 'Sign up failed');
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
    handleInputChange,
    handleSliderChange,
    handleSportsSelection,
    handleSubmit
  };
};