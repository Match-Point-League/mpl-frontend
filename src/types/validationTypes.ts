/**
 * Validation-related types for the frontend
 */

/**
 * Validation errors for registration form
 */
export interface ValidationErrors {
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