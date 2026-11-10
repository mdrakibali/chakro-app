import { NavigatorScreenParams } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";



export type AuthStackParamList = {
    SignIn: undefined;
    Signup: undefined;
    VerifyEmail:undefined;
    ForgotPassword:undefined;
    VerifyForgotPassword:undefined;
    ResetPassword: undefined;
}
export type RootStackParamList = {
    Onboarding: undefined;
    Welcome: undefined;
    Auth: NavigatorScreenParams<AuthStackParamList>;
}

export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;

export type AuthStackScreenProps<T extends keyof AuthStackParamList> = NativeStackScreenProps<AuthStackParamList, T>;


declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
        interface AuthParamList extends AuthStackParamList { }
    }
}