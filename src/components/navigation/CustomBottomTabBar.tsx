import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Compass, Heart, Home, User } from 'lucide-react-native';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText } from '../common';

interface TabItemConfig {
  label: string;
  renderIcon: (isFocused: boolean) => React.ReactNode;
}

const ACTIVE_COLOR = '#F07828';
const INACTIVE_COLOR = '#9CA3AF';

const TAB_CONFIG: Record<string, TabItemConfig> = {
  Home: {
    label: 'Home',
    renderIcon: isFocused => (
      <Home
        size={22}
        color={isFocused ? ACTIVE_COLOR : INACTIVE_COLOR}
        fill={isFocused ? ACTIVE_COLOR : 'none'}
        strokeWidth={isFocused ? 2.2 : 1.8}
      />
    ),
  },
  Explore: {
    label: 'Explore',
    renderIcon: isFocused => (
      <Compass
        size={22}
        color={isFocused ? ACTIVE_COLOR : INACTIVE_COLOR}
        strokeWidth={isFocused ? 2.4 : 1.8}
      />
    ),
  },
  Wishlist: {
    label: 'Wishlist',
    renderIcon: isFocused => (
      <Heart
        size={22}
        color={isFocused ? ACTIVE_COLOR : INACTIVE_COLOR}
        fill={isFocused ? ACTIVE_COLOR : 'none'}
        strokeWidth={isFocused ? 2.2 : 1.8}
      />
    ),
  },
  Profile: {
    label: 'Profile',
    renderIcon: isFocused => (
      <User
        size={22}
        color={isFocused ? ACTIVE_COLOR : INACTIVE_COLOR}
        fill={isFocused ? ACTIVE_COLOR : 'none'}
        strokeWidth={isFocused ? 2.2 : 1.8}
      />
    ),
  },
};

export default function CustomBottomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.floatingContainer,
        {
          bottom: Math.max(insets.bottom, 12),
        },
      ]}
      className="flex-row items-center justify-around bg-surface py-2.5 rounded-full"
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const config = TAB_CONFIG[route.name] || {
          label: route.name,
          renderIcon: () => <Home size={22} color={INACTIVE_COLOR} />,
        };
        const { label, renderIcon } = config;

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

        return (
          <Pressable
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            className="flex-1 items-center justify-center py-1 active:opacity-80"
            hitSlop={6}
          >
            {/* Tab Icon */}
            <View className="items-center justify-center">
              {renderIcon(isFocused)}
            </View>

            {/* Tab Label */}
            <AppText
              className={`text-[11px] mt-1 ${
                isFocused
                  ? 'font-bold text-primary'
                  : 'font-medium text-[#9CA3AF]'
              }`}
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
  floatingContainer: {
    position: 'absolute',
    left: 18,
    right: 18,
    elevation: 12,
  },
});
