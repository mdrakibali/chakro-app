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
  const [hasUnread, setHasUnread] = useState(true);
  const [favoriteIds, setFavoriteIds] = useState<string[]>(['car-2']);

  // Toggle favorite car
  const handleToggleFavorite = (carId: string) => {
    setFavoriteIds(prev =>
      prev.includes(carId) ? prev.filter(id => id !== carId) : [...prev, carId],
    );
  };

  // Route brand selection directly to Explore
  const handleSelectBrand = (brand: Brand) => {
    navigation.navigate('Explore', {
      brandId: brand.id,
      brand: brand.name,
    });
  };

  const handleSeeAllBrands = () => {
    navigation.navigate('Explore');
  };

  const handleSearchPress = () => {
    navigation.navigate('Explore');
  };

  const handleFilterPress = () => {
    navigation.navigate('Explore');
  };

  const popularCars = useMemo(() => {
    return MOCK_CARS.filter(car => car.isPopular);
  }, []);

  const handleNotificationPress = () => {
    setHasUnread(false);
  };

  const handleCarPress = (car: Car) => {
    console.log('Selected car:', car.name);
  };

  const handleSeeAllCars = () => {
    navigation.navigate('Explore');
  };

  const handleBannerPress = (banner: PromoBanner) => {
    console.log('Banner clicked:', banner.title);
  };

  return (
    <View className="flex-1 bg-background">
      <StatusBar barStyle="dark-content" />

      {/* 1. Header with search trigger & filter button */}
      <HomeHeader
        user={CURRENT_USER}
        location={INITIAL_LOCATION}
        hasUnreadNotifications={hasUnread}
        onSearchPress={handleSearchPress}
        onFilterPress={handleFilterPress}
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
            onSelectBrand={handleSelectBrand}
            onSeeAllPress={handleSeeAllBrands}
          />

          {/* 3. Popular Cars Horizontal Carousel (Sliding cards) */}
          <PopularCarsCarousel
            cars={popularCars}
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
            cars={MOCK_CARS}
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
