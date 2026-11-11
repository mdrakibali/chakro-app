import { useNavigation } from '@react-navigation/native';
import { Mail } from 'lucide-react-native';
import React from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { AppButton, AppFormInput, AppText } from '../../components/common';
import {
  ForgotPasswordFormData,
  forgotPasswordSchema,
} from '../../schemas';
import { zodResolver } from '../../utils';
import AuthLayout from './AuthLayout';

export default function ForgotPasswordScreen() {
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (data: ForgotPasswordFormData) => {
    console.log('Forgot Password Payload:', data);
    navigation.navigate('Auth', {
      screen: 'VerifyForgotPassword',
      params: { email: data.email },
    });
  };

  return (
    <AuthLayout title="Forgot Password">
      {/* Title & Description */}
      <View className="w-full gap-2 pb-6">
        <AppText className="text-2xl font-bold text-heading">
          Reset Your Password
        </AppText>
        <AppText className="text-base font-normal text-muted">
          Enter your registered email address and we will send you a
          verification code to reset your password.
        </AppText>
      </View>

      {/* Form Input */}
      <View className="w-full gap-5">
        <AppFormInput
          control={control}
          name="email"
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          leftIcon={<Mail />}
        />
      </View>

      {/* Submit Button */}
      <AppButton
        onPress={handleSubmit(onSubmit)}
        loading={isSubmitting}
        size="lg"
        className="mt-6 w-full"
      >
        Send Verification Code
      </AppButton>
    </AuthLayout>
  );
}
