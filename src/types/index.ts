export interface UserPreferences {
  atmosphere?: string;
  foodType?: string;
  groupSize?: string;
  occasion?: string;
  budget?: string;
  facilities?: string[];
}

export interface Message {
  id: string;
  type: 'bot' | 'user';
  content: string;
  timestamp: Date;
  options?: string[];
  isRecommendation?: boolean;
  venue?: Venue;
}

export interface Venue {
  name: string;
  address: string;
  rating: number;
  priceRange: string;
  cuisine: string[];
  atmosphere: string[];
  facilities: string[];
  image: string;
  description: string;
  openingHours: string;
  googleMapsUrl: string;
}
