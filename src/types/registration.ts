export interface FormData {
  fullName: string;
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
  displayName: string;
  sportsInterested: string[];
  skillLevel: number;
  zipCode: string;
}

export interface FormErrors {
  fullName?: string;
  email?: string;
  confirmEmail?: string;
  password?: string;
  confirmPassword?: string;
  displayName?: string;
  sportsInterested?: string;
  skillLevel?: string;
  zipCode?: string;
  general?: string;
} 