import { useNavigation } from '@react-navigation/native';
import { Lock, Mail } from 'lucide-react-native';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Pressable, View } from 'react-native';
import { AppButton, AppFormInput, AppText } from '../../components/common';
import { SignInFormData, signInSchema } from '../../schemas';
import { zodResolver } from '../../utils';
import AuthLayout from './AuthLayout';

export default function SignInScreen() {
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: SignInFormData) => {
    console.log('Login Payload:', data);
    navigation.navigate('Welcome');
  };

  return (
    <AuthLayout title="Sign In">
      {/* Title & Description */}
      <View className="w-full gap-2 pb-6">
        <AppText className="text-2xl font-bold text-heading">
          Login or Create Account
        </AppText>
        <AppText className="text-base font-normal text-muted">
          Enter your phone number or email to continue. We will send you a
          one-time password to verify your identity.
        </AppText>
      </View>

      {/* Form Inputs */}
      <View className="w-full gap-5">
        <AppFormInput
          control={control}
          name="email"
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          leftIcon={<Mail />}
        />

        <AppFormInput
          control={control}
          name="password"
          placeholder="Enter your password"
          isPassword={true}
          leftIcon={<Lock />}
        />

        {/* Forgot Password */}
        <Pressable
          onPress={() => navigation.navigate('ForgotPassword')}
          className="self-end pt-1"
          hitSlop={8}
        >
          <AppText className="text-sm font-medium text-primary">
            Forgot Password?
          </AppText>
        </Pressable>
      </View>

      {/* Submit Button */}
      <AppButton
        onPress={handleSubmit(onSubmit)}
        loading={isSubmitting}
        size="lg"
        className="mt-6 w-full"
      >
        Sign In
      </AppButton>

      {/* Sign Up Link */}
      <View className="w-full flex-row items-center justify-center mt-6">
        <AppText className="text-sm font-normal text-muted">
          Don't have an account?{' '}
        </AppText>
        <Pressable onPress={() => navigation.navigate('SignUp')} hitSlop={8}>
          <AppText className="text-sm font-bold text-primary">Sign Up</AppText>
        </Pressable>
      </View>
    </AuthLayout>
  );
}
