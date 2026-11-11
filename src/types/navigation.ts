import { NavigatorScreenParams } from '@react-navigation/native';

export type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  VerifyEmail: { email: string };
  ForgotPassword: undefined;
  VerifyForgotPassword: { email: string };
  ResetPassword: { email: string; resetToken?: string };
};

export type RootStackParamList = {
  Onboarding: undefined;
  Welcome: undefined;
  Auth: NavigatorScreenParams<AuthStackParamList>;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList, AuthStackParamList {}
  }
}
