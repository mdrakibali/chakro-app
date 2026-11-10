import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import OnboardingScreen from '../screens/splash/OnboardingScreen';
import WelcomeScreen from '../screens/splash/WelcomeScreen';
import AuthNavigator from './AuthNavigator';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Onbording"
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
      {/* Onboarding flow */}
      <Stack.Screen name="Onbording" component={OnboardingScreen} />
      {/* Welcome flow */}
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />
      {/* Authentication flow */}
      <Stack.Screen
        name="Auth"
        component={AuthNavigator}
        options={{
          animation: 'slide_from_right',
        }}
      />
    </Stack.Navigator>
  );
}
