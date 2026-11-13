import { RouteProp, useRoute } from '@react-navigation/native';
import { ArrowUpDown, Car as CarIcon, RotateCcw } from 'lucide-react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, Pressable, StatusBar, View } from 'react-native';
import { AppButton, AppText } from '../../components/common';
import { MOCK_CARS } from '../../constants';
import { Car, MainTabParamList } from '../../types';
import CarCard from '../home/CarCard';
import BrandFilterChips from './BrandFilterChips';
import ExploreHeader from './ExploreHeader';
import FilterBottomSheet from './FilterBottomSheet';
import {
  BrandFilterOption,
  DEFAULT_FILTERS,
  FilterState,
  QUICK_BRANDS,
} from './types';

type ExploreRouteProp = RouteProp<MainTabParamList, 'Explore'>;

type SortOption = 'recommended' | 'priceLow' | 'priceHigh' | 'rating';

export default function ExploreScreen() {
  const route = useRoute<ExploreRouteProp>();

  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrandId, setSelectedBrandId] = useState<string>('all');
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState<string[]>(['car-2']);
  const [sortBy, setSortBy] = useState<SortOption>('recommended');

  // Handle incoming route params (e.g. from HomeScreen brand click or search trigger)
  useEffect(() => {
    if (route.params?.brandId) {
      setSelectedBrandId(route.params.brandId);
    } else if (route.params?.brand) {
      const found = QUICK_BRANDS.find(
        b => b.name.toLowerCase() === route.params?.brand?.toLowerCase(),
      );
      if (found) {
        setSelectedBrandId(found.id);
      }
    }

    if (route.params?.search) {
      setSearchQuery(route.params.search);
    }
  }, [route.params]);

  // Check if any filter is active
  const hasActiveFilters = useMemo(() => {
    return (
      selectedBrandId !== 'all' ||
      searchQuery.trim().length > 0 ||
      filters.category !== 'All' ||
      filters.transmission !== 'All' ||
      filters.fuelType !== 'All' ||
      filters.priceRange !== 'All' ||
      filters.instantUnlockOnly
    );
  }, [selectedBrandId, searchQuery, filters]);

  // Handle Brand selection
  const handleSelectBrand = (brand: BrandFilterOption) => {
    setSelectedBrandId(brand.id);
  };

  // Toggle favorite car
  const handleToggleFavorite = (carId: string) => {
    setFavoriteIds(prev =>
      prev.includes(carId) ? prev.filter(id => id !== carId) : [...prev, carId],
    );
  };

  const handleResetAll = () => {
    setSelectedBrandId('all');
    setSearchQuery('');
    setFilters(DEFAULT_FILTERS);
  };

  // Filter and sort cars
  const filteredCars = useMemo(() => {
    const list = MOCK_CARS.filter(car => {
      // 1. Search Query
      if (searchQuery.trim().length > 0) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = car.name.toLowerCase().includes(q);
        const matchesBrand = car.brand.toLowerCase().includes(q);
        const matchesCat = car.category.toLowerCase().includes(q);
        if (!matchesName && !matchesBrand && !matchesCat) {
          return false;
        }
      }

      // 2. Brand Filter
      if (selectedBrandId !== 'all') {
        const brandObj = QUICK_BRANDS.find(b => b.id === selectedBrandId);
        if (
          brandObj &&
          !car.brand.toLowerCase().includes(brandObj.name.toLowerCase())
        ) {
          return false;
        }
      }

      // 3. Category Filter
      if (filters.category !== 'All' && car.category !== filters.category) {
        return false;
      }

      // 4. Transmission
      if (
        filters.transmission !== 'All' &&
        car.specs.transmission !== filters.transmission
      ) {
        return false;
      }

      // 5. Fuel Type
      if (
        filters.fuelType !== 'All' &&
        car.specs.fuelType !== filters.fuelType
      ) {
        return false;
      }

      // 6. Price Range
      if (filters.priceRange === 'under40' && car.pricePerHour >= 40) {
        return false;
      }
      if (
        filters.priceRange === '40to55' &&
        (car.pricePerHour < 40 || car.pricePerHour > 55)
      ) {
        return false;
      }
      if (filters.priceRange === 'above55' && car.pricePerHour <= 55) {
        return false;
      }

      // 7. Instant Unlock
      if (filters.instantUnlockOnly && !car.instantUnlock) {
        return false;
      }

      return true;
    });

    // Sort list
    if (sortBy === 'priceLow') {
      return [...list].sort((a, b) => a.pricePerHour - b.pricePerHour);
    }
    if (sortBy === 'priceHigh') {
      return [...list].sort((a, b) => b.pricePerHour - a.pricePerHour);
    }
    if (sortBy === 'rating') {
      return [...list].sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [searchQuery, selectedBrandId, filters, sortBy]);

  const handleCycleSort = () => {
    setSortBy(prev => {
      if (prev === 'recommended') return 'priceLow';
      if (prev === 'priceLow') return 'priceHigh';
      if (prev === 'priceHigh') return 'rating';
      return 'recommended';
    });
  };

  const getSortLabel = () => {
    switch (sortBy) {
      case 'priceLow':
        return 'Price: Low';
      case 'priceHigh':
        return 'Price: High';
      case 'rating':
        return 'Top Rated';
      default:
        return 'Featured';
    }
  };

  const handleCarPress = (car: Car) => {
    console.log('Selected car in Explore:', car.name);
  };

  return (
    <View className="flex-1 bg-background">
      <StatusBar barStyle="dark-content" />

      {/* Top Search & Filter Bar */}
      <ExploreHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onClearSearch={() => setSearchQuery('')}
        onOpenFilter={() => setIsFilterSheetOpen(true)}
        hasActiveFilters={hasActiveFilters}
      />

      {/* Quick Brand Filter Chips */}
      <BrandFilterChips
        selectedBrandId={selectedBrandId}
        onSelectBrand={handleSelectBrand}
      />

      {/* Results Count & Sort Strip */}
      <View className="flex-row items-center justify-between px-5 py-2.5 bg-background border-b border-border/30">
        <AppText className="text-xs font-semibold text-muted">
          {filteredCars.length} {filteredCars.length === 1 ? 'vehicle' : 'vehicles'} available
        </AppText>

        <View className="flex-row items-center gap-2">
          {hasActiveFilters && (
            <Pressable
              onPress={handleResetAll}
              className="flex-row items-center px-2 py-1 rounded-md bg-surface active:opacity-75"
              hitSlop={6}
            >
              <RotateCcw size={11} color="#EF4444" />
              <AppText className="ml-1 text-[11px] font-bold text-red-500">
                Reset
              </AppText>
            </Pressable>
          )}

          <Pressable
            onPress={handleCycleSort}
            className="flex-row items-center px-2.5 py-1 rounded-full bg-white border border-border/80 active:opacity-75"
            hitSlop={6}
          >
            <ArrowUpDown size={11} color="#4B5563" />
            <AppText className="ml-1 text-[11px] font-semibold text-heading">
              {getSortLabel()}
            </AppText>
          </Pressable>
        </View>
      </View>

      {/* Car List */}
      <FlatList
        data={filteredCars}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="px-5 pt-3.5 pb-28"
        renderItem={({ item }) => (
          <CarCard
            car={item}
            isFavorite={favoriteIds.includes(item.id)}
            onPress={handleCarPress}
            onToggleFavorite={handleToggleFavorite}
          />
        )}
        ListEmptyComponent={
          <View className="items-center justify-center py-16 px-6">
            <View className="h-16 w-16 rounded-full bg-surface items-center justify-center border border-border/60 mb-3">
              <CarIcon size={28} color="#9CA3AF" />
            </View>
            <AppText className="text-base font-bold text-heading text-center">
              No Vehicles Found
            </AppText>
            <AppText className="text-xs text-muted text-center mt-1 max-w-[240px]">
              Try adjusting your search or clearing active filters to see more results.
            </AppText>
            <AppButton
              variant="outline"
              size="sm"
              onPress={handleResetAll}
              className="mt-4 rounded-full"
            >
              Clear All Filters
            </AppButton>
          </View>
        }
      />

      {/* Filter Bottom Sheet */}
      <FilterBottomSheet
        visible={isFilterSheetOpen}
        onClose={() => setIsFilterSheetOpen(false)}
        filters={filters}
        onApply={setFilters}
        onReset={handleResetAll}
        matchingCount={filteredCars.length}
      />
    </View>
  );
}
