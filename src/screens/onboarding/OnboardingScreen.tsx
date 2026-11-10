import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ONBOARDING_SLIDES } from '../../constants/onboarding';
import { RootStackParamList } from '../../types/navigation';

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Onboarding'
>;
export default function OnboardingScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [activeSlide, setActiveSlide] = useState<number>(0);

  const currentSlide = ONBOARDING_SLIDES[activeSlide];
  const isLastSlide = activeSlide === ONBOARDING_SLIDES.length - 1;

  const handleNext = () => {
    if (isLastSlide) {
      navigation.navigate('Welcome');
    } else {
      setActiveSlide(prev => prev + 1);
    }
  };

  const handleSkip = () => {
    navigation.navigate('Welcome');
  };

  return (
    <View className="w-full h-full flex-1">
      {/* Background Car Image */}
      <Image
        source={require('../../assets/images/cars/car.jpg')}
        className="absolute inset-0 h-full w-full"
        resizeMode="cover"
      />
      {/* Layered Dark Backdrop Overlays for High Contrast */}
      <View className="absolute inset-0 bg-black/20" />
      <SafeAreaView className="flex-1 justify-between">
        {/* Top Header with Skip Button */}
        <View className="w-full flex-row justify-end px-6 pt-2">
          <Pressable
            onPress={handleSkip}
            hitSlop={12}
            className="rounded-full border border-white/20 bg-black/40 px-4 py-1.5 active:opacity-70"
          >
            <Text className="font-outfit font-medium text-sm text-white/90">
              Skip
            </Text>
          </Pressable>
        </View>

        {/* Bottom Content Area */}
        <View className="px-6 pb-6">
          {/* Main Heading */}
          <Text className="font-outfit font-semibold text-5xl text-gray-300">
            {currentSlide.title}
          </Text>

          {/* Subtitle */}
          <Text className="mt-3 font-outfit text-lg leading-6 text-gray-300">
            {currentSlide.subtitle}
          </Text>

          {/* Pagination Indicators (4 Dots) */}
          <View className="mt-7 flex-row items-center gap-2">
            {ONBOARDING_SLIDES.map(slide => {
              const isActive = slide.id === activeSlide;
              return (
                <Pressable
                  key={slide.id}
                  onPress={() => setActiveSlide(slide.id)}
                  hitSlop={8}
                >
                  <View
                    className={`h-2 rounded-full ${
                      isActive ? 'w-8 bg-primary' : 'w-2 bg-white/40'
                    }`}
                  />
                </Pressable>
              );
            })}
          </View>

          {/* Primary Action Button */}
          <Pressable
            onPress={handleNext}
            className="mt-8 w-full items-center justify-center rounded-2xl bg-primary py-4 active:opacity-90"
          >
            <Text className="font-outfit font-bold text-lg text-white">
              {isLastSlide ? 'Get Started' : 'Next'}
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}
