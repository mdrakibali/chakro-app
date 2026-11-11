import React, { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';

export default function ThemeProvider({ children }: PropsWithChildren) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
