import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Pressable, View } from 'react-native';
import {
  AppButton,
  AppFormOtpInput,
  AppText,
} from '../../components/common';
import {
  VerifyForgotPasswordFormData,
  verifyForgotPasswordSchema,
} from '../../schemas';
import { AuthStackParamList } from '../../types/navigation';
import { zodResolver } from '../../utils';
import AuthLayout from './AuthLayout';

type VerifyForgotPasswordRouteProp = RouteProp<
  AuthStackParamList,
  'VerifyForgotPassword'
>;

const RESEND_INTERVAL_SECONDS = 60;

export default function VerifyForgotPasswordScreen() {
  const navigation = useNavigation();
  const route = useRoute<VerifyForgotPasswordRouteProp>();
  const email = route.params?.email || '';

  const [timer, setTimer] = useState(RESEND_INTERVAL_SECONDS);
  const [canResend, setCanResend] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<VerifyForgotPasswordFormData>({
    resolver: zodResolver(verifyForgotPasswordSchema),
    defaultValues: {
      email,
      otp: '',
    },
  });

  // Keep email in sync if route params change
  useEffect(() => {
    if (email) {
      setValue('email', email);
    }
  }, [email, setValue]);

  // Countdown timer for OTP resend
  useEffect(() => {
    if (timer <= 0) {
      setCanResend(true);
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleResendCode = () => {
    if (!canResend) return;
    setTimer(RESEND_INTERVAL_SECONDS);
    setCanResend(false);
    console.log('Resending password reset code to:', email);
  };

  const onSubmit = (data: VerifyForgotPasswordFormData) => {
    console.log('Verify Forgot Password Payload:', data);
    navigation.navigate('ResetPassword', {
      email: data.email,
      resetToken: data.otp,
    });
  };

  const formattedTimer = `00:${timer < 10 ? `0${timer}` : timer}`;

  return (
    <AuthLayout title="Verify Code">
      {/* Title & Description */}
      <View className="w-full gap-2 pb-6">
        <AppText className="text-2xl font-bold text-heading">
          Enter Verification Code
        </AppText>
        <AppText className="text-base font-normal text-muted">
          We have sent a verification code to
        </AppText>
        <AppText className="text-base font-semibold text-heading">
          {email || 'your email address'}
        </AppText>
      </View>

      {/* OTP Input */}
      <View className="w-full py-4 items-center">
        <AppFormOtpInput
          control={control}
          name="otp"
          length={6}
          autoFocus={true}
        />
      </View>

      {/* Resend Code Section */}
      <View className="w-full items-center justify-center py-4">
        {canResend ? (
          <Pressable onPress={handleResendCode} hitSlop={8}>
            <AppText className="text-sm font-semibold text-primary">
              Resend Code
            </AppText>
          </Pressable>
        ) : (
          <AppText className="text-sm font-normal text-muted">
            Resend code in{' '}
            <AppText className="text-sm font-semibold text-heading">
              {formattedTimer}
            </AppText>
          </AppText>
        )}
      </View>

      {/* Submit Button */}
      <AppButton
        onPress={handleSubmit(onSubmit)}
        loading={isSubmitting}
        size="lg"
        className="mt-4 w-full"
      >
        Verify Code
      </AppButton>
    </AuthLayout>
  );
}

