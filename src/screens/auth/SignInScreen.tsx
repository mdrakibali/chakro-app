import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

export default function SignInScreen() {
  const navigation = useNavigation();
  const handleBack = () => {
    navigation.navigate('Onboarding');
  };
  return (
    <View className="w-full h-full bg-background flex-1 items-center justify-center">
      <Text className="text-text text-xl font-bold">
        This is SIGN IN SCREEN
      </Text>
      <Pressable onPress={handleBack}>
        <Text className="text-text text-xl font-bold">Back</Text>
      </Pressable>
    </View>
  );
}
