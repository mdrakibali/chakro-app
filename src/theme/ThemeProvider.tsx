import React, { PropsWithChildren } from 'react';
import { View } from 'react-native';
import { themes } from './themes';

export default function ThemeProvider({ children }: PropsWithChildren) {
  return (
    <View style={themes.light} className="flex-1 bg-background">
      {children}
    </View>
  );
}
