import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

export default function WelcomeScreen() {
  const navigation = useNavigation();

  const handleSignUp = () => {
    navigation.navigate('Auth', {
      screen: 'SignIn',
    });
  };

  return (
    <View className="w-full h-full bg-background flex-1 items-center justify-center">
      <Text className="text-heading text-xl font-bold">
        This is WelcomeScreen SCREEN
      </Text>
      <Pressable onPress={handleSignUp} className="mt-4">
        <Text className="text-primary text-xl font-bold">Sign Up</Text>
      </Pressable>
    </View>
  );
}
