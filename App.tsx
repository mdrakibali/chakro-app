import { StatusBar, Text, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import './global.css';
import ThemeProvider from './src/theme/ThemeProvider';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        />
        <View className="flex-1 items-center justify-center bg-background px-6">
          <Text className="text-3xl font-outfit font-medium text-heading">
            Hello CHAKRO!
          </Text>
          <Text className="mt-2 text-center text-lg font-outfit font-medium text-primary">
            Drive Anytime Your Perfect Ride
          </Text>
          <Text className="mt-1 text-center text-xl font-outfit text-foreground">
            Experience premium mobility
          </Text>
        </View>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default App;
