export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  joinDate: string;
  isVerified: boolean;
  profileImage: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  phone?: string;
  agreeToTerms: boolean;
  agreeToMarketing: boolean;
} 