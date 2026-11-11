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
  VerifyEmailFormData,
  verifyEmailSchema,
} from '../../schemas';
import { AuthStackParamList } from '../../types/navigation';
import { zodResolver } from '../../utils';
import AuthLayout from './AuthLayout';

type VerifyEmailRouteProp = RouteProp<AuthStackParamList, 'VerifyEmail'>;

const RESEND_INTERVAL_SECONDS = 60;

export default function VerifyEmailScreen() {
  const navigation = useNavigation();
  const route = useRoute<VerifyEmailRouteProp>();
  const email = route.params?.email || '';

  const [timer, setTimer] = useState(RESEND_INTERVAL_SECONDS);
  const [canResend, setCanResend] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<VerifyEmailFormData>({
    resolver: zodResolver(verifyEmailSchema),
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
    console.log('Resending verification code to:', email);
  };

  const onSubmit = (data: VerifyEmailFormData) => {
    console.log('Verify Email Payload:', data);
    // On success, navigate to SignIn
    navigation.navigate('SignIn');
  };

  const formattedTimer = `00:${timer < 10 ? `0${timer}` : timer}`;

  return (
    <AuthLayout title="Verify Email">
      {/* Title & Description */}
      <View className="w-full gap-2 pb-6">
        <AppText className="text-2xl font-bold text-heading">
          Verify Your Email
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
        Verify & Continue
      </AppButton>

      {/* Back to Sign In Link */}
      <View className="w-full flex-row items-center justify-center mt-6">
        <AppText className="text-sm font-normal text-muted">
          Already verified?{' '}
        </AppText>
        <Pressable
          onPress={() => navigation.navigate('Auth', { screen: 'SignIn' })}
          hitSlop={8}
        >
          <AppText className="text-sm font-bold text-primary">Sign In</AppText>
        </Pressable>
      </View>
    </AuthLayout>
  );
}

