import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Lock } from 'lucide-react-native';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Pressable, View } from 'react-native';
import {
  AppButton,
  AppFormInput,
  AppText,
} from '../../components/common';
import {
  ResetPasswordFormData,
  resetPasswordSchema,
} from '../../schemas';
import { AuthStackParamList } from '../../types/navigation';
import { zodResolver } from '../../utils';
import AuthLayout from './AuthLayout';

type ResetPasswordRouteProp = RouteProp<AuthStackParamList, 'ResetPassword'>;

export default function ResetPasswordScreen() {
  const navigation = useNavigation();
  const route = useRoute<ResetPasswordRouteProp>();
  const email = route.params?.email || '';
  const resetToken = route.params?.resetToken;

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
      resetToken,
    },
  });

  const onSubmit = (data: ResetPasswordFormData) => {
    console.log('Reset Password Payload:', {
      ...data,
      email,
    });

    // Navigate to Sign In after successful password reset
    navigation.navigate('SignIn');
  };

  return (
    <AuthLayout title="Reset Password">
      {/* Title & Description */}
      <View className="w-full gap-2 pb-6">
        <AppText className="text-2xl font-bold text-heading">
          Create New Password
        </AppText>
        <AppText className="text-base font-normal text-muted">
          Your new password must be unique from those previously used.
        </AppText>
      </View>

      {/* Form Inputs */}
      <View className="w-full gap-5">
        <AppFormInput
          control={control}
          name="password"
          placeholder="New password"
          isPassword={true}
          leftIcon={<Lock />}
        />

        <AppFormInput
          control={control}
          name="confirmPassword"
          placeholder="Confirm new password"
          isPassword={true}
          leftIcon={<Lock />}
        />
      </View>

      {/* Submit Button */}
      <AppButton
        onPress={handleSubmit(onSubmit)}
        loading={isSubmitting}
        size="lg"
        className="mt-6 w-full"
      >
        Reset Password
      </AppButton>

      {/* Back to Sign In Link */}
      <View className="w-full flex-row items-center justify-center mt-6">
        <AppText className="text-sm font-normal text-muted">
          Remember your password?{' '}
        </AppText>
        <Pressable
          onPress={() => navigation.navigate('SignIn')}
          hitSlop={8}
        >
          <AppText className="text-sm font-bold text-primary">Sign In</AppText>
        </Pressable>
      </View>
    </AuthLayout>
  );
}

