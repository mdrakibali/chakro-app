import React from 'react';
import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
} from 'react-hook-form';
import AppOtpInput, { AppOtpInputProps } from './AppOtpInput';

export interface AppFormOtpInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<AppOtpInputProps, 'value' | 'onChange' | 'error'> {
  name: TName;
  control: Control<TFieldValues>;
}

export default function AppFormOtpInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ name, control, ...props }: AppFormOtpInputProps<TFieldValues, TName>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <AppOtpInput
          value={value ?? ''}
          onChange={onChange}
          error={error?.message}
          {...props}
        />
      )}
    />
  );
}
