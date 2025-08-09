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
 * Validation errors for registration form
 */
export interface RegistrationErrors {
  fullName?: string;
  email?: string;
  confirmEmail?: string;
  password?: string;
  confirmPassword?: string;
  displayName?: string;
  preferredSports?: string;
  skillLevel?: string;
  zipCode?: string;
  general?: string;
}

/**
 * Registration API response
 */
export interface RegistrationResponse {
  success: boolean;
  message?: string;
  error?: string;
  validationErrors?: RegistrationErrors;
} 