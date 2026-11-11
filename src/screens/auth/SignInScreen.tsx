import { Lock, Mail } from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';
import { AppInput, AppText } from '../../components/common';
import AuthLayout from './AuthLayout';

export default function SignInScreen() {
  return (
    <AuthLayout title="Sign In">
      <View className="w-full flex gap-4 pb-5">
        {/* Titele */}
        <AppText className="text-2xl font-bold text-heading">
          Login or Create Account
        </AppText>
        {/* Description */}
        <AppText className="text-lg font-medium text-secondary">
          Enter your phone number or email to continue. We will send you a
          one-time password to verify your identity.
        </AppText>
      </View>
      <View className="w-full flex gap-5">
        <AppInput
          leftIcon={<Mail size={24} color="#9CA3AF" />}
          placeholder="Enter your email"
        />
        <AppInput
          leftIcon={<Lock size={24} color="#9CA3AF" />}
          placeholder="Enter your password"
          isPassword={true}
        />
      </View>
    </AuthLayout>
  );
}
