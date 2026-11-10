import { Eye, EyeOff } from 'lucide-react-native';
import React, { useState } from 'react';
import { Pressable, Text, TextInput, TextInputProps, View } from 'react-native';

interface AppInputProps extends TextInputProps {
  label?: string;
  error?: string;
  isPassword?: boolean;
  leftIcon?: React.ReactNode;
  containerClassName?: string;
  inputClassName?: string;
}

export default function AppInput({
  label,
  error,
  isPassword = false,
  leftIcon,
  containerClassName = '',
  inputClassName = '',
  placeholderTextColor = '#9CA3AF',
  ...rest
}: AppInputProps) {
  const [showPassword, setShowPassword] = useState(!isPassword);

  return (
    <View className={`w-full ${containerClassName}`}>
      {label && (
        <Text className="mb-1.5 font-outfit font-medium text-sm text-heading">
          {label}
        </Text>
      )}

      <View
        className={`w-full flex-row items-center rounded-2xl border bg-surface px-4 py-3 ${
          error ? 'border-red-500' : 'border-border'
        }`}
      >
        {leftIcon && <View className="mr-3">{leftIcon}</View>}

        <TextInput
          className={`flex-1 font-outfit text-base text-heading ${inputClassName}`}
          placeholderTextColor={placeholderTextColor}
          secureTextEntry={isPassword && !showPassword}
          autoCapitalize="none"
          {...rest}
        />

        {isPassword && (
          <Pressable
            onPress={() => setShowPassword(prev => !prev)}
            hitSlop={8}
            className="ml-2"
          >
            {showPassword ? (
              <EyeOff size={20} className="text-[#9CA3AF]" />
            ) : (
              <Eye size={20} className="text-[#9CA3AF]" />
            )}
          </Pressable>
        )}
      </View>

      {error && (
        <Text className="mt-1 font-outfit text-xs text-red-500">{error}</Text>
      )}
    </View>
  );
}
