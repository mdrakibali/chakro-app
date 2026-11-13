import { AppRegistry } from 'react-native';
import 'react-native-gesture-handler';
import {
    configureReanimatedLogger,
    ReanimatedLogLevel,
} from 'react-native-reanimated';
import App from './App';
import { name as appName } from './app.json';

// Disable Reanimated strict mode to prevent NativeWind transition warnings
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

AppRegistry.registerComponent(appName, () => App);
// Fallback registrations for native bridge compatibility
AppRegistry.registerComponent('CHAKRO', () => App);
AppRegistry.registerComponent('cabrio', () => App);
AppRegistry.registerComponent('Cabrio', () => App);
