import React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { AppText } from '../../components/common';
import { BrandFilterOption, QUICK_BRANDS } from './types';

export interface BrandFilterChipsProps {
  selectedBrandId: string;
  onSelectBrand: (brand: BrandFilterOption) => void;
}

export default function BrandFilterChips({
  selectedBrandId,
  onSelectBrand,
}: BrandFilterChipsProps) {
  return (
    <View className="py-2.5 bg-white border-b border-border/30">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="w-full"
      >
        <View className="flex-row pl-5 pr-2 gap-2">
          {QUICK_BRANDS.map(brand => {
            const isSelected = selectedBrandId === brand.id;
            return (
              <Pressable
                key={brand.id}
                onPress={() => onSelectBrand(brand)}
                className={`rounded-full px-4 py-2 border active:opacity-80 ${
                  isSelected
                    ? 'bg-primary border-primary'
                    : 'bg-surface border-border/80'
                }`}
              >
                <AppText
                  className={`text-xs ${
                    isSelected
                      ? 'font-bold text-white'
                      : 'font-medium text-heading'
                  }`}
                >
                  {brand.name}
                </AppText>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

