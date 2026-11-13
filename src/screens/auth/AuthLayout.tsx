import { useNavigation } from '@react-navigation/native';
import { ChevronLeft } from 'lucide-react-native';
import React, { useEffect, useRef, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppText } from '../../components/common';

export interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  scrollable?: boolean;
  autoScrollOnKeyboard?: boolean;
}

export default function AuthLayout({
  children,
  title,
  showBackButton = true,
  onBackPress,
  scrollable = true,
  autoScrollOnKeyboard = true,
}: AuthLayoutProps) {
  const navigation = useNavigation();
  const headerTitle = title ?? '';
  const scrollViewRef = useRef<React.ElementRef<typeof ScrollView>>(null);
  const [keyboardSpace, setKeyboardSpace] = useState<number>(0);

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.getParent()?.goBack();
    }
  };

  useEffect(() => {
    if (!autoScrollOnKeyboard || !scrollable) return;

    const showEvent =
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent =
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const showSub = Keyboard.addListener(showEvent, e => {
      const height = Platform.OS === 'ios' ? e.endCoordinates.height : 30;
      setKeyboardSpace(height);
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    });

    const hideSub = Keyboard.addListener(hideEvent, () => {
      setKeyboardSpace(0);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, [autoScrollOnKeyboard, scrollable]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1 bg-background"
    >
      <StatusBar barStyle="dark-content" />
      <SafeAreaView className="flex-1">
        {/* Fixed Top Header */}
        <View className="flex-row items-center justify-between px-6 pt-2 mb-4">
          {showBackButton ? (
            <Pressable
              className="h-10 w-10 items-center justify-center rounded-full border border-border bg-surface active:opacity-70"
              onPress={handleBack}
              hitSlop={10}
            >
              <ChevronLeft size={20} color="#111827" />
            </Pressable>
          ) : (
            <View className="h-10 w-10" />
          )}

          <AppText className="text-xl font-bold text-heading">
            {headerTitle}
          </AppText>

          {/* Spacer to keep title centered */}
          <View className="h-10 w-10" />
        </View>

        {/* Scrollable Form Content */}
        {scrollable ? (
          <ScrollView
            ref={scrollViewRef}
            className="flex-1 px-6"
            // eslint-disable-next-line react-native/no-inline-styles
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: 24 + keyboardSpace,
            }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
        ) : (
          <View className="flex-1 px-6">{children}</View>
        )}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
