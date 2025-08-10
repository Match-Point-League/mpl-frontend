import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../config/firebase";

export interface ForgotPasswordResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export const forgotPassword = async (email: string): Promise<ForgotPasswordResponse> => {
  try {
    if (!auth) {
      throw new Error('Firebase authentication not configured');
    }

    await sendPasswordResetEmail(auth, email);
    
    return {
      success: true,
      message: 'Password reset email sent successfully. Please check your inbox.'
    };
  } catch (error: any) {
    console.error('Forgot password error:', error);
    
    let userFriendlyError = 'Failed to send password reset email. Please try again.';
    
    if (error.code === 'auth/user-not-found') {
      userFriendlyError = 'No account found with this email address.';
    } else if (error.code === 'auth/invalid-email') {
      userFriendlyError = 'Please enter a valid email address.';
    } else if (error.code === 'auth/too-many-requests') {
      userFriendlyError = 'Too many requests. Please try again later.';
    }
    
    return {
      success: false,
      error: userFriendlyError
    };
  }
}; 