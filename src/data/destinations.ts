export interface Destination {
  id: string;
  name: string;
  country: string;
  type: 'international' | 'domestic';
  image: string;
  description: string;
  shortDescription: string;
  gallery: string[];
  bestTime: string;
  duration: string;
  highlights: string[];
}

export const destinations: Destination[] = [
  // International Destinations
  {
    id: 'paris',
    name: 'Paris',
    country: 'France',
    type: 'international',
    image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=600&fit=crop',
    shortDescription: 'City of Light and Romance',
    description: 'Paris, the capital of France, is one of the most visited cities in the world. Known for its art, fashion, gastronomy, and culture, Paris is home to iconic landmarks like the Eiffel Tower, Louvre Museum, and Notre-Dame Cathedral.',
    gallery: [
      'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1549144511-f099e773c147?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1431274172761-fca41d930114?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&h=600&fit=crop'
    ],
    bestTime: 'April to June & September to November',
    duration: '5-7 days',
    highlights: ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame Cathedral', 'Seine River Cruise', 'Montmartre']
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    type: 'international',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop',
    shortDescription: 'Modern Metropolis meets Ancient Tradition',
    description: 'Tokyo is a bustling metropolis that seamlessly blends modern technology with traditional culture. From towering skyscrapers to serene temples, Tokyo offers an unforgettable experience.',
    gallery: [
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=800&h=600&fit=crop'
    ],
    bestTime: 'March to May & September to November',
    duration: '6-8 days',
    highlights: ['Tokyo Skytree', 'Sensoji Temple', 'Shibuya Crossing', 'Tsukiji Fish Market', 'Mount Fuji Day Trip']
  },
  {
    id: 'bali',
    name: 'Bali',
    country: 'Indonesia',
    type: 'international',
    image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&h=600&fit=crop',
    shortDescription: 'Tropical Paradise of Gods',
    description: 'Bali is a tropical paradise known for its beautiful beaches, rice terraces, volcanic mountains, and rich Hindu culture. It offers the perfect blend of relaxation and adventure.',
    gallery: [
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1544991875-5dc1b05f607d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800&h=600&fit=crop'
    ],
    bestTime: 'April to October',
    duration: '7-10 days',
    highlights: ['Ubud Rice Terraces', 'Tanah Lot Temple', 'Seminyak Beach', 'Mount Batur Sunrise', 'Uluwatu Cliff Temple']
  },
  {
    id: 'london',
    name: 'London',
    country: 'United Kingdom',
    type: 'international',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop',
    shortDescription: 'Historic Capital with Royal Heritage',
    description: 'London is a diverse and historic city with world-class museums, royal palaces, and iconic landmarks. Experience the perfect blend of tradition and modernity.',
    gallery: [
      'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1520986606214-8b456906c813?w=800&h=600&fit=crop'
    ],
    bestTime: 'May to September',
    duration: '5-7 days',
    highlights: ['Big Ben', 'Tower Bridge', 'Buckingham Palace', 'British Museum', 'London Eye']
  },
  {
    id: 'dubai',
    name: 'Dubai',
    country: 'UAE',
    type: 'international',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop',
    shortDescription: 'Luxury and Innovation Hub',
    description: 'Dubai is a modern oasis of luxury shopping, ultramodern architecture, and vibrant nightlife. From towering skyscrapers to golden deserts, Dubai offers unique experiences.',
    gallery: [
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1548048026-5a1a941d93d3?w=800&h=600&fit=crop'
    ],
    bestTime: 'November to March',
    duration: '4-6 days',
    highlights: ['Burj Khalifa', 'Dubai Mall', 'Palm Jumeirah', 'Desert Safari', 'Dubai Fountain']
  },
  {
    id: 'singapore',
    name: 'Singapore',
    country: 'Singapore',
    type: 'international',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&h=600&fit=crop',
    shortDescription: 'Garden City of Asia',
    description: 'Singapore is a modern city-state known for its efficiency, cleanliness, and diverse culture. Experience world-class attractions, gardens, and culinary delights.',
    gallery: [
      'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1486299267070-83823f5448dd?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1508964942454-1a56651d54ac?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=800&h=600&fit=crop'
    ],
    bestTime: 'February to April',
    duration: '4-5 days',
    highlights: ['Gardens by the Bay', 'Marina Bay Sands', 'Universal Studios', 'Sentosa Island', 'Singapore Zoo']
  },
  {
    id: 'thailand',
    name: 'Thailand',
    country: 'Thailand',
    type: 'international',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    shortDescription: 'Land of Smiles',
    description: 'Thailand offers tropical beaches, magnificent temples, vibrant street life, and delicious cuisine. From bustling Bangkok to serene islands, Thailand has something for everyone.',
    gallery: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1552550049-db097c9480d1?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop'
    ],
    bestTime: 'November to April',
    duration: '7-10 days',
    highlights: ['Grand Palace Bangkok', 'Phi Phi Islands', 'Chiang Mai Temples', 'Floating Markets', 'Thai Beaches']
  },
  {
    id: 'switzerland',
    name: 'Switzerland',
    country: 'Switzerland',
    type: 'international',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop',
    shortDescription: 'Alpine Paradise',
    description: 'Switzerland is famous for its stunning Alps, pristine lakes, charming villages, and precision. Experience breathtaking mountain views and outdoor adventures.',
    gallery: [
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1530841344095-a234a5d28772?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1566588114451-dc6bd6c87c50?w=800&h=600&fit=crop'
    ],
    bestTime: 'June to August & December to March',
    duration: '6-8 days',
    highlights: ['Matterhorn', 'Jungfraujoch', 'Lake Geneva', 'Rhine Falls', 'Swiss Alps Railway']
  },
  {
    id: 'italy',
    name: 'Italy',
    country: 'Italy',
    type: 'international',
    image: 'https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?w=800&h=600&fit=crop',
    shortDescription: 'Land of Art and Romance',
    description: 'Italy is a treasure trove of art, history, culture, and cuisine. From ancient Rome to Renaissance Florence and romantic Venice, Italy captivates every traveler.',
    gallery: [
      'https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1552832230-c0197040ba5b?w=800&h=600&fit=crop'
    ],
    bestTime: 'April to June & September to October',
    duration: '8-12 days',
    highlights: ['Colosseum Rome', 'Venice Canals', 'Florence Art', 'Tuscany Countryside', 'Amalfi Coast']
  },
  {
    id: 'newyork',
    name: 'New York',
    country: 'USA',
    type: 'international',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop',
    shortDescription: 'The City That Never Sleeps',
    description: 'New York City is a global hub of culture, fashion, art, and finance. Experience iconic landmarks, world-class museums, Broadway shows, and diverse neighborhoods.',
    gallery: [
      'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1518581751068-c7d65b08beab?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1522083165195-3424ed129620?w=800&h=600&fit=crop'
    ],
    bestTime: 'April to June & September to November',
    duration: '5-7 days',
    highlights: ['Statue of Liberty', 'Times Square', 'Central Park', 'Empire State Building', 'Brooklyn Bridge']
  },

  // Domestic Destinations (India)
  {
    id: 'goa',
    name: 'Goa',
    country: 'India',
    type: 'domestic',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=600&fit=crop',
    shortDescription: 'Beach Paradise of India',
    description: 'Goa is famous for its pristine beaches, Portuguese heritage, vibrant nightlife, and laid-back atmosphere. Perfect destination for beach lovers and party enthusiasts.',
    gallery: [
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1598124146163-d80a3ad4b0f1?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop'
    ],
    bestTime: 'November to February',
    duration: '4-6 days',
    highlights: ['Baga Beach', 'Basilica of Bom Jesus', 'Dudhsagar Falls', 'Anjuna Flea Market', 'Sunset at Arambol']
  },
  {
    id: 'kerala',
    name: 'Kerala',
    country: 'India',
    type: 'domestic',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&h=600&fit=crop',
    shortDescription: 'God\'s Own Country',
    description: 'Kerala is known for its backwaters, hill stations, spice plantations, and Ayurvedic treatments. Experience the natural beauty and cultural richness of South India.',
    gallery: [
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1626748723097-326b2bdbc2ba?w=800&h=600&fit=crop'
    ],
    bestTime: 'October to March',
    duration: '6-8 days',
    highlights: ['Alleppey Backwaters', 'Munnar Hill Station', 'Thekkady Wildlife', 'Kovalam Beach', 'Kochi Fort']
  },
  {
    id: 'rajasthan',
    name: 'Rajasthan',
    country: 'India',
    type: 'domestic',
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&h=600&fit=crop',
    shortDescription: 'Land of Kings',
    description: 'Rajasthan showcases India\'s royal heritage with magnificent palaces, desert landscapes, colorful culture, and traditional arts. Experience the grandeur of erstwhile maharajas.',
    gallery: [
      'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1618939291994-5fd57b8e5da8?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=800&h=600&fit=crop'
    ],
    bestTime: 'October to March',
    duration: '8-12 days',
    highlights: ['Jaipur City Palace', 'Udaipur Lake Palace', 'Jaisalmer Desert', 'Jodhpur Blue City', 'Pushkar Camel Fair']
  },
  {
    id: 'kashmir',
    name: 'Kashmir',
    country: 'India',
    type: 'domestic',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    shortDescription: 'Paradise on Earth',
    description: 'Kashmir is blessed with stunning landscapes, snow-capped mountains, serene lakes, and beautiful gardens. Experience the natural beauty that inspired poets and travelers.',
    gallery: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop'
    ],
    bestTime: 'March to August',
    duration: '6-8 days',
    highlights: ['Dal Lake Srinagar', 'Gulmarg Skiing', 'Pahalgam Valley', 'Sonamarg Meadows', 'Mughal Gardens']
  },
  {
    id: 'himachal',
    name: 'Himachal Pradesh',
    country: 'India',
    type: 'domestic',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop',
    shortDescription: 'Land of Gods',
    description: 'Himachal Pradesh offers spectacular mountain landscapes, hill stations, adventure sports, and spiritual experiences. Perfect for nature lovers and adventure seekers.',
    gallery: [
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1548088086-87f4fbc8b50e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&h=600&fit=crop'
    ],
    bestTime: 'March to June & September to December',
    duration: '6-8 days',
    highlights: ['Shimla Mall Road', 'Manali Adventure Sports', 'Dharamshala Dalai Lama', 'Spiti Valley', 'Kullu Valley']
  },
  {
    id: 'uttarakhand',
    name: 'Uttarakhand',
    country: 'India',
    type: 'domestic',
    image: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&h=600&fit=crop',
    shortDescription: 'Devbhoomi - Land of Gods',
    description: 'Uttarakhand is known for its spiritual significance, pristine nature, adventure activities, and Himalayan beauty. Home to sacred temples and beautiful hill stations.',
    gallery: [
      'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop'
    ],
    bestTime: 'March to June & September to November',
    duration: '6-8 days',
    highlights: ['Haridwar Ganga Aarti', 'Rishikesh Yoga Capital', 'Nainital Lake', 'Jim Corbett Safari', 'Valley of Flowers']
  },
  {
    id: 'tamilnadu',
    name: 'Tamil Nadu',
    country: 'India',
    type: 'domestic',
    image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&h=600&fit=crop',
    shortDescription: 'Temple Land of South India',
    description: 'Tamil Nadu is rich in temple architecture, classical dance, music, and cultural heritage. Experience ancient temples, hill stations, and coastal beauty.',
    gallery: [
      'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1618498082410-b4aa22193b38?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1626748723097-326b2bdbc2ba?w=800&h=600&fit=crop'
    ],
    bestTime: 'November to February',
    duration: '7-10 days',
    highlights: ['Meenakshi Temple Madurai', 'Mahabalipuram Shore Temple', 'Ooty Hill Station', 'Kanyakumari Sunset', 'Thanjavur Brihadeeswarar']
  },
  {
    id: 'karnataka',
    name: 'Karnataka',
    country: 'India',
    type: 'domestic',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
    shortDescription: 'Garden State of India',
    description: 'Karnataka offers diverse experiences from IT capital Bangalore to ancient ruins of Hampi, coffee plantations of Coorg, and beautiful beaches of Gokarna.',
    gallery: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1618498082410-b4aa22193b38?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop'
    ],
    bestTime: 'October to March',
    duration: '6-8 days',
    highlights: ['Mysore Palace', 'Hampi Ruins', 'Coorg Coffee Estates', 'Gokarna Beach', 'Bangalore Gardens']
  },
  {
    id: 'maharashtra',
    name: 'Maharashtra',
    country: 'India',
    type: 'domestic',
    image: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=800&h=600&fit=crop',
    shortDescription: 'Heart of India',
    description: 'Maharashtra combines vibrant Mumbai, ancient caves of Ajanta-Ellora, hill stations, and rich Marathi culture. Experience Bollywood glamour and historical heritage.',
    gallery: [
      'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1618498082410-b4aa22193b38?w=800&h=600&fit=crop'
    ],
    bestTime: 'October to February',
    duration: '6-8 days',
    highlights: ['Gateway of India Mumbai', 'Ajanta Ellora Caves', 'Lonavala Hill Station', 'Shirdi Sai Baba', 'Mahabaleshwar']
  },
  {
    id: 'gujarat',
    name: 'Gujarat',
    country: 'India',
    type: 'domestic',
    image: 'https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=800&h=600&fit=crop',
    shortDescription: 'Jewel of Western India',
    description: 'Gujarat offers diverse attractions from the white desert of Kutch to the last habitat of Asiatic lions, vibrant culture, and the birthplace of Mahatma Gandhi.',
    gallery: [
      'https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1469041797191-50ace28483c3?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=800&h=600&fit=crop'
    ],
    bestTime: 'November to February',
    duration: '6-8 days',
    highlights: ['Rann of Kutch', 'Gir National Park Lions', 'Dwarka Temple', 'Somnath Temple', 'Ahmedabad Heritage']
  }
];