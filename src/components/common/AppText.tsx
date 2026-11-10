import React from 'react';
import { Text, TextProps } from 'react-native';
import { cn } from '../../utils';

export interface AppTextProps extends TextProps {
  className?: string;
  children?: React.ReactNode;
}

/**
 * Core typography component built with Tailwind/shadcn patterns.
 * Supports standard Tailwind font utilities: font-normal, font-medium, font-semibold, font-bold, font-extrabold.
 */
export default function AppText({
  className,
  children,
  ...props
}: AppTextProps) {
  return (
    <Text
      className={cn('text-heading font-normal', className)}
      {...props}
    >
      {children}
    </Text>
  );
}
