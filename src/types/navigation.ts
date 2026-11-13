import type { NavigatorScreenParams } from '@react-navigation/native';


// Home Tab Stack
export type MainTabParamList = {
  Home: undefined;
  Explore: { brandId?: string; brand?: string; search?: string } | undefined;
  Wishlist: undefined;
  Profile: undefined;
};

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
  Main: NavigatorScreenParams<MainTabParamList>;
  Auth: NavigatorScreenParams<AuthStackParamList>;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList
      extends RootStackParamList,
        AuthStackParamList,
        MainTabParamList {}
  }
}
