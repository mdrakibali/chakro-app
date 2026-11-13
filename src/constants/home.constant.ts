import {
  Brand,
  Car,
  PromoBanner,
  UserLocation,
  UserProfile,
} from '../types';

export const CURRENT_USER: UserProfile = {
  name: 'Alex Morgan',
  avatarUrl:
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  isVerified: true,
};

export const INITIAL_LOCATION: UserLocation = {
  city: 'New York',
  country: 'USA',
  airportOrArea: 'JFK Airport, Terminal 4',
};

export const PROMO_BANNERS: PromoBanner[] = [
  {
    id: 'promo-1',
    title: 'Weekend Getaway',
    subtitle: 'Save 20% on all Premium SUVs with unlimited mileage',
    badge: 'SPECIAL OFFER',
    code: 'WEEKEND20',
    imageUrl:
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'promo-2',
    title: 'Go Electric Fleet',
    subtitle: 'Zero emissions, free Supercharging on all Teslas',
    badge: 'ECO MOBILITY',
    code: 'CABRIOECO',
    imageUrl:
      'https://images.unsplash.com/photo-1536700503339-1e4b06520771?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'promo-3',
    title: 'Zero Deposit Trips',
    subtitle: 'Instant keyless unlock on verified Cabrio profiles',
    badge: 'KEYLESS DRIVE',
    code: 'INSTANTKEY',
    imageUrl:
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80',
  },
];

export const MOCK_BRANDS: Brand[] = [
  { id: '1', name: 'BMW', slug: 'bmw' },
  { id: '2', name: 'Toyota', slug: 'toyota' },
  { id: '3', name: 'Mercedes', slug: 'mercedes' },
  { id: '4', name: 'Tesla', slug: 'tesla' },
  { id: '5', name: 'Hyundai', slug: 'hyundai' },
  { id: '6', name: 'Audi', slug: 'audi' },
  { id: '7', name: 'Porsche', slug: 'porsche' },
];

export const MOCK_CARS: Car[] = [
  {
    id: 'car-1',
    name: 'Hyundai Verna',
    brand: 'Hyundai',
    category: 'Sedan',
    rating: 4.9,
    reviewCount: 142,
    pricePerHour: 25.0,
    pricePerDay: 180.0,
    image:
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1000&q=80',
    specs: {
      transmission: 'Manual',
      fuelType: 'Petrol',
      seats: 5,
    },
    distance: '1.2 km away',
    instantUnlock: true,
    isPopular: true,
    isFavorite: false,
  },
  {
    id: 'car-2',
    name: 'Tesla Model 3 Performance',
    brand: 'Tesla',
    category: 'Electric',
    rating: 4.8,
    reviewCount: 210,
    pricePerHour: 38.0,
    pricePerDay: 260.0,
    image:
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1000&q=80',
    specs: {
      transmission: 'Automatic',
      fuelType: 'Electric',
      seats: 5,
    },
    distance: '0.8 km away',
    instantUnlock: true,
    isPopular: true,
    isFavorite: true,
  },
  {
    id: 'car-3',
    name: 'Mercedes-Benz C-Class',
    brand: 'Mercedes',
    category: 'Luxury',
    rating: 4.9,
    reviewCount: 184,
    pricePerHour: 45.0,
    pricePerDay: 320.0,
    image:
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1000&q=80',
    specs: {
      transmission: 'Automatic',
      fuelType: 'Petrol',
      seats: 5,
    },
    distance: '2.5 km away',
    instantUnlock: true,
    isPopular: true,
    isFavorite: false,
  },
  {
    id: 'car-4',
    name: 'BMW M4 Competition',
    brand: 'BMW',
    category: 'Sports',
    rating: 5.0,
    reviewCount: 96,
    pricePerHour: 60.0,
    pricePerDay: 420.0,
    image:
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1000&q=80',
    specs: {
      transmission: 'Automatic',
      fuelType: 'Petrol',
      seats: 4,
    },
    distance: '3.1 km away',
    instantUnlock: false,
    isPopular: true,
    isFavorite: false,
  },
  {
    id: 'car-5',
    name: 'Audi RS6 Avant Quattro',
    brand: 'Audi',
    category: 'Luxury',
    rating: 4.9,
    reviewCount: 77,
    pricePerHour: 55.0,
    pricePerDay: 390.0,
    image:
      'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1000&q=80',
    specs: {
      transmission: 'Automatic',
      fuelType: 'Petrol',
      seats: 5,
    },
    distance: '1.9 km away',
    instantUnlock: true,
    isPopular: true,
    isFavorite: false,
  },
  {
    id: 'car-6',
    name: 'Porsche Macan GTS',
    brand: 'Porsche',
    category: 'SUV',
    rating: 4.9,
    reviewCount: 115,
    pricePerHour: 58.0,
    pricePerDay: 410.0,
    image:
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80',
    specs: {
      transmission: 'Automatic',
      fuelType: 'Petrol',
      seats: 5,
    },
    distance: '4.0 km away',
    instantUnlock: true,
    isPopular: true,
    isFavorite: false,
  },
];
