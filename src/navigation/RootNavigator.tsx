import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import OnboardingScreen from '../screens/onboarding/OnboardingScreen';
import WelcomeScreen from '../screens/onboarding/WelcomeScreen';
import { RootStackParamList } from '../types/navigation';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
      {/* Onboarding flow */}
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
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
      <Stack.Screen
        name="Main"
        component={MainNavigator}
        options={{
          animation: 'slide_from_right',
        }}
      />
    </Stack.Navigator>
  );
}
