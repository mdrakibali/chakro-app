export type CarCategory =
  | 'All'
  | 'Sedan'
  | 'SUV'
  | 'Luxury'
  | 'Sports'
  | 'Electric'
  | 'Economy';

export type TransmissionType = 'Manual' | 'Automatic';

export type FuelType = 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';

export interface CarSpec {
  transmission: TransmissionType;
  fuelType: FuelType;
  seats: number;
}

export interface Car {
  id: string;
  name: string;
  brand: string;
  category: CarCategory;
  rating: number;
  reviewCount: number;
  pricePerHour: number;
  pricePerDay?: number;
  image: string;
  specs: CarSpec;
  distance?: string;
  instantUnlock?: boolean;
  isPopular?: boolean;
  isFavorite?: boolean;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string;
  accentColor?: string;
}

export interface UserProfile {
  name: string;
  avatarUrl: string;
  isVerified?: boolean;
}

export interface UserLocation {
  city: string;
  country: string;
  airportOrArea?: string;
}

export interface PromoBanner {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  code?: string;
  imageUrl: string;
  bgGradient?: [string, string];
}

