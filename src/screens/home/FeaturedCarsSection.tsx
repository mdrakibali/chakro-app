import React from 'react';
import { View } from 'react-native';
import { AppText } from '../../components/common';
import { Car } from '../../types';
import CarCard from './CarCard';
import SectionHeader from './SectionHeader';

export interface FeaturedCarsSectionProps {
  cars: Car[];
  favoriteIds: string[];
  onToggleFavorite: (carId: string) => void;
  onCarPress?: (car: Car) => void;
  onSeeAllPress?: () => void;
  title?: string;
}

export default function FeaturedCarsSection({
  cars,
  favoriteIds,
  onToggleFavorite,
  onCarPress,
  onSeeAllPress,
  title = 'Featured Fleet',
}: FeaturedCarsSectionProps) {
  return (
    <View className="w-full px-5 mt-5">
      <SectionHeader
        title={title}
        actionText="See All"
        onActionPress={onSeeAllPress}
      />

      {cars.length === 0 ? (
        <View className="my-6 items-center justify-center py-8 rounded-2xl border border-dashed border-border bg-surface/50">
          <AppText className="text-sm font-medium text-muted">
            No cars available
          </AppText>
        </View>
      ) : (
        <View className="mt-1">
          {cars.map(car => (
            <CarCard
              key={car.id}
              car={car}
              isFavorite={favoriteIds.includes(car.id)}
              onPress={onCarPress}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </View>
      )}
    </View>
  );
}

