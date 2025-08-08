import { useState } from 'react';
import { signIn } from '../services/authService';

interface SignInFormData {
  email: string;
  password: string;
}

interface SignInFormErrors {
  email?: string;
  password?: string;
  general?: string;
}

export const useSignInForm = () => {
  const [formData, setFormData] = useState<SignInFormData>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<SignInFormErrors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof SignInFormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: SignInFormErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      await signIn(formData.email, formData.password);
      setSuccess(true);
      // You can redirect here or handle success in the component
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Sign in failed. Please try again.';
      setErrors({
        general: errorMessage
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
    handleInputChange,
    handleSubmit
  };
}; 