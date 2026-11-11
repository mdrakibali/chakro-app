import { z } from 'zod';

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long'),
});

export const signupSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters long'),
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Please enter a valid email address'),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters long'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const verifyEmailSchema = z.object({
  email: z.string().optional(),
  otp: z.string().min(4, 'OTP must be at least 4 digits').max(6, 'OTP cannot exceed 6 digits'),
});

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
});

export const verifyForgotPasswordSchema = z.object({
  email: z.string().optional(),
  otp: z.string().min(4, 'OTP must be at least 4 digits').max(6, 'OTP cannot exceed 6 digits'),
});

export const resetPasswordSchema = z
  .object({
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    resetToken: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const logoutSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh Token is required'),
});

export const refreshAccessTokenSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh Token is required'),
});

export type SignInFormData = z.infer<typeof signInSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
export type VerifyEmailFormData = z.infer<typeof verifyEmailSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type VerifyForgotPasswordFormData = z.infer<typeof verifyForgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type LogoutFormData = z.infer<typeof logoutSchema>;
export type RefreshAccessTokenFormData = z.infer<typeof refreshAccessTokenSchema>;
