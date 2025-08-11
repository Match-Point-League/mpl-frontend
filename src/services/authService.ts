import { RegistrationFormData, RegistrationResponse, AuthUser, ApiResponse } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api/v1';

// Sign up with backend API
export async function signUp(formData: RegistrationFormData): Promise<RegistrationResponse> {
  try {
    const requestBody = {
      email: formData.email,
      password: formData.password,
      fullName: formData.fullName,
      displayName: formData.displayName,
      preferredSports: formData.preferredSports,
      skillLevel: formData.skillLevel,
      zipCode: formData.zipCode,
      confirmEmail: formData.confirmEmail,
      confirmPassword: formData.confirmPassword
    };

    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const data: RegistrationResponse = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Sign up failed');
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message || 'Sign up failed. Please try again.');
  }
}

// Sign in with email and password
export async function signIn(email: string, password: string): Promise<AuthUser> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data: ApiResponse<AuthUser> = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Sign in failed');
    }

    if (!data.success || !data.data) {
      throw new Error(data.error || 'Sign in failed');
    }

    return data.data; // This is the AuthUser object
  } catch (error: any) {
    throw new Error(error.message || 'Sign in failed. Please try again.');
  }
}

// Sign out (placeholder for future implementation)
export async function signOut(): Promise<void> {
  try {
    // TODO: Implement backend sign-out endpoint
    throw new Error('Sign out not implemented yet');
  } catch (error: any) {
    throw new Error('Sign out failed. Please try again.');
  }
}

// Send password reset email (placeholder for future implementation)
export async function resetPassword(email: string): Promise<void> {
  try {
    // TODO: Implement backend password reset endpoint
    throw new Error('Password reset not implemented yet');
  } catch (error: any) {
    throw new Error('Failed to send reset email. Please try again.');
  }
}
