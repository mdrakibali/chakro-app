import { Bell, ChevronDown, Search, SlidersHorizontal } from 'lucide-react-native';
import React from 'react';
import { Image, Pressable, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppText } from '../../components/common';
import { UserLocation, UserProfile } from '../../types';

export interface HomeHeaderProps {
  user: UserProfile;
  location: UserLocation;
  hasUnreadNotifications?: boolean;
  searchQuery?: string;
  onSearchChange?: (text: string) => void;
  onProfilePress?: () => void;
  onLocationPress?: () => void;
  onNotificationPress?: () => void;
  onFilterPress?: () => void;
  onSearchPress?: () => void;
}

export default function HomeHeader({
  user,
  location,
  hasUnreadNotifications = true,
  searchQuery = '',
  onSearchChange,
  onProfilePress,
  onLocationPress,
  onNotificationPress,
  onFilterPress,
  onSearchPress,
}: HomeHeaderProps) {
  return (
    <SafeAreaView edges={['top']} className="bg-white px-5 pt-1 pb-3 border-b border-border/40">
      {/* Top Row: User Avatar, Name, Location & Notification Bell */}
      <View className="flex-row items-center justify-between pb-3.5">
        {/* Left: User Avatar + Name + Location Dropdown */}
        <Pressable
          onPress={onProfilePress}
          className="flex-row items-center flex-1 pr-2 active:opacity-85"
          hitSlop={6}
        >
          {/* Avatar with subtle ring */}
          <View className="relative">
            <Image
              source={{ uri: user.avatarUrl }}
              className="h-11 w-11 rounded-full border border-border"
            />
            {user.isVerified && (
              <View className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 border border-white" />
            )}
          </View>

          {/* Name & Location Subtitle */}
          <View className="ml-3 flex-1">
            <AppText
              className="text-base font-bold text-heading leading-tight"
              numberOfLines={1}
            >
              {user.name}
            </AppText>

            <Pressable
              onPress={onLocationPress}
              className="flex-row items-center mt-0.5 active:opacity-75"
              hitSlop={6}
            >
              <AppText className="text-xs font-normal text-muted" numberOfLines={1}>
                {location.city}, {location.country}
              </AppText>
              <ChevronDown size={14} color="#6B7280" className="ml-1" />
            </Pressable>
          </View>
        </Pressable>

        {/* Right: Circular Notification Bell Button */}
        <Pressable
          onPress={onNotificationPress}
          className="relative h-11 w-11 items-center justify-center rounded-full bg-surface border border-border/80 active:opacity-75"
          hitSlop={6}
        >
          <Bell size={20} color="#111827" />
          {hasUnreadNotifications && (
            <View className="absolute top-2.5 right-2.5 h-2.5 w-2.5 rounded-full bg-accent-coral border border-white" />
          )}
        </Pressable>
      </View>

      {/* Bottom Row: Full Rounded Search Bar & Filter Button */}
      <View className="flex-row items-center">
        {/* Search Input Box */}
        <Pressable
          onPress={onSearchPress}
          className="flex-1 flex-row items-center bg-surface rounded-full px-4 py-2.5 border border-border/80"
        >
          <Search size={19} color="#6B7280" />
          <TextInput
            value={searchQuery}
            onChangeText={onSearchChange}
            placeholder="Search cars or brands..."
            placeholderTextColor="#9CA3AF"
            className="flex-1 ml-2.5 text-sm font-normal text-heading py-0"
            onFocus={onSearchPress}
          />
        </Pressable>

        {/* Circular Filter Button */}
        <Pressable
          onPress={onFilterPress}
          className="ml-2.5 h-11 w-11 items-center justify-center rounded-full bg-surface border border-border/80 active:opacity-75"
          hitSlop={6}
        >
          <SlidersHorizontal size={19} color="#111827" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
