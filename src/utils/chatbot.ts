import { UserPreferences, Venue } from '../types';
import { venues } from '../data/venues';

export const questions = [
  {
    id: 'atmosphere',
    question: 'Suasana seperti apa yang kamu cari?',
    options: ['Tenang & Cozy', 'Ramai & Energik', 'Modern & Instagramable', 'Casual & Santai', 'Premium & Elegan']
  },
  {
    id: 'foodType',
    question: 'Jenis makanan apa yang kamu mau?',
    options: ['Kopi & Snacks', 'Indonesian Food', 'Western Food', 'Chinese Food', 'Semua Boleh']
  },
  {
    id: 'groupSize',
    question: 'Mau nongkrong berapa orang?',
    options: ['Sendiri', '2-3 Orang', '4-6 Orang', 'Lebih dari 6 Orang']
  },
  {
    id: 'occasion',
    question: 'Acaranya untuk apa nih?',
    options: ['Kerja/Belajar', 'Ngobrol Santai', 'Meeting', 'Kencan', 'Kumpul Keluarga', 'Hangout Teman']
  },
  {
    id: 'budget',
    question: 'Budget per orang berapa?',
    options: ['< Rp 30.000', 'Rp 30.000 - 60.000', 'Rp 60.000 - 100.000', '> Rp 100.000', 'Bebas']
  },
  {
    id: 'facilities',
    question: 'Fasilitas apa yang penting buat kamu? (bisa pilih lebih dari 1)',
    options: ['WiFi', 'Colokan', 'AC', 'Outdoor Seating', 'Parkir', 'Private Room']
  }
];

export function getRecommendations(preferences: UserPreferences): Venue[] {
  let scored = venues.map(venue => {
    let score = 0;

    // Atmosphere matching
    if (preferences.atmosphere) {
      const atmMap: { [key: string]: string[] } = {
        'Tenang & Cozy': ['Tenang', 'Cozy', 'Profesional'],
        'Ramai & Energik': ['Ramai', 'Casual'],
        'Modern & Instagramable': ['Modern', 'Instagramable', 'Minimalis'],
        'Casual & Santai': ['Casual', 'Authentic'],
        'Premium & Elegan': ['Premium', 'Traditional']
      };
      const targetAtm = atmMap[preferences.atmosphere] || [];
      if (venue.atmosphere.some(a => targetAtm.includes(a))) score += 3;
    }

    // Food type matching
    if (preferences.foodType && preferences.foodType !== 'Semua Boleh') {
      const foodMap: { [key: string]: string[] } = {
        'Kopi & Snacks': ['Kopi', 'Snacks', 'Dessert', 'Pastry'],
        'Indonesian Food': ['Indonesian', 'Nasi Goreng', 'Mie', 'Sate', 'Ayam Geprek'],
        'Western Food': ['Western', 'Pasta', 'Pizza', 'Sandwich'],
        'Chinese Food': ['Chinese', 'Bakmi', 'Dimsum']
      };
      const targetFood = foodMap[preferences.foodType] || [];
      if (venue.cuisine.some(c => targetFood.includes(c))) score += 3;
    }

    // Budget matching
    if (preferences.budget && preferences.budget !== 'Bebas') {
      const budgetMatch = venue.priceRange.includes(preferences.budget.replace('< ', '').replace('> ', ''));
      if (budgetMatch) score += 2;
    }

    // Facilities matching
    if (preferences.facilities && preferences.facilities.length > 0) {
      const matchedFacilities = preferences.facilities.filter(f => venue.facilities.includes(f));
      score += matchedFacilities.length;
    }

    // Occasion matching
    if (preferences.occasion) {
      const occasionMap: { [key: string]: string[] } = {
        'Kerja/Belajar': ['WiFi', 'Colokan', 'AC'],
        'Meeting': ['WiFi', 'AC', 'Private Room', 'Meeting Room'],
        'Kencan': ['Cozy', 'Romantic', 'Instagramable'],
        'Kumpul Keluarga': ['Family Friendly', 'AC', 'Parkir'],
        'Hangout Teman': ['Casual', 'Ramai']
      };
      const targetFacilities = occasionMap[preferences.occasion] || [];
      const matches = targetFacilities.filter(f => 
        venue.facilities.includes(f) || venue.atmosphere.includes(f)
      );
      score += matches.length;
    }

    return { venue, score };
  });

  // Sort by score and return top 3
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 3).map(s => s.venue);
}
