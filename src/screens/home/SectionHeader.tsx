import React from 'react';
import { Pressable, View } from 'react-native';
import { AppText } from '../../components/common';

export interface SectionHeaderProps {
  title: string;
  actionText?: string;
  onActionPress?: () => void;
}

export default function SectionHeader({
  title,
  actionText = 'See All',
  onActionPress,
}: SectionHeaderProps) {
  return (
    <View className="w-full flex-row items-center justify-between py-3">
      <AppText className="text-xl font-bold text-heading">
        {title}
      </AppText>

      {actionText && (
        <Pressable onPress={onActionPress} hitSlop={8} className="active:opacity-70">
          <AppText className="text-sm font-semibold text-primary">
            {actionText}
          </AppText>
        </Pressable>
      )}
    </View>
  );
}

