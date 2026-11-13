import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
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
        contentContainerStyle={styles.listContent}
      >
        {brands.map(brand => (
          <BrandItem
            key={brand.id}
            brand={brand}
            isSelected={selectedBrandId === brand.id}
            onPress={onSelectBrand}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 8,
  },
});

