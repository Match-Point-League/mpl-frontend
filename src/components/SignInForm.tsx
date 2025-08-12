import React, { useState } from 'react';
import { signIn } from '../services/authService';
import { AuthUser } from '../types';
import { Link } from 'react-router-dom';


const SignInForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignInSuccess = (user: AuthUser) => {
    // Store both user data and token
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('authToken', user.token);
    
    // Redirect to dashboard or home page after successful sign in
    window.location.href = '/';
  };

  const mapErrorToUserMessage = (error: any): string => {
    if (!error.message) {
      return 'Failed to sign in. Please try again.';
    }

    const invalidPassword = 'Invalid email or password. Please try again.';
    const noAccountFound = 'No account found with this email address';
    const invalidEmail = 'Please enter a valid email address';
    const tooManyFailedAttempts = 'Too many failed attempts. Please try again later.';

    // Map specific error messages to user-friendly text
    switch (error.message) {
      case invalidPassword:
        return invalidPassword;
      case noAccountFound:
        return noAccountFound;
      case invalidEmail:
        return invalidEmail;
      case tooManyFailedAttempts:
        return tooManyFailedAttempts;
      default:
        return error.message;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      console.log('Attempting sign-in with:', { email, password: '***' });
      
      const user: AuthUser = await signIn(email, password);
      console.log('Sign-in successful, user data:', user);
      
      handleSignInSuccess(user);
    } catch (err: any) {
      console.error('Sign in error:', err);
      const userFriendlyError = mapErrorToUserMessage(err);
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

      {/* Forgot Password Link */}
      <div className="text-center">
        <Link to="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-500">
          Forgot your password?
        </Link>
      </div>
    </form>
  );
};

export default SignInForm; 