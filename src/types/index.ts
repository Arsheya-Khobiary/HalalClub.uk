import { Timestamp, GeoPoint } from 'firebase/firestore';

export interface Restaurant {
  id: string;
  name: string;
  cuisines: string[];
  address: string;
  postcode: string;
  location: GeoPoint;
  phone: string;
  website?: string;
  halalCertified: boolean;
  bestItems: BestItem[];
  menu: MenuSection[];
  socials: {
    instagram?: string;
    tiktok?: string;
    youtube?: string;
    facebook?: string;
  };
  gallery: string[];
  videos: string[];
  ratingAvg: number;
  ratingCount: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  ownerUid: string;
}

export interface BestItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description?: string;
}

export interface MenuSection {
  section: string;
  items: MenuItem[];
}

export interface MenuItem {
  name: string;
  price: number;
  description?: string;
}

export interface Submission extends Omit<Restaurant, 'id' | 'ratingAvg' | 'ratingCount'> {
  id: string;
  status: 'pending' | 'approved' | 'rejected';
  paid: boolean;
  whyUs?: string;
  email: string;
  hygieneRating: string;
  openingHours?: string;
  certificates: {
    halal: string | null;
    hygiene: string | null;
    menuPdf: string | null;
  };
  uploadedFiles: {
    gallery: string[];
    bestItems: string[];
  };
}

export interface Review {
  id: string;
  uid: string;
  displayName: string;
  rating: number;
  text: string;
  photos: string[];
  createdAt: Timestamp;
}

export interface User {
  uid: string;
  email: string;
  displayName: string;
  role?: 'admin';
  createdAt: Timestamp;
}

export interface Favorite {
  restaurantId: string;
  createdAt: Timestamp;
}

export interface SearchFilters {
  cuisines: string[];
  rating: number;
  priceRange: [number, number];
  distance: number;
}

export interface MapBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

export interface Location {
  lat: number;
  lng: number;
} 