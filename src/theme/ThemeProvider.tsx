import React, { PropsWithChildren } from 'react';
import { View } from 'react-native';

export default function ThemeProvider({ children }: PropsWithChildren) {
  return <View className="flex-1 bg-background">{children}</View>;
}
