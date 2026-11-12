import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { AppText } from '../../components';

export default function ExploreScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="w-full px-6 mt-20">
        <AppText className="text-2xl font-bold text-heading">
          Explore Cars
        </AppText>
        <AppText className="text-base text-muted mt-2">
          Find and rent the best cars near you.
        </AppText>
      </View>
    </SafeAreaView>
  );
}

