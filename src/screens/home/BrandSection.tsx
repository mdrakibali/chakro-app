import React from 'react';
import { ScrollView, View } from 'react-native';
import { Brand } from '../../types';
import BrandItem from './BrandItem';
import SectionHeader from './SectionHeader';

export interface BrandSectionProps {
  brands: Brand[];
  selectedBrandId?: string | null;
  onSelectBrand: (brand: Brand) => void;
  onSeeAllPress?: () => void;
}

export default function BrandSection({
  brands,
  selectedBrandId,
  onSelectBrand,
  onSeeAllPress,
}: BrandSectionProps) {
  return (
    <View className="w-full mt-2">
      <View className="px-5">
        <SectionHeader
          title="Brands"
          actionText="See All"
          onActionPress={onSeeAllPress}
        />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="w-full"
      >
        <View className="flex-row pl-5 pr-1 pt-1 pb-2">
          {brands.map(brand => (
            <BrandItem
              key={brand.id}
              brand={brand}
              isSelected={selectedBrandId === brand.id}
              onPress={onSelectBrand}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
