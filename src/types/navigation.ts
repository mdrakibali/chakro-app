import { NavigatorScreenParams } from '@react-navigation/native';

export type AuthStackParamList = {
  SignIn: undefined;
  Signup: undefined;
  VerifyEmail: undefined;
  ForgotPassword: undefined;
  VerifyForgotPassword: undefined;
  ResetPassword: undefined;
};

export type RootStackParamList = {
  Onboarding: undefined;
  Welcome: undefined;
  Auth: NavigatorScreenParams<AuthStackParamList>;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
