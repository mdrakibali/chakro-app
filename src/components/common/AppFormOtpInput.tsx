import React from 'react';
import {
  Control,
  FieldPath,
  FieldValues,
  useController,
} from 'react-hook-form';
import AppOtpInput, { AppOtpInputProps } from './AppOtpInput';

export interface AppFormOtpInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<AppOtpInputProps, 'value' | 'onChange' | 'error'> {
  name: TName;
  control: Control<TFieldValues>;
}

/**
 * Form-bound OTP input component for react-hook-form.
 * Automatically connects value, onChange, and validation error messages.
 */
export default function AppFormOtpInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  ...props
}: AppFormOtpInputProps<TFieldValues, TName>) {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <AppOtpInput
      value={value ?? ''}
      onChange={onChange}
      error={error?.message}
      {...props}
    />
  );
}

