import { useNavigation } from '@react-navigation/native';
import React, { useMemo, useState } from 'react';
import { ScrollView, StatusBar, View } from 'react-native';
import {
  CURRENT_USER,
  INITIAL_LOCATION,
  MOCK_BRANDS,
  MOCK_CARS,
  PROMO_BANNERS,
} from '../../constants';
import { Brand, Car, PromoBanner } from '../../types';
import BrandSection from './BrandSection';
import FeaturedCarsSection from './FeaturedCarsSection';
import HomeHeader from './HomeHeader';
import PopularCarsCarousel from './PopularCarsCarousel';
import PromoBannerCarousel from './PromoBannerCarousel';

export default function HomeScreen() {
  const navigation = useNavigation();

  // State management
  const [selectedBrandId, setSelectedBrandId] = useState<string | null>(null);
  const [hasUnread, setHasUnread] = useState(true);
  const [favoriteIds, setFavoriteIds] = useState<string[]>(['car-2']);
  const [searchQuery, setSearchQuery] = useState('');

  // Toggle favorite car
  const handleToggleFavorite = (carId: string) => {
    setFavoriteIds(prev =>
      prev.includes(carId) ? prev.filter(id => id !== carId) : [...prev, carId],
    );
  };

  // Toggle brand filter
  const handleSelectBrand = (brand: Brand) => {
    setSelectedBrandId(prev => (prev === brand.id ? null : brand.id));
  };

  // Filter cars based on brand and search query
  const filteredCars = useMemo(() => {
    return MOCK_CARS.filter(car => {
      if (selectedBrandId) {
        const brandObj = MOCK_BRANDS.find(b => b.id === selectedBrandId);
        if (
          brandObj &&
          !car.brand.toLowerCase().includes(brandObj.name.toLowerCase())
        ) {
          return false;
        }
      }

      if (searchQuery.trim().length > 0) {
        const q = searchQuery.toLowerCase();
        return (
          car.name.toLowerCase().includes(q) ||
          car.brand.toLowerCase().includes(q) ||
          car.category.toLowerCase().includes(q)
        );
      }

      return true;
    });
  }, [selectedBrandId, searchQuery]);

  const popularCars = useMemo(() => {
    return filteredCars.filter(car => car.isPopular);
  }, [filteredCars]);

  const handleNotificationPress = () => {
    setHasUnread(false);
  };

  const handleCarPress = (car: Car) => {
    console.log('Selected car:', car.name);
  };

  const handleSeeAllBrands = () => {
    setSelectedBrandId(null);
  };

  const handleSeeAllCars = () => {
    navigation.navigate('Explore');
  };

  const handleBannerPress = (banner: PromoBanner) => {
    console.log('Banner clicked:', banner.title);
  };

  const handleSearchPress = () => {
    navigation.navigate('Explore');
  };

  return (
    <View className="flex-1 bg-background">
      <StatusBar barStyle="dark-content" />

      {/* 1. Header (Format matching Image 1) */}
      <HomeHeader
        user={CURRENT_USER}
        location={INITIAL_LOCATION}
        hasUnreadNotifications={hasUnread}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchPress={handleSearchPress}
        onFilterPress={handleSearchPress}
        onNotificationPress={handleNotificationPress}
      />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View className="pb-28">
          {/* 2. Automotive Brands */}
          <BrandSection
            brands={MOCK_BRANDS}
            selectedBrandId={selectedBrandId}
            onSelectBrand={handleSelectBrand}
            onSeeAllPress={handleSeeAllBrands}
          />

          {/* 3. Popular Cars Horizontal Carousel (Sliding cards) */}
          <PopularCarsCarousel
            cars={popularCars.length > 0 ? popularCars : filteredCars}
            favoriteIds={favoriteIds}
            onToggleFavorite={handleToggleFavorite}
            onCarPress={handleCarPress}
            onSeeAllPress={handleSeeAllCars}
          />

          {/* 4. Promotional Banner Carousel (Auto-slide with Real Car BG) */}
          <PromoBannerCarousel
            banners={PROMO_BANNERS}
            onBannerPress={handleBannerPress}
          />

          {/* 5. Featured Fleet Section (Vertical Cards) */}
          <FeaturedCarsSection
            title="Featured Fleet"
            cars={filteredCars}
            favoriteIds={favoriteIds}
            onToggleFavorite={handleToggleFavorite}
            onCarPress={handleCarPress}
            onSeeAllPress={handleSeeAllCars}
          />
        </View>
      </ScrollView>
    </View>
  );
}
