import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Compass, Heart, Home, User } from 'lucide-react-native';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText } from '../common';

interface TabItemConfig {
  label: string;
  IconComponent: React.ComponentType<{
    size?: number;
    color?: string;
    strokeWidth?: number;
  }>;
}

const TAB_CONFIG: Record<string, TabItemConfig> = {
  Home: {
    label: 'Home',
    IconComponent: Home,
  },
  Explore: {
    label: 'Explore',
    IconComponent: Compass,
  },
  Wishlist: {
    label: 'Wishlist',
    IconComponent: Heart,
  },
  Profile: {
    label: 'Profile',
    IconComponent: User,
  },
};

const ACTIVE_COLOR = '#F07828';
const INACTIVE_COLOR = '#9CA3AF';

export default function CustomBottomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[styles.container, { paddingBottom: Math.max(insets.bottom, 12) }]}
      className="w-full bg-background flex-row justify-around items-center pt-3 shadow-sm"
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const config = TAB_CONFIG[route.name] || {
          label: route.name,
          IconComponent: Home,
        };
        const { label, IconComponent } = config;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const currentColor = isFocused ? ACTIVE_COLOR : INACTIVE_COLOR;

        return (
          <Pressable
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            className="flex-1 items-center justify-center py-1"
            hitSlop={8}
          >
            <IconComponent
              size={24}
              color={currentColor}
              strokeWidth={isFocused ? 2.5 : 2}
            />

            <AppText
              style={{ color: currentColor }}
              className={`text-xs mt-1 ${isFocused ? 'font-semibold' : 'font-medium'}`}
            >
              {label}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
});
