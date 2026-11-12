import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { AppText } from '../../components';

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1">
      <View className="w-full px-6 mt-20">
        <AppText className="text-2xl font-bold text-heading">
          This is Home Screen
        </AppText>
      </View>
    </SafeAreaView>
  );
}
