import { StatusBar, Text, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import './global.css';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View className="flex-1 items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Text className="text-2xl font-bold text-gray-900 dark:text-white">
          Hello World!
        </Text>
      </View>
    </SafeAreaProvider>
  );
}

export default App;
