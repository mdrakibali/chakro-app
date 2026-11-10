import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  Text,
} from 'react-native';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface AppButtonProps extends PressableProps {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  textClassName?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export default function AppButton({
  title,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  textClassName = '',
  leftIcon,
  rightIcon,
  onPress,
  ...rest
}: AppButtonProps) {
  const getVariantStyle = () => {
    switch (variant) {
      case 'secondary':
        return 'bg-secondary active:opacity-80';
      case 'outline':
        return 'border border-border bg-transparent active:bg-surface/50';
      case 'ghost':
        return 'bg-transparent active:bg-surface/30';
      case 'primary':
      default:
        return 'bg-primary active:opacity-90';
    }
  };

  const getSizeStyle = () => {
    switch (size) {
      case 'sm':
        return 'py-2 px-4 rounded-xl';
      case 'lg':
        return 'py-4 px-8 rounded-2xl';
      case 'md':
      default:
        return 'py-3.5 px-6 rounded-2xl';
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'outline':
        return 'text-heading';
      case 'ghost':
        return 'text-primary';
      case 'primary':
        return 'text-white font-bold';
      case 'secondary':
      default:
        return 'text-white font-semibold';
    }
  };

  const getTextSize = () => {
    switch (size) {
      case 'sm':
        return 'text-sm';
      case 'lg':
        return 'text-lg';
      case 'md':
      default:
        return 'text-base';
    }
  };

  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      className={`flex-row items-center justify-center ${getSizeStyle()} ${getVariantStyle()} ${
        isDisabled ? 'opacity-50' : ''
      } ${className}`}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'outline' || variant === 'ghost' ? '#F07828' : '#FFFFFF'}
        />
      ) : (
        <>
          {leftIcon && <>{leftIcon}</>}
          <Text
            className={`font-outfit text-center ${getTextStyle()} ${getTextSize()} ${
              leftIcon ? 'ml-2' : ''
            } ${rightIcon ? 'mr-2' : ''} ${textClassName}`}
          >
            {title}
          </Text>
          {rightIcon && <>{rightIcon}</>}
        </>
      )}
    </Pressable>
  );
}

