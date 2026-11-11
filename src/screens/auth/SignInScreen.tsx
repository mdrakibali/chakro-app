import React from 'react';
import { AppText } from '../../components/common';
import AuthLayout from './AuthLayout';

export default function SignInScreen() {
  return (
    <AuthLayout title="Sign In">
      <AppText className="text-xl font-bold text-heading">
        This is SIGN IN SCREEN
      </AppText>
    </AuthLayout>
  );
}
