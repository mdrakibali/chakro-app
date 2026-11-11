import React, { useRef, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { cn } from '../../utils';
import AppText from './AppText';

export interface AppOtpInputProps {
  value: string;
  onChange: (otp: string) => void;
  length?: number;
  error?: string;
  autoFocus?: boolean;
  className?: string;
}

/**
 * Modern OTP / Pin code input component with individual box cells.
 * Uses a hidden numeric TextInput for flawless keyboard, backspace, and paste handling across Android & iOS.
 */
export default function AppOtpInput({
  value,
  onChange,
  length = 6,
  error,
  autoFocus = true,
  className,
}: AppOtpInputProps) {
  const inputRef = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleBoxPress = () => {
    inputRef.current?.focus();
  };

  const digits = value.split('');
  const boxArray = Array.from({ length });

  return (
    <View className={cn('w-full items-center', className)}>
      {/* Hidden Native TextInput */}
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={(text) => {
          // Allow only numeric digits up to specified length
          const cleaned = text.replace(/[^0-9]/g, '').slice(0, length);
          onChange(cleaned);
        }}
        keyboardType="number-pad"
        maxLength={length}
        autoFocus={autoFocus}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={styles.hiddenInput}
        caretHidden
      />

      {/* Visual Digit Boxes */}
      <Pressable
        onPress={handleBoxPress}
        className="flex-row items-center justify-between w-full max-w-[360px] gap-2.5"
      >
        {boxArray.map((_, index) => {
          const digit = digits[index] || '';
          const isCurrent = isFocused && index === digits.length;
          const isFilled = digit.length > 0;

          return (
            <View
              key={index}
              className={cn(
                'flex-1 h-14 items-center justify-center rounded-xl border bg-surface transition-all',
                isCurrent && 'border-primary ring-2 ring-primary/20 bg-primary/5',
                isFilled && !isCurrent && 'border-heading/40 bg-surface',
                !isCurrent && !isFilled && 'border-border bg-surface',
                error && 'border-red-500 bg-red-50/20'
              )}
            >
              <AppText className="text-2xl font-bold text-heading">
                {digit}
              </AppText>
            </View>
          );
        })}
      </Pressable>

      {/* Error Message */}
      {error && (
        <AppText className="mt-2 text-xs text-red-500 text-center">
          {error}
        </AppText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  hiddenInput: {
    position: 'absolute',
    width: 1,
    height: 1,
    opacity: 0,
  },
});
