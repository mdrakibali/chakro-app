import { Tag } from 'lucide-react-native';
import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { AppText } from '../../components/common';
import { PromoBanner } from '../../types';
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - 40;
const AUTO_SLIDE_INTERVAL = 4000;

export interface PromoBannerCarouselProps {
  banners: PromoBanner[];
  onBannerPress?: (banner: PromoBanner) => void;
}

export default function PromoBannerCarousel({
  banners,
  onBannerPress,
}: PromoBannerCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<React.ElementRef<typeof ScrollView>>(null);
  const isInteracting = useRef(false);

  // Auto-slide effect
  useEffect(() => {
    if (banners.length <= 1) return;

    const interval = setInterval(() => {
      if (isInteracting.current) return;

      setActiveIndex(prevIndex => {
        const nextIndex = (prevIndex + 1) % banners.length;
        scrollViewRef.current?.scrollTo({
          x: nextIndex * (CARD_WIDTH + 14),
          animated: true,
        });
        return nextIndex;
      });
    }, AUTO_SLIDE_INTERVAL);

    return () => clearInterval(interval);
  }, [banners.length]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slide = Math.round(
      event.nativeEvent.contentOffset.x / (CARD_WIDTH + 14),
    );
    if (slide >= 0 && slide < banners.length && slide !== activeIndex) {
      setActiveIndex(slide);
    }
  };

  const handleTouchStart = () => {
    isInteracting.current = true;
  };

  const handleTouchEnd = () => {
    // Resume auto-slide after slight pause
    setTimeout(() => {
      isInteracting.current = false;
    }, 1500);
  };

  return (
    <View className="w-full mt-6">
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled={false}
        snapToInterval={CARD_WIDTH + 14}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        // eslint-disable-next-line react-native/no-inline-styles
        contentContainerStyle={{
          paddingHorizontal: 20,
          gap: 14,
        }}
      >
        {banners.map(banner => (
          <Pressable
            key={banner.id}
            onPress={() => onBannerPress?.(banner)}
            style={{ width: CARD_WIDTH }}
            className="overflow-hidden rounded-3xl shadow-md h-44"
          >
            {/* Background Image */}
            <Image
              source={{ uri: banner.imageUrl }}
              className="absolute inset-0 h-full w-full"
              resizeMode="cover"
            />

            {/* Gradient Overlay for Text Legibility */}
            <LinearGradient
              colors={[
                'rgba(15, 23, 42, 0.25)',
                'rgba(15, 23, 42, 0.70)',
                'rgba(15, 23, 42, 0.92)',
              ]}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              style={StyleSheet.absoluteFill}
              className="p-5 justify-between"
            >
              {/* Top Row: Badge */}
              <View className="flex-row items-center justify-between">
                <View className="rounded-full bg-primary px-3 py-1 shadow-sm">
                  <AppText className="text-[10px] font-bold text-white tracking-wider">
                    {banner.badge}
                  </AppText>
                </View>
              </View>

              {/* Title, Subtitle and Code */}
              <View>
                <AppText className="text-xl font-bold text-white">
                  {banner.title}
                </AppText>
                <AppText
                  className="mt-1 text-xs text-white/85 font-normal"
                  numberOfLines={2}
                >
                  {banner.subtitle}
                </AppText>
                {banner.code && (
                  <View className="mt-2.5 self-start flex-row items-center rounded-xl bg-white/20 px-2.5 py-1 border border-white/30 backdrop-blur-sm">
                    <Tag size={12} color="#FFFFFF" />
                    <AppText className="ml-1.5 text-xs font-bold text-white">
                      Code: {banner.code}
                    </AppText>
                  </View>
                )}
              </View>
            </LinearGradient>
          </Pressable>
        ))}
      </ScrollView>

      {/* Pagination Dots */}
      <View className="mt-3 flex-row justify-center items-center gap-1.5">
        {banners.map((_, idx) => (
          <View
            key={`dot-${idx}`}
            className={`h-1.5 rounded-full transition-all ${
              activeIndex === idx ? 'w-6 bg-primary' : 'w-1.5 bg-border'
            }`}
          />
        ))}
      </View>
    </View>
  );
}
