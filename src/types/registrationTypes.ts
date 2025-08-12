import { ValidationErrors } from './validationTypes';

/**
 * Registration form data structure for user sign-up
 */
export interface RegistrationFormData {
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
 * Registration API response
 */
export type SignUpResponseData = {
  userId?: string;
  validationErrors?: ValidationErrors;
};

/**
 * Registration API response - matches backend structure
 */
export interface RegistrationResponse {
  success: boolean;
  message?: string;
  error?: string;
  data: SignUpResponseData;
  timestamp: string;
}

// Re-export for backward compatibility
export type RegistrationErrors = ValidationErrors; 