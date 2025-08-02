export interface HolidayPackage {
  id: string;
  destinationId: string;
  title: string;
  price: number;
  originalPrice?: number;
  nights: number;
  image: string;
  shortDescription: string;
  inclusions: {
    flight: boolean;
    hotel: boolean;
    transfer: boolean;
    sightseeing: boolean;
    meals?: string;
  };
  highlights: string[];
  hotels: Array<{
    name: string;
    rating: number;
    image: string;
    location: string;
  }>;
  itinerary: Array<{
    day: number;
    title: string;
    description: string;
    activities: string[];
  }>;
  exclusions: string[];
}

export const holidayPackages: HolidayPackage[] = [
  // Paris Packages
  {
    id: 'paris-romantic-getaway',
    destinationId: 'paris',
    title: 'Romantic Paris Getaway',
    price: 89999,
    originalPrice: 109999,
    nights: 5,
    image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=600&fit=crop',
    shortDescription: 'Experience the romance of Paris with Eiffel Tower views and Seine cruises',
    inclusions: {
      flight: true,
      hotel: true,
      transfer: true,
      sightseeing: true,
      meals: 'Breakfast'
    },
    highlights: ['Eiffel Tower Visit', 'Seine River Cruise', 'Louvre Museum', 'Montmartre Tour'],
    hotels: [
      {
        name: 'Hotel des Grands Boulevards',
        rating: 4,
        image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=300&fit=crop',
        location: 'Central Paris'
      }
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Paris',
        description: 'Welcome to the City of Light! Airport transfer to hotel and evening at leisure.',
        activities: ['Airport Transfer', 'Hotel Check-in', 'Welcome Dinner']
      },
      {
        day: 2,
        title: 'Paris City Tour',
        description: 'Explore iconic landmarks including Eiffel Tower and Notre-Dame.',
        activities: ['Eiffel Tower', 'Notre-Dame Cathedral', 'Seine River Cruise']
      },
      {
        day: 3,
        title: 'Art and Culture',
        description: 'Visit world-famous museums and galleries.',
        activities: ['Louvre Museum', 'Montmartre District', 'Sacré-Cœur Basilica']
      },
      {
        day: 4,
        title: 'Day at Versailles',
        description: 'Full day excursion to the magnificent Palace of Versailles.',
        activities: ['Palace of Versailles', 'Gardens Tour', 'Marie Antoinette Estate']
      },
      {
        day: 5,
        title: 'Departure',
        description: 'Last-minute shopping and departure transfer.',
        activities: ['Shopping at Champs-Élysées', 'Airport Transfer']
      }
    ],
    exclusions: ['Lunch & Dinner', 'Personal Expenses', 'Visa Fees', 'Travel Insurance']
  },
  {
    id: 'paris-family-fun',
    destinationId: 'paris',
    title: 'Paris Family Adventure',
    price: 119999,
    nights: 6,
    image: 'https://images.unsplash.com/photo-1549144511-f099e773c147?w=800&h=600&fit=crop',
    shortDescription: 'Perfect family vacation with Disneyland Paris and kid-friendly activities',
    inclusions: {
      flight: true,
      hotel: true,
      transfer: true,
      sightseeing: true,
      meals: 'Breakfast & Dinner'
    },
    highlights: ['Disneyland Paris', 'Family-friendly Hotels', 'Kid-friendly Tours', 'Seine Cruise'],
    hotels: [
      {
        name: 'Disney Newport Bay Club',
        rating: 4,
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop',
        location: 'Disneyland Paris'
      }
    ],
    itinerary: [
      {
        day: 1,
        title: 'Welcome to Paris',
        description: 'Arrive and settle into family-friendly accommodation',
        activities: ['Airport Transfer', 'Hotel Check-in', 'Welcome Orientation']
      },
      {
        day: 2,
        title: 'Disneyland Adventure',
        description: 'Full day at Disneyland Paris with all attractions',
        activities: ['Disneyland Park', 'Character Meet & Greet', 'Parade Shows']
      },
      {
        day: 3,
        title: 'Walt Disney Studios',
        description: 'Explore movie magic at Disney Studios Park',
        activities: ['Walt Disney Studios Park', 'Marvel Campus', 'Ratatouille Ride']
      },
      {
        day: 4,
        title: 'Paris City Exploration',
        description: 'Family-friendly city tour with interactive experiences',
        activities: ['Eiffel Tower', 'River Seine Cruise', 'Trocadéro Gardens']
      },
      {
        day: 5,
        title: 'Science and Discovery',
        description: 'Educational fun at science museums and aquarium',
        activities: ['Cité des Sciences', 'Aquarium de Paris', 'Park Visit']
      },
      {
        day: 6,
        title: 'Departure Day',
        description: 'Final shopping and departure preparations',
        activities: ['Souvenir Shopping', 'Airport Transfer']
      }
    ],
    exclusions: ['Lunch', 'Personal Expenses', 'Visa Fees', 'Travel Insurance']
  },

  // Tokyo Packages  
  {
    id: 'tokyo-cultural-discovery',
    destinationId: 'tokyo',
    title: 'Tokyo Cultural Discovery',
    price: 134999,
    nights: 7,
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop',
    shortDescription: 'Immerse in Japanese culture with temples, gardens, and traditional experiences',
    inclusions: {
      flight: true,
      hotel: true,
      transfer: true,
      sightseeing: true,
      meals: 'Breakfast'
    },
    highlights: ['Traditional Tea Ceremony', 'Sumo Wrestling Experience', 'Mount Fuji Day Trip', 'Authentic Ryokan Stay'],
    hotels: [
      {
        name: 'The Prince Gallery Tokyo Kioicho',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=400&h=300&fit=crop',
        location: 'Central Tokyo'
      }
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Tokyo',
        description: 'Welcome to Japan! Traditional welcome ceremony at hotel',
        activities: ['Airport Transfer', 'Hotel Check-in', 'Welcome Tea Ceremony']
      },
      {
        day: 2,
        title: 'Traditional Tokyo',
        description: 'Explore ancient temples and traditional districts',
        activities: ['Sensoji Temple', 'Asakusa District', 'Traditional Lunch']
      },
      {
        day: 3,
        title: 'Modern Tokyo',
        description: 'Experience the futuristic side of Tokyo',
        activities: ['Tokyo Skytree', 'Shibuya Crossing', 'Harajuku Fashion District']
      },
      {
        day: 4,
        title: 'Mount Fuji Excursion',
        description: 'Day trip to iconic Mount Fuji and surrounding lakes',
        activities: ['Mount Fuji 5th Station', 'Lake Kawaguchi', 'Hakone Hot Springs']
      },
      {
        day: 5,
        title: 'Cultural Immersion',
        description: 'Deep dive into Japanese arts and culture',
        activities: ['Meiji Shrine', 'Imperial Palace Gardens', 'Sumo Training Visit']
      },
      {
        day: 6,
        title: 'Tokyo Bay & Gardens',
        description: 'Explore Tokyo\'s modern waterfront and beautiful gardens',
        activities: ['Odaiba Island', 'teamLab Borderless', 'Tokyo Station']
      },
      {
        day: 7,
        title: 'Farewell Japan',
        description: 'Last minute shopping and departure',
        activities: ['Tsukiji Fish Market', 'Ginza Shopping', 'Airport Transfer']
      }
    ],
    exclusions: ['Lunch & Dinner (except mentioned)', 'Personal Expenses', 'Visa Fees', 'Travel Insurance']
  },

  // Bali Packages
  {
    id: 'bali-tropical-paradise',
    destinationId: 'bali',
    title: 'Bali Tropical Paradise',
    price: 65999,
    nights: 6,
    image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&h=600&fit=crop',
    shortDescription: 'Relax in tropical luxury with beaches, spas, and cultural experiences',
    inclusions: {
      flight: true,
      hotel: true,
      transfer: true,
      sightseeing: true,
      meals: 'Breakfast & Dinner'
    },
    highlights: ['Luxury Beach Resort', 'Traditional Spa Treatments', 'Rice Terrace Tours', 'Sunset Beach Dinners'],
    hotels: [
      {
        name: 'The Mulia Resort',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop',
        location: 'Nusa Dua Beach'
      }
    ],
    itinerary: [
      {
        day: 1,
        title: 'Welcome to Bali',
        description: 'Arrive in paradise and settle into luxury resort',
        activities: ['Airport Transfer', 'Resort Check-in', 'Welcome Balinese Massage']
      },
      {
        day: 2,
        title: 'Ubud Cultural Tour',
        description: 'Explore the cultural heart of Bali',
        activities: ['Ubud Rice Terraces', 'Monkey Forest Sanctuary', 'Traditional Art Villages']
      },
      {
        day: 3,
        title: 'Temple & Volcano Tour',
        description: 'Discover sacred temples and volcanic landscapes',
        activities: ['Tanah Lot Temple', 'Mount Batur Volcano', 'Hot Springs Relaxation']
      },
      {
        day: 4,
        title: 'Beach & Water Sports',
        description: 'Enjoy pristine beaches and marine activities',
        activities: ['Snorkeling Trip', 'Beach Relaxation', 'Water Sports']
      },
      {
        day: 5,
        title: 'Spa & Wellness Day',
        description: 'Rejuvenate with traditional Balinese wellness',
        activities: ['Full Day Spa Treatment', 'Yoga Session', 'Meditation Class']
      },
      {
        day: 6,
        title: 'Farewell Bali',
        description: 'Final beach moments and departure',
        activities: ['Sunset Beach Walk', 'Souvenir Shopping', 'Airport Transfer']
      }
    ],
    exclusions: ['Lunch', 'Personal Expenses', 'Visa on Arrival', 'Travel Insurance']
  },

  // Goa Packages (Domestic)
  {
    id: 'goa-beach-bliss',
    destinationId: 'goa',
    title: 'Goa Beach Bliss',
    price: 25999,
    nights: 4,
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=600&fit=crop',
    shortDescription: 'Perfect beach holiday with sun, sand, and Portuguese heritage',
    inclusions: {
      flight: true,
      hotel: true,
      transfer: true,
      sightseeing: true,
      meals: 'Breakfast'
    },
    highlights: ['Beach Resort Stay', 'Portuguese Heritage Tour', 'Water Sports', 'Sunset Cruises'],
    hotels: [
      {
        name: 'Taj Exotica Resort & Spa',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop',
        location: 'Benaulim Beach'
      }
    ],
    itinerary: [
      {
        day: 1,
        title: 'Welcome to Goa',
        description: 'Arrive and check into beachfront resort',
        activities: ['Airport Transfer', 'Resort Check-in', 'Beach Walk']
      },
      {
        day: 2,
        title: 'North Goa Exploration',
        description: 'Discover the vibrant beaches of North Goa',
        activities: ['Baga Beach', 'Calangute Beach', 'Anjuna Flea Market']
      },
      {
        day: 3,
        title: 'Portuguese Heritage',
        description: 'Explore Goa\'s rich Portuguese history',
        activities: ['Old Goa Churches', 'Basilica of Bom Jesus', 'Se Cathedral']
      },
      {
        day: 4,
        title: 'Beach Activities',
        description: 'Water sports and relaxation',
        activities: ['Water Sports', 'Sunset Cruise', 'Beach Dinner']
      }
    ],
    exclusions: ['Lunch & Dinner', 'Personal Expenses', 'Alcoholic Beverages', 'Travel Insurance']
  },

  // Additional packages for other destinations...
  {
    id: 'kerala-backwaters',
    destinationId: 'kerala',
    title: 'Kerala Backwater Cruise',
    price: 42999,
    nights: 6,
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&h=600&fit=crop',
    shortDescription: 'Serene houseboat journey through Kerala\'s famous backwaters',
    inclusions: {
      flight: true,
      hotel: true,
      transfer: true,
      sightseeing: true,
      meals: 'All Meals'
    },
    highlights: ['Luxury Houseboat Stay', 'Ayurvedic Spa', 'Spice Plantation Tour', 'Kathakali Dance Show'],
    hotels: [
      {
        name: 'Kumarakom Lake Resort',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
        location: 'Kumarakom'
      }
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Kochi',
        description: 'Welcome to God\'s Own Country',
        activities: ['Airport Transfer', 'Hotel Check-in', 'Kochi City Tour']
      },
      {
        day: 2,
        title: 'Munnar Hill Station',
        description: 'Journey to the tea gardens of Munnar',
        activities: ['Drive to Munnar', 'Tea Plantation Visit', 'Eravikulam National Park']
      },
      {
        day: 3,
        title: 'Thekkady Wildlife',
        description: 'Wildlife sanctuary and spice plantations',
        activities: ['Periyar Wildlife Sanctuary', 'Spice Plantation Tour', 'Boat Safari']
      },
      {
        day: 4,
        title: 'Alleppey Backwaters',
        description: 'Houseboat cruise through backwaters',
        activities: ['Houseboat Check-in', 'Backwater Cruise', 'Village Visits']
      },
      {
        day: 5,
        title: 'Kovalam Beach',
        description: 'Relax at Kerala\'s famous beach resort',
        activities: ['Beach Resort', 'Ayurvedic Massage', 'Sunset View']
      },
      {
        day: 6,
        title: 'Departure',
        description: 'Final shopping and departure',
        activities: ['Trivandrum City Tour', 'Shopping', 'Airport Transfer']
      }
    ],
    exclusions: ['Personal Expenses', 'Alcoholic Beverages', 'Travel Insurance', 'Camera Fees']
  }
];

// Generate more packages for each destination
export const getPackagesByDestination = (destinationId: string) => {
  return holidayPackages.filter(pkg => pkg.destinationId === destinationId);
};