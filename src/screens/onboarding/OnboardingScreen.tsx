import React from 'react';
import { Image, View } from 'react-native';

export default function OnboardingScreen() {
  return (
    <View className="w-full h-full flex-1 relative">
      <View className="w-full h-full absolute bg-black/50" />
      <Image
        source={require('../../assets/images/cars/car.jpg')}
        className="w-full h-full absolute inset "
        resizeMode="cover"
      />
    </View>
  );
}
