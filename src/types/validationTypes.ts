/**
 * Validation-related types for the frontend
 */

/**
 * Validation errors for sign up form
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