import React from 'react';
import { Pressable, View } from 'react-native';
import { AppText } from '../../components/common';
import { Brand } from '../../types';
import BrandLogo from './BrandLogos';

export interface BrandItemProps {
  brand: Brand;
  isSelected?: boolean;
  onPress: (brand: Brand) => void;
}

export default function BrandItem({
  brand,
  isSelected = false,
  onPress,
}: BrandItemProps) {
  return (
    <Pressable
      onPress={() => onPress(brand)}
      className="items-center mr-5 active:opacity-75"
    >
      <View
        className={`h-16 w-16 items-center justify-center rounded-full border ${
          isSelected
            ? 'border-primary bg-primary/10'
            : 'border-border/60 bg-surface'
        }`}
      >
        <BrandLogo
          slug={brand.slug}
          size={28}
          color={isSelected ? '#F07828' : '#111827'}
        />
      </View>

      <AppText
        className={`mt-2 text-xs text-center ${
          isSelected ? 'font-bold text-primary' : 'font-medium text-heading'
        }`}
      >
        {brand.name}
      </AppText>
    </Pressable>
  );
}

