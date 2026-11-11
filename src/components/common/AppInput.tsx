import { Eye, EyeOff } from 'lucide-react-native';
import React, { cloneElement, isValidElement, useState } from 'react';
import {
  ColorValue,
  Pressable,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
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

  const renderLeftIcon = () => {
    if (!leftIcon) return null;

    if (isValidElement<{ color?: ColorValue; size?: number }>(leftIcon)) {
      return cloneElement(leftIcon, {
        color: leftIcon.props.color ?? placeholderTextColor,
        size: leftIcon.props.size ?? 24,
      });
    }

    return leftIcon;
  };

  return (
    <View className={cn('w-full', containerClassName)}>
      {label && (
        <AppText className="mb-1.5 text-lg font-medium text-heading">
          {label}
        </AppText>
      )}

      <View
        className={cn(
          'w-full flex-row items-center rounded-lg border bg-surface px-4 py-1.5',
          error ? 'border-red-500' : 'border-surface',
        )}
      >
        {leftIcon && <View className="mr-2">{renderLeftIcon()}</View>}

        <TextInput
          className={cn(
            'flex-1 font-normal text-base text-heading',
            inputClassName,
          )}
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
              <EyeOff size={24} color={placeholderTextColor as string} />
            ) : (
              <Eye size={24} color={placeholderTextColor as string} />
            )}
          </Pressable>
        )}
      </View>

      {error && (
        <AppText className="mt-1 text-sm text-red-500">{error}</AppText>
      )}
    </View>
  );
}
