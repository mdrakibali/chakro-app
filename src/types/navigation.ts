import type { NavigatorScreenParams } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

// 1. Auth Stack Param List
export type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  VerifyEmail: { email?: string } | undefined;
  VerifyForgotPassword: { email?: string } | undefined;
  ResetPassword: { email?: string; resetToken?: string } | undefined;
};

// 2. Root Stack Param List (Main Parent)
export type RootStackParamList = {
  Onboarding: undefined;
  Welcome: undefined;
  Auth: NavigatorScreenParams<AuthStackParamList>;
};

// Type helpers for navigation props in screens
export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type AuthStackScreenProps<T extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
