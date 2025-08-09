import React from 'react';
import { useSignUpForm } from '../hooks/useSignUpForm';
import { generateDisplayNameOptions, getSkillLevelDescription } from '../utils/registrationFormUtils';
import '../styles/signUp.css';

const SignUpForm: React.FC = () => {
  const {
    formData,
    errors,
    loading,
    success,
    handleInputChange,
    handleSliderChange,
    handleSportsSelection,
    handleSubmit
  } = useSignUpForm();

  const displayNameOptions = generateDisplayNameOptions(formData.fullName);

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {/* Full Name */}
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <div className="mt-1">
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            required
            value={formData.fullName}
            onChange={handleInputChange}
            className={`appearance-none block w-full px-3 py-2 border rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              errors.fullName ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Enter your full name"
          />
        </div>
        {errors.fullName && (
          <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
        )}
      </div>

      {/* Display Name */}
      {displayNameOptions.length > 0 && (
        <div>
          <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">
            Display Name
          </label>
          <div className="mt-1">
            <select
              id="displayName"
              name="displayName"
              required
              value={formData.displayName}
              onChange={handleInputChange}
              className={`appearance-none block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                errors.displayName ? 'border-red-300' : 'border-gray-300'
              }`}
            >
              <option value="">Select a display name</option>
              {displayNameOptions.map((option: string, index: number) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          {errors.displayName && (
            <p className="mt-1 text-sm text-red-600">{errors.displayName}</p>
          )}
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
            value={formData.email}
            onChange={handleInputChange}
            className={`appearance-none block w-full px-3 py-2 border rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              errors.email ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Enter your email"
          />
        </div>
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      {/* Confirm Email */}
      <div>
        <label htmlFor="confirmEmail" className="block text-sm font-medium text-gray-700">
          Confirm Email address
        </label>
        <div className="mt-1">
          <input
            id="confirmEmail"
            name="confirmEmail"
            type="email"
            autoComplete="email"
            required
            value={formData.confirmEmail}
            onChange={handleInputChange}
            className={`appearance-none block w-full px-3 py-2 border rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              errors.confirmEmail ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Confirm your email"
          />
        </div>
        {errors.confirmEmail && (
          <p className="mt-1 text-sm text-red-600">{errors.confirmEmail}</p>
        )}
      </div>

      {/* Sports Interested - Tab Style */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Sports
        </label>
        <div className="sports-tabs">
          {['tennis', 'pickleball'].map((sport) => (
            <button
              key={sport}
              type="button"
              onClick={() => handleSportsSelection(sport)}
              className={`sports-tab ${
                formData.preferredSports.includes(sport) ? 'active' : ''
              }`}
            >
              {sport.charAt(0).toUpperCase() + sport.slice(1)}
            </button>
          ))}
        </div>
        {errors.preferredSports && (
          <p className="mt-1 text-sm text-red-600">{errors.preferredSports}</p>
        )}
      </div>

      {/* Skill Level - Slider */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Skill Level: {formData.skillLevel} - {getSkillLevelDescription(formData.skillLevel)}
          <span className="ml-1 text-gray-400" title="1.0: Beginner, 2.0-2.5: Advanced Beginner, 3.0-3.5: Intermediate, 4.0-4.5: Advanced, 5.0-5.5: Expert">
            ⓘ
          </span>
        </label>
        <div className="mt-2">
          <input
            type="range"
            min="1"
            max="5.5"
            step="0.5"
            value={formData.skillLevel}
            onChange={handleSliderChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1.0</span>
            <span>2.0</span>
            <span>3.0</span>
            <span>4.0</span>
            <span>5.0</span>
            <span>5.5</span>
          </div>
        </div>
        {errors.skillLevel && (
          <p className="mt-1 text-sm text-red-600">{errors.skillLevel}</p>
        )}
      </div>

      {/* ZIP Code */}
      <div>
        <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
          ZIP Code
        </label>
        <div className="mt-1">
          <input
            id="zipCode"
            name="zipCode"
            type="text"
            autoComplete="postal-code"
            required
            value={formData.zipCode}
            onChange={handleInputChange}
            className={`appearance-none block w-full px-3 py-2 border rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              errors.zipCode ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Enter your ZIP code"
          />
        </div>
        {errors.zipCode && (
          <p className="mt-1 text-sm text-red-600">{errors.zipCode}</p>
        )}
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
            autoComplete="new-password"
            required
            value={formData.password}
            onChange={handleInputChange}
            className={`appearance-none block w-full px-3 py-2 border rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              errors.password ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Enter your password"
          />
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
          Confirm Password
        </label>
        <div className="mt-1">
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className={`appearance-none block w-full px-3 py-2 border rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Confirm your password"
          />
        </div>
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
        )}
      </div>

      <div>
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </div>
    </form>
  );
};

export default SignUpForm; 