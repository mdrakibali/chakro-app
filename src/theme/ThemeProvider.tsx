import { useColorScheme } from 'nativewind';
import React, { PropsWithChildren } from 'react';
import { View } from 'react-native';
import { themes } from './themes';

export default function ThemeProvider({ children }: PropsWithChildren) {
  const { colorScheme } = useColorScheme();
  const currentTheme =
    colorScheme === 'dark' ? themes.dark : themes.light;

  return (
    <View style={currentTheme} className="flex-1">
      {children}
    </View>
  );
}