import { Fuel, Gauge, Heart, KeyRound, MapPin, Star, Users } from 'lucide-react-native';
import React from 'react';
import { Image, Pressable, View } from 'react-native';
import { AppText } from '../../components/common';
import { Car } from '../../types';

export interface CarCardProps {
  car: Car;
  isFavorite?: boolean;
  onPress?: (car: Car) => void;
  onToggleFavorite?: (carId: string) => void;
}

export default function CarCard({
  car,
  isFavorite = false,
  onPress,
  onToggleFavorite,
}: CarCardProps) {
  const handleToggleFavorite = () => {
    onToggleFavorite?.(car.id);
  };

  return (
    <Pressable
      onPress={() => onPress?.(car)}
      className="mb-4 rounded-3xl border border-border/70 bg-white p-4 shadow-sm active:opacity-95"
    >
      {/* Top Header Row: Rating Badge, Instant Keyless Badge & Favorite */}
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-1.5">
          {/* Rating Pill */}
          <View className="flex-row items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 border border-amber-200/50">
            <Star size={13} fill="#F59E0B" color="#F59E0B" />
            <AppText className="text-xs font-bold text-heading">
              {car.rating.toFixed(1)}
            </AppText>
            <AppText className="text-[10px] text-muted font-normal">
              ({car.reviewCount})
            </AppText>
          </View>

          {/* Keyless Unlock Badge if available */}
          {car.instantUnlock && (
            <View className="flex-row items-center rounded-full bg-emerald-50 px-2 py-0.5 border border-emerald-200/60">
              <KeyRound size={11} color="#059669" />
              <AppText className="ml-1 text-[10px] font-bold text-emerald-700">
                Keyless
              </AppText>
            </View>
          )}
        </View>

        {/* Favorite Heart Button */}
        <Pressable
          onPress={handleToggleFavorite}
          hitSlop={8}
          className="h-9 w-9 items-center justify-center rounded-full bg-surface border border-border/50 active:scale-90"
        >
          <Heart
            size={17}
            fill={isFavorite ? '#EF4444' : 'none'}
            color={isFavorite ? '#EF4444' : '#9CA3AF'}
          />
        </Pressable>
      </View>

      {/* Car Image with URL */}
      <View className="my-2.5 h-44 w-full overflow-hidden rounded-2xl bg-surface items-center justify-center">
        <Image
          source={{ uri: car.image }}
          className="h-full w-full"
          resizeMode="cover"
        />
        {/* Subtle Distance Pill overlay */}
        {car.distance && (
          <View className="absolute bottom-2.5 left-2.5 flex-row items-center rounded-full bg-black/60 px-2.5 py-1 backdrop-blur-md">
            <MapPin size={11} color="#FFFFFF" />
            <AppText className="ml-1 text-[10px] font-semibold text-white">
              {car.distance}
            </AppText>
          </View>
        )}
      </View>

      {/* Details Row: Category, Name & Price */}
      <View className="flex-row items-end justify-between pt-1">
        <View className="flex-1 pr-2">
          {/* Category Pill */}
          <View className="self-start rounded-md bg-primary/10 px-2 py-0.5 mb-1">
            <AppText className="text-[11px] font-semibold text-primary">
              {car.category}
            </AppText>
          </View>

          {/* Car Model Title */}
          <AppText className="text-lg font-bold text-heading" numberOfLines={1}>
            {car.name}
          </AppText>
        </View>

        {/* Price Tag */}
        <View className="items-end">
          <View className="flex-row items-baseline">
            <AppText className="text-xl font-bold text-primary">
              ${car.pricePerHour.toFixed(2)}
            </AppText>
            <AppText className="ml-1 text-xs font-normal text-muted">
              /hr
            </AppText>
          </View>
          {car.pricePerDay && (
            <AppText className="text-[11px] font-normal text-muted mt-0.5">
              ${car.pricePerDay.toFixed(0)}/day
            </AppText>
          )}
        </View>
      </View>

      {/* Divider */}
      <View className="my-3 h-[1px] w-full bg-border/60" />

      {/* Specs Row */}
      <View className="flex-row items-center justify-between px-1">
        {/* Transmission */}
        <View className="flex-row items-center">
          <Gauge size={16} color="#3B82F6" />
          <AppText className="ml-1.5 text-xs font-medium text-muted">
            {car.specs.transmission}
          </AppText>
        </View>

        {/* Fuel Type */}
        <View className="flex-row items-center">
          <Fuel size={16} color="#3B82F6" />
          <AppText className="ml-1.5 text-xs font-medium text-muted">
            {car.specs.fuelType}
          </AppText>
        </View>

        {/* Seats */}
        <View className="flex-row items-center">
          <Users size={16} color="#3B82F6" />
          <AppText className="ml-1.5 text-xs font-medium text-muted">
            {car.specs.seats} Seats
          </AppText>
        </View>
      </View>
    </Pressable>
  );
}
