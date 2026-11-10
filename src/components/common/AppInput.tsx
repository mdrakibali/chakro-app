import { Eye, EyeOff } from 'lucide-react-native';
import React, { useState } from 'react';
import { Pressable, TextInput, TextInputProps, View } from 'react-native';
import { cn } from '../../utils';
import AppText from './AppText';

export interface AppInputProps extends TextInputProps {
  label?: string;
  error?: string;
  isPassword?: boolean;
  leftIcon?: React.ReactNode;
  containerClassName?: string;
  inputClassName?: string;
}

/**
 * Text input component following shadcn patterns with built-in password toggle and error states.
 */
export default function AppInput({
  label,
  error,
  isPassword = false,
  leftIcon,
  containerClassName,
  inputClassName,
  placeholderTextColor = '#9CA3AF',
  ...rest
}: AppInputProps) {
  const [showPassword, setShowPassword] = useState(!isPassword);

  return (
    <View className={cn('w-full', containerClassName)}>
      {label && (
        <AppText className="mb-1.5 text-sm font-medium text-heading">
          {label}
        </AppText>
      )}

      <View
        className={cn(
          'w-full flex-row items-center rounded-2xl border bg-surface px-4 py-3',
          error ? 'border-red-500' : 'border-border'
        )}
      >
        {leftIcon && <View className="mr-3">{leftIcon}</View>}

        <TextInput
          className={cn('flex-1 font-normal text-base text-heading', inputClassName)}
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
              <EyeOff size={20} color="#9CA3AF" />
            ) : (
              <Eye size={20} color="#9CA3AF" />
            )}
          </Pressable>
        )}
      </View>

      {error && (
        <AppText className="mt-1 text-xs text-red-500">{error}</AppText>
      )}
    </View>
  );
}
