import React from 'react';
import { ActivityIndicator, Pressable, PressableProps } from 'react-native';
import { cn } from '../../utils';
import AppText from './AppText';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'default' | 'md' | 'lg';

export interface AppButtonProps extends Omit<PressableProps, 'onPress'> {
  onPress?: ((event?: any) => unknown) | undefined;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  textClassName?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
}

const buttonVariants: Record<ButtonVariant, string> = {
  primary: 'bg-primary active:opacity-90',
  secondary: 'bg-secondary active:opacity-80',
  outline: 'border border-primary bg-transparent',
  ghost: 'bg-transparent active:bg-surface/30',
};

// Fixed heights prevent height jitter and flickering during loading state transitions
const buttonSizes: Record<ButtonSize, string> = {
  sm: 'h-10 px-4 rounded-lg',
  default: 'h-12 px-6 rounded-lg',
  md: 'h-12 px-6 rounded-lg',
  lg: 'h-14 px-8 rounded-lg',
};

const textVariants: Record<ButtonVariant, string> = {
  primary: 'text-white font-semibold',
  secondary: 'text-white font-semibold',
  outline: 'text-heading font-medium',
  ghost: 'text-primary font-medium',
};

const textSizes: Record<ButtonSize, string> = {
  sm: 'text-sm',
  default: 'text-base',
  md: 'text-base',
  lg: 'text-lg',
};

/**
 * Button component following shadcn variant patterns for React Native.
 * Compatible with react-hook-form handleSubmit and standard Pressable events.
 */
export default function AppButton({
  variant = 'primary',
  size = 'default',
  loading = false,
  disabled = false,
  className,
  textClassName,
  leftIcon,
  rightIcon,
  children,
  onPress,
  ...props
}: AppButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      className={cn(
        'relative flex-row items-center justify-center',
        buttonSizes[size],
        buttonVariants[variant],
        isDisabled && 'opacity-70',
        className,
      )}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={
            variant === 'outline' || variant === 'ghost' ? '#F07828' : '#FFFFFF'
          }
        />
      ) : (
        <>
          {leftIcon && <>{leftIcon}</>}
          {typeof children === 'string' || typeof children === 'number' ? (
            <AppText
              className={cn(
                'text-center',
                textSizes[size],
                textVariants[variant],
                leftIcon && 'ml-2',
                rightIcon && 'mr-2',
                textClassName,
              )}
            >
              {children}
            </AppText>
          ) : (
            children
          )}
          {rightIcon && <>{rightIcon}</>}
        </>
      )}
    </Pressable>
  );
}
