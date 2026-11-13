import { Tag } from 'lucide-react-native';
import React, { useState } from 'react';
import { Dimensions, Image, Pressable, View } from 'react-native';
import { Carousel } from 'react-native-reanimated-carousel';
import { AppText } from '../../components/common';
import { PromoBanner } from '../../types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_HEIGHT = 176;

export interface PromoBannerCarouselProps {
  banners: PromoBanner[];
  onBannerPress?: (banner: PromoBanner) => void;
}

export default function PromoBannerCarousel({
  banners,
  onBannerPress,
}: PromoBannerCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <View className="w-full mt-6">
      <Carousel
        style={{ width: SCREEN_WIDTH, height: CARD_HEIGHT }}
        data={banners}
        loop
        autoplay
        autoplayInterval={4000}
        onSnapToItem={index => setActiveIndex(index)}
        renderItem={({ item: banner }) => (
          <View className="w-full h-full px-5">
            <Pressable
              onPress={() => onBannerPress?.(banner)}
              className="flex-1 overflow-hidden rounded-3xl shadow-md"
            >
              {/* Background Image */}
              <Image
                source={{ uri: banner.imageUrl }}
                className="absolute inset-0 h-full w-full"
                resizeMode="cover"
              />

              {/* Customizable Overlay for Text Contrast */}
              <View className="absolute inset-0 bg-black/40 p-5 justify-between">
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
                    className="mt-1 text-xs text-white/90 font-normal"
                    numberOfLines={2}
                  >
                    {banner.subtitle}
                  </AppText>
                  {banner.code && (
                    <View className="mt-2.5 self-start flex-row items-center rounded-xl bg-white/20 px-2.5 py-1 border border-white/30">
                      <Tag size={12} color="#FFFFFF" />
                      <AppText className="ml-1.5 text-xs font-bold text-white">
                        Code: {banner.code}
                      </AppText>
                    </View>
                  )}
                </View>
              </View>
            </Pressable>
          </View>
        )}
      />

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
