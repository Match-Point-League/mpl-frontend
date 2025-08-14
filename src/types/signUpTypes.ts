import { ValidationErrors } from './validationTypes';

/**
 * Sign up form data structure for user sign-up
 */
export interface SignUpFormData {
  fullName: string;
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
  displayName: string;
  preferredSports: string[];
  skillLevel: number;
  zipCode: string;
}

/**
 * Sign up API response
 */
export type SignUpResponseData = {
  userId?: string;
  validationErrors?: ValidationErrors;
};

/**
 * Sign up API response - matches backend structure
 */
export interface SignUpResponse {
  success: boolean;
  message?: string;
  error?: string;
  data: SignUpResponseData;
  timestamp: string;
}

// Re-export for backward compatibility
export type SignUpErrors = ValidationErrors; 