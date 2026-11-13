import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppButton, AppText } from '../../components/common';

export default function WelcomeScreen() {
  const navigation = useNavigation();

  const handleSignIn = () => {
    navigation.navigate('Auth', { screen: 'SignIn' });
  };

  const handleSignUp = () => {
    navigation.navigate('Auth', { screen: 'SignUp' });
  };

  return (
    <View className="flex-1 bg-black">
      {/* Background Car & Mountain Road Image */}
      <Image
        source={require('../../assets/images/cars/welcome.png')}
        className="absolute inset-0 h-full w-full"
        resizeMode="cover"
      />

      {/* Top Gradient Vignette */}
      <LinearGradient
        colors={['rgba(0,0,0,0.65)', 'rgba(0,0,0,0.15)', 'transparent']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 0.45 }}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />

      {/* Bottom Gradient Vignette */}
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.45)', 'rgba(0,0,0,0.92)']}
        start={{ x: 0.5, y: 0.35 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />

      {/* Safe Interactive Content */}
      <SafeAreaView className="flex-1 justify-between px-6 pb-4">
        {/* Center Hero Branding Section */}
        <View className="flex-1 items-center justify-center">
          {/* Glassmorphic Logo Container */}
          <Image
            source={require('../../assets/logo/cabrio-app-icon.png')}
            className="h-24 w-24 rounded-2xl"
            resizeMode="contain"
          />

          {/* Title */}
          <AppText className="mt-6 text-center text-4xl font-bold tracking-tight text-white">
            Welcome to Cabrio
          </AppText>

          {/* Tagline */}
          <AppText className="mt-2.5 px-6 text-center text-base font-normal text-white/80">
            Premium car rentals at your fingertips
          </AppText>
        </View>

        {/* Bottom Actions */}
        <View className="w-full pb-2">
          <AppButton
            onPress={handleSignIn}
            size="lg"
            className="w-full shadow-md"
          >
            Sign In
          </AppButton>

          <AppButton
            onPress={handleSignUp}
            size="lg"
            variant="outline"
            className="mt-3.5 w-full border-white/30 bg-black/30"
            textClassName="text-white font-semibold"
          >
            Create an Account
          </AppButton>

          {/* Micro Footer Notice */}
          <AppText className="mt-4 text-center text-sm text-white/80">
            By continuing, you agree to our Terms & Privacy Policy
          </AppText>
        </View>
      </SafeAreaView>
    </View>
  );
}
