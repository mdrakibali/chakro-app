import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppButton, AppText } from '../../components/common';
import { ONBOARDING_SLIDES } from '../../constants/onboarding';

export default function OnboardingScreen() {
  const navigation = useNavigation();
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
        source={require('../../assets/images/cars/onboarding.png')}
        className="absolute inset-0 h-full w-full"
        resizeMode="cover"
      />

      {/* Layered Dark Backdrop Overlays for High Contrast */}
      <View className="absolute inset-0 bg-black/40" />

      <SafeAreaView className="flex-1 justify-between">
        {/* Top Header with Skip Button */}
        <View className="w-full flex-row justify-end px-6 pt-2">
          <Pressable
            onPress={handleSkip}
            hitSlop={12}
            className="rounded-full border border-white/20 bg-black/40 px-4 py-1.5 active:opacity-70"
          >
            <AppText className="text-sm font-medium text-white/90">
              Skip
            </AppText>
          </Pressable>
        </View>

        {/* Bottom Content Area */}
        <View className="px-6 pb-6">
          {/* Main Heading */}
          <AppText className="text-4xl font-bold text-white">
            {currentSlide.title}
          </AppText>

          {/* Subtitle */}
          <AppText className="mt-3 text-lg leading-6 text-white/80">
            {currentSlide.subtitle}
          </AppText>

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
                      isActive ? 'w-8 bg-primary' : 'w-2 bg-white/80'
                    }`}
                  />
                </Pressable>
              );
            })}
          </View>

          {/* Primary Action Button */}
          <AppButton onPress={handleNext} size="lg" className="mt-8 w-full">
            {isLastSlide ? 'Get Started' : 'Next'}
          </AppButton>
        </View>
      </SafeAreaView>
    </View>
  );
}
