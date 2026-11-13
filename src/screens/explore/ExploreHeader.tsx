import { Search, SlidersHorizontal, X } from 'lucide-react-native';
import React from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export interface ExploreHeaderProps {
  searchQuery: string;
  onSearchChange: (text: string) => void;
  onClearSearch: () => void;
  onOpenFilter: () => void;
  hasActiveFilters?: boolean;
}

export default function ExploreHeader({
  searchQuery,
  onSearchChange,
  onClearSearch,
  onOpenFilter,
  hasActiveFilters = false,
}: ExploreHeaderProps) {
  return (
    <SafeAreaView edges={['top']} className="bg-white border-b border-border/40 px-5 pb-3 pt-1">
      <View className="flex-row items-center">
        {/* Search Input Box */}
        <View className="flex-1 flex-row items-center bg-surface rounded-full px-4 py-2 border border-border/80">
          <Search size={19} color="#6B7280" />
          <TextInput
            value={searchQuery}
            onChangeText={onSearchChange}
            placeholder="Search by car name, brand, or type..."
            placeholderTextColor="#9CA3AF"
            className="flex-1 ml-2 text-sm font-normal text-heading py-1"
            returnKeyType="search"
            autoCapitalize="none"
            autoCorrect={false}
          />
          {searchQuery.length > 0 && (
            <Pressable
              onPress={onClearSearch}
              hitSlop={8}
              className="h-6 w-6 rounded-full bg-border/80 items-center justify-center ml-1"
            >
              <X size={13} color="#4B5563" />
            </Pressable>
          )}
        </View>

        {/* Filter Button with Active Dot Indicator */}
        <Pressable
          onPress={onOpenFilter}
          hitSlop={6}
          className={`ml-2.5 h-11 w-11 items-center justify-center rounded-full border active:opacity-75 relative ${
            hasActiveFilters
              ? 'bg-primary/10 border-primary'
              : 'bg-surface border-border/80'
          }`}
        >
          <SlidersHorizontal
            size={19}
            color={hasActiveFilters ? '#F07828' : '#111827'}
          />
          {hasActiveFilters && (
            <View className="absolute top-2.5 right-2.5 h-2.5 w-2.5 rounded-full bg-primary border-2 border-white" />
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

