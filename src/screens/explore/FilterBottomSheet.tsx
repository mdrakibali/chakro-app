import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { Check, KeyRound, RotateCcw, X } from 'lucide-react-native';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Pressable, View } from 'react-native';
import { AppButton, AppText } from '../../components/common';
import {
  CATEGORY_OPTIONS,
  DEFAULT_FILTERS,
  FilterState,
  FUEL_OPTIONS,
  PRICE_RANGE_OPTIONS,
  TRANSMISSION_OPTIONS,
} from './types';

export interface FilterBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  filters: FilterState;
  onApply: (filters: FilterState) => void;
  onReset: () => void;
  matchingCount: number;
}

export default function FilterBottomSheet({
  visible,
  onClose,
  filters,
  onApply,
  onReset,
  matchingCount,
}: FilterBottomSheetProps) {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['82%'], []);
  const [localFilters, setLocalFilters] = useState<FilterState>(filters);

  // Sync visible state with BottomSheet
  useEffect(() => {
    if (visible) {
      setLocalFilters(filters);
      bottomSheetRef.current?.snapToIndex(0);
    } else {
      bottomSheetRef.current?.close();
    }
  }, [visible, filters]);

  const handleReset = () => {
    setLocalFilters(DEFAULT_FILTERS);
    onReset();
  };

  const handleApply = () => {
    onApply(localFilters);
    bottomSheetRef.current?.close();
    onClose();
  };

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        onClose();
      }
    },
    [onClose],
  );

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.55}
        pressBehavior="close"
      />
    ),
    [],
  );

  const renderHandle = useCallback(
    () => (
      <View className="items-center pt-3 pb-1">
        <View className="h-1.5 w-11 rounded-full bg-border" />
      </View>
    ),
    [],
  );

  const renderBackground = useCallback(
    () => <View className="absolute inset-0 bg-white rounded-t-3xl" />,
    [],
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={visible ? 0 : -1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      backdropComponent={renderBackdrop}
      handleComponent={renderHandle}
      backgroundComponent={renderBackground}
      enablePanDownToClose
    >
      <View className="flex-1 px-5 pt-1 pb-6">
        {/* Header Row */}
        <View className="flex-row items-center justify-between pb-3.5 border-b border-border/40">
          <View>
            <AppText className="text-xl font-bold text-heading">
              Filter Fleet
            </AppText>
            <AppText className="text-xs text-muted font-normal mt-0.5">
              Refine by specs, price, or vehicle type
            </AppText>
          </View>

          <View className="flex-row items-center gap-2">
            <Pressable
              onPress={handleReset}
              hitSlop={6}
              className="flex-row items-center px-2.5 py-1.5 rounded-full bg-surface border border-border/60 active:opacity-75"
            >
              <RotateCcw size={13} color="#6B7280" />
              <AppText className="ml-1 text-xs font-semibold text-muted">
                Reset
              </AppText>
            </Pressable>

            <Pressable
              onPress={() => {
                bottomSheetRef.current?.close();
                onClose();
              }}
              hitSlop={8}
              className="h-8 w-8 items-center justify-center rounded-full bg-surface border border-border/60 active:opacity-75"
            >
              <X size={16} color="#111827" />
            </Pressable>
          </View>
        </View>

        {/* Filter Scrollable Content */}
        <BottomSheetScrollView
          showsVerticalScrollIndicator={false}
          className="flex-1 py-3"
        >
          {/* 1. Vehicle Category */}
          <View className="mb-5">
            <AppText className="text-sm font-bold text-heading mb-2.5">
              Body Category
            </AppText>
            <View className="flex-row flex-wrap gap-2">
              {CATEGORY_OPTIONS.map(cat => {
                const isSelected = localFilters.category === cat;
                return (
                  <Pressable
                    key={cat}
                    onPress={() =>
                      setLocalFilters(prev => ({ ...prev, category: cat }))
                    }
                    className={`px-3.5 py-2 rounded-xl border active:opacity-80 ${
                      isSelected
                        ? 'bg-primary border-primary'
                        : 'bg-surface border-border/80'
                    }`}
                  >
                    <AppText
                      className={`text-xs ${
                        isSelected
                          ? 'font-bold text-white'
                          : 'font-medium text-heading'
                      }`}
                    >
                      {cat}
                    </AppText>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* 2. Transmission */}
          <View className="mb-5">
            <AppText className="text-sm font-bold text-heading mb-2.5">
              Transmission
            </AppText>
            <View className="flex-row gap-2">
              {TRANSMISSION_OPTIONS.map(trans => {
                const isSelected = localFilters.transmission === trans;
                return (
                  <Pressable
                    key={trans}
                    onPress={() =>
                      setLocalFilters(prev => ({
                        ...prev,
                        transmission: trans,
                      }))
                    }
                    className={`flex-1 py-2.5 items-center rounded-xl border active:opacity-80 ${
                      isSelected
                        ? 'bg-primary border-primary'
                        : 'bg-surface border-border/80'
                    }`}
                  >
                    <AppText
                      className={`text-xs ${
                        isSelected
                          ? 'font-bold text-white'
                          : 'font-medium text-heading'
                      }`}
                    >
                      {trans}
                    </AppText>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* 3. Fuel Type */}
          <View className="mb-5">
            <AppText className="text-sm font-bold text-heading mb-2.5">
              Fuel & Powertrain
            </AppText>
            <View className="flex-row flex-wrap gap-2">
              {FUEL_OPTIONS.map(fuel => {
                const isSelected = localFilters.fuelType === fuel;
                return (
                  <Pressable
                    key={fuel}
                    onPress={() =>
                      setLocalFilters(prev => ({ ...prev, fuelType: fuel }))
                    }
                    className={`px-4 py-2 rounded-xl border active:opacity-80 ${
                      isSelected
                        ? 'bg-primary border-primary'
                        : 'bg-surface border-border/80'
                    }`}
                  >
                    <AppText
                      className={`text-xs ${
                        isSelected
                          ? 'font-bold text-white'
                          : 'font-medium text-heading'
                      }`}
                    >
                      {fuel}
                    </AppText>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* 4. Price Hourly Rate */}
          <View className="mb-5">
            <AppText className="text-sm font-bold text-heading mb-2.5">
              Hourly Price
            </AppText>
            <View className="flex-row flex-wrap gap-2">
              {PRICE_RANGE_OPTIONS.map(price => {
                const isSelected = localFilters.priceRange === price.id;
                return (
                  <Pressable
                    key={price.id}
                    onPress={() =>
                      setLocalFilters(prev => ({
                        ...prev,
                        priceRange: price.id,
                      }))
                    }
                    className={`px-3.5 py-2 rounded-xl border active:opacity-80 ${
                      isSelected
                        ? 'bg-primary border-primary'
                        : 'bg-surface border-border/80'
                    }`}
                  >
                    <AppText
                      className={`text-xs ${
                        isSelected
                          ? 'font-bold text-white'
                          : 'font-medium text-heading'
                      }`}
                    >
                      {price.label}
                    </AppText>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* 5. Instant Keyless Unlock Toggle */}
          <Pressable
            onPress={() =>
              setLocalFilters(prev => ({
                ...prev,
                instantUnlockOnly: !prev.instantUnlockOnly,
              }))
            }
            className={`flex-row items-center justify-between p-3.5 rounded-2xl border active:opacity-85 ${
              localFilters.instantUnlockOnly
                ? 'bg-emerald-50/70 border-emerald-300'
                : 'bg-surface border-border/80'
            }`}
          >
            <View className="flex-row items-center flex-1 pr-3">
              <View className="h-9 w-9 rounded-full bg-emerald-100 items-center justify-center">
                <KeyRound size={18} color="#059669" />
              </View>
              <View className="ml-3 flex-1">
                <AppText className="text-sm font-bold text-heading">
                  Instant Keyless Unlock
                </AppText>
                <AppText className="text-xs text-muted font-normal">
                  Unlock with mobile app without host meetup
                </AppText>
              </View>
            </View>

            <View
              className={`h-6 w-6 rounded-md items-center justify-center border ${
                localFilters.instantUnlockOnly
                  ? 'bg-emerald-600 border-emerald-600'
                  : 'bg-white border-border'
              }`}
            >
              {localFilters.instantUnlockOnly && (
                <Check size={14} color="#FFFFFF" strokeWidth={3} />
              )}
            </View>
          </Pressable>
        </BottomSheetScrollView>

        {/* Sticky Apply Button */}
        <View className="pt-3 border-t border-border/40">
          <AppButton
            variant="primary"
            size="lg"
            onPress={handleApply}
            className="w-full rounded-2xl"
          >
            {`Apply Filters (${matchingCount} available)`}
          </AppButton>
        </View>
      </View>
    </BottomSheet>
  );
}
