import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { AppText } from '../../components';

export default function ProfileScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="w-full px-6 mt-20">
        <AppText className="text-2xl font-bold text-heading">
          Profile
        </AppText>
        <AppText className="text-base text-muted mt-2">
          Manage your account settings and preferences.
        </AppText>
      </View>
    </SafeAreaView>
  );
}

