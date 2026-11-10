import React from 'react';
import { Text, TextProps } from 'react-native';

export type TextWeight =
  | 'thin'
  | 'light'
  | 'regular'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'extrabold'
  | 'black';

interface AppTextProps extends TextProps {
  weight?: TextWeight;
  className?: string;
  children?: React.ReactNode;
}

const fontMap: Record<TextWeight, string> = {
  thin: 'Outfit-Thin',
  light: 'Outfit-Light',
  regular: 'Outfit-Regular',
  medium: 'Outfit-Medium',
  semibold: 'Outfit-SemiBold',
  bold: 'Outfit-Bold',
  extrabold: 'Outfit-ExtraBold',
  black: 'Outfit-Black',
};

export default function AppText({
  weight = 'regular',
  className = '',
  style,
  children,
  ...props
}: AppTextProps) {
  return (
    <Text
      className={`text-heading ${className}`}
      style={[{ fontFamily: fontMap[weight] }, style]}
      {...props}
    >
      {children}
    </Text>
  );
}
