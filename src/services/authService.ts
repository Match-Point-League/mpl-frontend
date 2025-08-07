import { auth } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  UserCredential
} from "firebase/auth";

// TODO: add error handling

// Sign up with email and password
export async function signUp(email: string, password: string): Promise<UserCredential> {
  return createUserWithEmailAndPassword(auth, email, password);
}

// Sign in with email and password
export async function signIn(email: string, password: string): Promise<UserCredential> {
  return signInWithEmailAndPassword(auth, email, password);
}

// Sign out
// TODO: check if this is needed
export async function signOut(): Promise<void> {
  return firebaseSignOut(auth);
}

// Send password reset email
export async function resetPassword(email: string): Promise<void> {
  return sendPasswordResetEmail(auth, email);
}
