import { useNavigation, useRoute } from '@react-navigation/native';
import { ChevronLeft } from 'lucide-react-native';
import React from 'react';
import { KeyboardAvoidingView, Platform, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppText } from '../../components/common';

export interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function AuthLayout({ children, title }: AuthLayoutProps) {
  const route = useRoute();
  const navigation = useNavigation();
  const headerTitle = title ?? route.name;

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('Welcome');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1 bg-background"
    >
      <SafeAreaView className="flex-1 px-6 pt-2 pb-6">
        {/* Top Header */}
        <View className="flex-row items-center justify-between mb-6">
          <Pressable
            className="h-10 w-10 items-center justify-center rounded-full border border-border bg-surface active:opacity-70"
            onPress={handleBack}
            hitSlop={10}
          >
            <ChevronLeft size={20} color="#111827" />
          </Pressable>

          <AppText className="text-xl font-bold text-heading">
            {headerTitle}
          </AppText>
        </View>

        {/* Content */}
        <View className="flex-1">{children}</View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
