import React from 'react';
import { ScrollView, View } from 'react-native';
import { AppText } from '../../components/common';
import { Car } from '../../types';
import CarCard from './CarCard';
import SectionHeader from './SectionHeader';

export interface PopularCarsCarouselProps {
  cars: Car[];
  favoriteIds: string[];
  onToggleFavorite: (carId: string) => void;
  onCarPress?: (car: Car) => void;
  onSeeAllPress?: () => void;
}

export default function PopularCarsCarousel({
  cars,
  favoriteIds,
  onToggleFavorite,
  onCarPress,
  onSeeAllPress,
}: PopularCarsCarouselProps) {
  return (
    <View className="w-full mt-5">
      <View className="px-5">
        <SectionHeader
          title="Popular Cars"
          actionText="See All"
          onActionPress={onSeeAllPress}
        />
      </View>

      {cars.length === 0 ? (
        <View className="mx-5 my-4 items-center justify-center py-8 rounded-2xl border border-dashed border-border bg-surface/50">
          <AppText className="text-sm font-medium text-muted">
            No popular cars found
          </AppText>
        </View>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="w-full"
        >
          <View className="flex-row pl-5 pr-1 pt-1">
            {cars.map(car => (
              <View key={car.id} className="w-[285px] mr-4">
                <CarCard
                  car={car}
                  isFavorite={favoriteIds.includes(car.id)}
                  onPress={onCarPress}
                  onToggleFavorite={onToggleFavorite}
                />
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
}
