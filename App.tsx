import './global.css';
import { StatusBar, Text, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import ThemeProvider from './src/theme/ThemeProvider';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        />
        <View className="flex-1 items-center justify-center bg-background">
          <Text className="text-2xl font-bold text-heading">
            Hello CHAKRO!
          </Text>
        </View>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default App;

