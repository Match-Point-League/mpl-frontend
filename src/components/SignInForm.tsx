import React, { useState } from 'react';
import apiClient from '../config/api';

// Define the sign-in response type to match backend
interface SignInResponseData {
  success: boolean;
  message?: string;
  error?: string;
  token?: string;
  user?: {
    id: string;
    email: string;
    name: string;
    displayName: string;
  };
}

const SignInForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      console.log('Attempting sign-in with:', { email, password: '***' });
      const response = await apiClient.post<SignInResponseData>('/auth/signin', { email, password });
      console.log('Sign-in response received:', response);

      if (response.success && response.data?.token) {
        // Store the token if the backend returns one
        localStorage.setItem('authToken', response.data.token);
        
        // Redirect to dashboard or home page after successful sign in
        window.location.href = '/';
      } else {
        // Handle unsuccessful response
        setError(response.error || 'Sign in failed. Please try again.');
      }
    } catch (err: any) {
      console.error('Sign in error:', err);
      
      // Handle different types of errors gracefully
      let userFriendlyError = 'Failed to sign in. Please try again.';
      
      if (err.response) {
        // Server responded with error status
        const status = err.response.status;
        console.log('Error response status:', status, 'Data:', err.response.data);
        
        if (status === 401) {
          userFriendlyError = 'Invalid email or password. Please try again.';
        } else if (status === 404) {
          userFriendlyError = 'No account found with this email address.';
        } else if (status === 400) {
          userFriendlyError = 'Please check your email and password format.';
        } else if (status === 500) {
          userFriendlyError = 'Server error. Please try again later.';
        }
      } else if (err.request) {
        // Network error - no response received
        console.log('Network error - no response received:', err.request);
        userFriendlyError = 'Network error. Please check your connection and try again.';
      } else if (err.message) {
        // Other error with message
        console.log('Other error:', err.message);
        if (err.message.includes('Invalid credentials')) {
          userFriendlyError = 'Invalid email or password. Please try again.';
        } else if (err.message.includes('User not found')) {
          userFriendlyError = 'No account found with this email address.';
        } else if (err.message.includes('Invalid email')) {
          userFriendlyError = 'Please enter a valid email address.';
        }
      }
      
      setError(userFriendlyError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {/* General Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email address
        </label>
        <div className="mt-1">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter your email"
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="mt-1">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter your password"
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </button>
      </div>
    </form>
  );
};

export default SignInForm; 