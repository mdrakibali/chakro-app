import React from 'react';
import {
  Control,
  FieldPath,
  FieldValues,
  useController,
} from 'react-hook-form';
import AppInput, { AppInputProps } from './AppInput';

export interface AppFormInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<AppInputProps, 'value' | 'onChangeText' | 'error'> {
  name: TName;
  control: Control<TFieldValues>;
}

export default function AppFormInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ name, control, ...props }: AppFormInputProps<TFieldValues, TName>) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <AppInput
      value={value ?? ''}
      onChangeText={onChange}
      onBlur={onBlur}
      error={error?.message}
      {...props}
    />
  );
}
