import { auth } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  UserCredential
} from "firebase/auth";

// Sign up with email and password
export async function signUp(email: string, password: string): Promise<UserCredential> {
  try {
    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (error: any) {
    switch (error.code) {
      case 'auth/email-already-in-use':
        throw new Error('Email is already registered');
      case 'auth/invalid-email':
        throw new Error('Invalid email address');
      case 'auth/weak-password':
        // TODO: keep this?
        throw new Error('Password should be at least 6 characters');
      default:
        throw new Error('Sign up failed. Please try again.');
    }
  }
}

// Sign in with email and password
export async function signIn(email: string, password: string): Promise<UserCredential> {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error: any) {
    switch (error.code) {
      case 'auth/user-not-found':
        throw new Error('No account found with this email');
      case 'auth/wrong-password':
        throw new Error('Incorrect password');
      case 'auth/invalid-email':
        throw new Error('Invalid email address');
      case 'auth/too-many-requests':
        throw new Error('Too many failed attempts. Please try again later');
      default:
        throw new Error('Sign in failed. Please try again.');
    }
  }
}

// Sign out
export async function signOut(): Promise<void> {
  try {
    return await firebaseSignOut(auth);
  } catch (error: any) {
    throw new Error('Sign out failed. Please try again.');
  }
}

// Send password reset email
export async function resetPassword(email: string): Promise<void> {
  try {
    return await sendPasswordResetEmail(auth, email);
  } catch (error: any) {
    switch (error.code) {
      case 'auth/user-not-found':
        throw new Error('No account found with this email');
      case 'auth/invalid-email':
        throw new Error('Invalid email address');
      case 'auth/too-many-requests':
        throw new Error('Too many requests. Please try again later');
      default:
        throw new Error('Failed to send reset email. Please try again.');
    }
  }
}
