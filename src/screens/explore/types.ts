export interface FilterState {
  category: string;
  transmission: string;
  fuelType: string;
  priceRange: string;
  instantUnlockOnly: boolean;
}

export const DEFAULT_FILTERS: FilterState = {
  category: 'All',
  transmission: 'All',
  fuelType: 'All',
  priceRange: 'All',
  instantUnlockOnly: false,
};

export interface BrandFilterOption {
  id: string;
  name: string;
}

export const QUICK_BRANDS: BrandFilterOption[] = [
  { id: 'all', name: 'All Brands' },
  { id: '1', name: 'BMW' },
  { id: '2', name: 'Toyota' },
  { id: '3', name: 'Mercedes' },
  { id: '4', name: 'Tesla' },
  { id: '5', name: 'Hyundai' },
  { id: '6', name: 'Audi' },
  { id: '7', name: 'Porsche' },
];

export const CATEGORY_OPTIONS = [
  'All',
  'Sedan',
  'SUV',
  'Luxury',
  'Sports',
  'Electric',
];

export const TRANSMISSION_OPTIONS = ['All', 'Automatic', 'Manual'];

export const FUEL_OPTIONS = ['All', 'Petrol', 'Electric', 'Hybrid'];

export const PRICE_RANGE_OPTIONS = [
  { id: 'All', label: 'All' },
  { id: 'under40', label: 'Under $40/h' },
  { id: '40to55', label: '$40 - $55/h' },
  { id: 'above55', label: '$55+/h' },
];
