import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Check, Lock, Mail, User } from 'lucide-react-native';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Pressable, Text, View } from 'react-native';
import { AppButton, AppFormInput, AppText } from '../../components';
import { SignupFormData, signupSchema } from '../../schemas';
import { AuthStackParamList } from '../../types/navigation';
import { zodResolver } from '../../utils';
import AuthLayout from './AuthLayout';

export default function SignUpScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const [agreed, setAgreed] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: SignupFormData) => {
    console.log('Sign Up Payload:', data);
    navigation.navigate('VerifyEmail', { email: data.email });
  };

  return (
    <AuthLayout title="Sign Up">
      {/* Title & Description */}
      <View className="w-full gap-2 pb-6">
        <AppText className="text-2xl font-bold text-heading">
          Create New Account
        </AppText>
        <AppText className="text-base font-normal text-muted">
          Setup username and password. You can Always change it later
        </AppText>
      </View>

      {/* Form Inputs */}
      <View className="w-full gap-5">
        <AppFormInput
          control={control}
          name="name"
          placeholder="Enter your name"
          keyboardType="default"
          autoCapitalize="none"
          leftIcon={<User />}
        />

        <AppFormInput
          control={control}
          name="email"
          placeholder="Enter your email"
          leftIcon={<Mail />}
        />
        <AppFormInput
          control={control}
          name="password"
          placeholder="Enter your password"
          isPassword={true}
          leftIcon={<Lock />}
        />
        <AppFormInput
          control={control}
          name="confirmPassword"
          placeholder="Confirm your password"
          isPassword={true}
          leftIcon={<Lock />}
        />

        <View>
          <Pressable
            onPress={() => {
              setAgreed(!agreed);
            }}
            className="flex-row items-center gap-2.5 pt-1"
          >
            <View
              className={`w-5 h-5 rounded border justify-center items-center ${agreed ? 'bg-primary border-primary' : 'border-gray-300 bg-white'}`}
            >
              {agreed && <Check size={14} color="#ffffff" strokeWidth={3} />}
            </View>
            <Text className="text-gray-600 text-sm font-medium">
              I agree to terms & conditions
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Submit Button */}
      <AppButton
        onPress={handleSubmit(onSubmit)}
        loading={isSubmitting}
        size="lg"
        className="mt-6 w-full"
      >
        Sign Up
      </AppButton>

      {/* Sign In Link */}
      <View className="w-full flex-row items-center justify-center mt-6">
        <AppText className="text-sm font-normal text-muted">
          Already have an account?{' '}
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
