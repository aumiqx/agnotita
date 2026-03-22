export interface Room {
  name: string;
  description: string;
  price: number;
  currency: string;
  amenities: string[];
  image: string;
  capacity: string;
  size: string;
}

export interface Review {
  name: string;
  location: string;
  rating: number;
  text: string;
  date: string;
}

export interface Restaurant {
  name: string;
  cuisine: string;
  description: string;
  image: string;
  signatureDishes: string[];
  hours: string;
}

export interface SpaService {
  name: string;
  duration: string;
  price: number;
  description: string;
}

export interface NearbyAttraction {
  name: string;
  distance: string;
  description: string;
  category: string;
}

export interface Season {
  name: string;
  months: string;
  temperature: string;
  description: string;
  highlights: string[];
}

export interface EventSpace {
  name: string;
  capacity: string;
  description: string;
  amenities: string[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Policy {
  title: string;
  details: string;
}

export interface DayItinerary {
  time: string;
  period: "morning" | "afternoon" | "evening";
  title: string;
  description: string;
}

export interface TransportOption {
  from: string;
  mode: string;
  duration: string;
  details: string;
}

export interface HotelData {
  name: string;
  tagline: string;
  city: string;
  state: string;
  stars: number;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  website: string;
  bookingUrl: string;
  mapEmbedUrl: string;
  heroImage: string;
  welcomeMessage: string;
  socialLinks: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
  experience: {
    title: string;
    description: string;
    icon: string;
  }[];
  gallery: string[];
  rooms: Room[];
  dining: Restaurant;
  reviews: Review[];
  nearbyAttractions: NearbyAttraction[];
  spa: {
    available: boolean;
    description: string;
    image: string;
    services: SpaService[];
  };
  dayItinerary: DayItinerary[];
  seasons: Season[];
  gettingHere: TransportOption[];
  amenities: string[];
  policies: Policy[];
  faqs: FAQ[];
  events: {
    available: boolean;
    description: string;
    image: string;
    spaces: EventSpace[];
  };
  testimonialHighlight: Review;
  agnotitaMessage: string;
}

export const sampleData: HotelData = {
  name: "The Ganges Retreat",
  tagline: "Where the river whispers and the mountains listen",
  city: "Rishikesh",
  state: "Uttarakhand",
  stars: 4,
  address: "Tapovan Road, Near Laxman Jhula, Rishikesh, Uttarakhand 249192",
  phone: "+91 135 244 0000",
  whatsapp: "+911352440000",
  email: "reservations@thegangesretreat.com",
  website: "https://thegangesretreat.com",
  bookingUrl: "https://thegangesretreat.com/book",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.789!2d78.3157!3d30.1283!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDA3JzQxLjkiTiA3OMKwMTgnNTYuNSJF!5e0!3m2!1sen!2sin!4v1",
  heroImage: "https://picsum.photos/id/164/1920/1080",
  welcomeMessage:
    "Nestled on the serene banks of the Ganges, The Ganges Retreat is a sanctuary where timeless luxury meets the spiritual heart of Rishikesh. Here, every sunrise over the Himalayas is an invitation to pause, breathe, and rediscover yourself.",
  socialLinks: {
    instagram: "https://instagram.com/thegangesretreat",
    facebook: "https://facebook.com/thegangesretreat",
    twitter: "https://twitter.com/gangesretreat",
  },
  experience: [
    {
      title: "River-Facing Rooms",
      description:
        "Wake to the gentle sound of the Ganges flowing beneath your private balcony",
      icon: "river",
    },
    {
      title: "Ayurvedic Spa",
      description:
        "Ancient healing rituals performed by certified Ayurvedic practitioners",
      icon: "spa",
    },
    {
      title: "Rooftop Dining",
      description:
        "Savour Himalayan cuisine under the stars with panoramic mountain views",
      icon: "dining",
    },
    {
      title: "24/7 Concierge",
      description:
        "Your personal guide to Rishikesh, from temple visits to river rafting",
      icon: "concierge",
    },
  ],
  gallery: [
    "https://picsum.photos/id/164/1200/800",
    "https://picsum.photos/id/188/1200/800",
    "https://picsum.photos/id/326/1200/800",
    "https://picsum.photos/id/429/1200/800",
    "https://picsum.photos/id/365/1200/800",
    "https://picsum.photos/id/416/1200/800",
    "https://picsum.photos/id/501/1200/800",
    "https://picsum.photos/id/447/1200/800",
  ],
  rooms: [
    {
      name: "Himalayan View Suite",
      description:
        "A palatial suite with floor-to-ceiling windows framing the snow-capped Himalayas. Handcrafted teak furniture, a deep soaking tub, and a private meditation terrace create an atmosphere of refined tranquility.",
      price: 8000,
      currency: "INR",
      amenities: [
        "King bed",
        "Mountain view",
        "Private terrace",
        "Soaking tub",
        "Mini bar",
        "Room service",
      ],
      image: "https://picsum.photos/id/164/900/600",
      capacity: "2 Adults + 1 Child",
      size: "65 sqm",
    },
    {
      name: "Ganges Deluxe Room",
      description:
        "Perched above the sacred river, this spacious room features handwoven textiles, locally sourced stone floors, and a balcony where you can watch the evening Ganga Aarti from the comfort of your private space.",
      price: 5500,
      currency: "INR",
      amenities: [
        "Queen bed",
        "River view",
        "Private balcony",
        "Rainfall shower",
        "Writing desk",
        "Tea station",
      ],
      image: "https://picsum.photos/id/188/900/600",
      capacity: "2 Adults",
      size: "45 sqm",
    },
    {
      name: "Garden Cottage",
      description:
        "A standalone cottage surrounded by manicured gardens and ancient sal trees. Features a covered verandah, an outdoor rain shower, and interiors inspired by traditional Garhwali architecture.",
      price: 6500,
      currency: "INR",
      amenities: [
        "King bed",
        "Garden access",
        "Verandah",
        "Outdoor shower",
        "Fireplace",
        "Butler service",
      ],
      image: "https://picsum.photos/id/326/900/600",
      capacity: "2 Adults + 1 Child",
      size: "55 sqm",
    },
    {
      name: "Classic Comfort Room",
      description:
        "Thoughtfully appointed with warm wood accents and organic cotton linens. A peaceful retreat with all the essential luxuries for a restorative stay in the foothills.",
      price: 3500,
      currency: "INR",
      amenities: [
        "Double bed",
        "Garden view",
        "En-suite bathroom",
        "AC",
        "WiFi",
        "Tea station",
      ],
      image: "https://picsum.photos/id/429/900/600",
      capacity: "2 Adults",
      size: "32 sqm",
    },
  ],
  dining: {
    name: "Annapurna",
    cuisine: "Himalayan & Pan-Indian",
    description:
      "Our rooftop restaurant Annapurna celebrates the culinary heritage of the Himalayas. Chef Vikram sources ingredients from local organic farms and the hotel's own kitchen garden. Dine under a canopy of stars with the Ganges glinting below.",
    image: "https://picsum.photos/id/365/1200/800",
    signatureDishes: [
      "Pahadi Lamb Rogan Josh",
      "Truffle Mushroom Risotto with Himalayan Herbs",
      "Char-grilled River Trout with Lemon Butter",
      "Saffron Kheer with Pistachio Praline",
    ],
    hours: "7:00 AM - 10:30 PM",
  },
  reviews: [
    {
      name: "Priya Mehta",
      location: "Mumbai",
      rating: 5,
      text: "An extraordinary retreat. The view from our suite was breathtaking, and the spa treatments were deeply rejuvenating. The staff anticipated our every need before we even voiced it.",
      date: "2025-11-15",
    },
    {
      name: "James & Eleanor White",
      location: "London, UK",
      rating: 5,
      text: "We have stayed at luxury hotels across the world, and The Ganges Retreat stands among the finest. The combination of spiritual atmosphere and impeccable service is truly unique.",
      date: "2025-10-22",
    },
    {
      name: "Arjun Kapoor",
      location: "Delhi",
      rating: 4,
      text: "Perfect for a weekend escape from the city. The rooftop dining experience alone is worth the trip. The Pahadi Lamb was exceptional. Will return.",
      date: "2025-09-08",
    },
    {
      name: "Sarah Chen",
      location: "Singapore",
      rating: 5,
      text: "The yoga sessions at sunrise, overlooking the Ganges, were life-changing. The hotel manages to be luxurious without losing the authentic spiritual essence of Rishikesh.",
      date: "2025-08-30",
    },
    {
      name: "Rohan & Meera Sharma",
      location: "Bangalore",
      rating: 5,
      text: "We celebrated our anniversary here and it exceeded every expectation. The candlelit dinner on the terrace, the river sounds, the mountain air \u2014 pure magic.",
      date: "2025-07-14",
    },
    {
      name: "Michael Torres",
      location: "California, USA",
      rating: 4,
      text: "A beautiful property with genuine warmth. The Ayurvedic spa is world-class. Only wish the WiFi was stronger in the garden cottages, but honestly, you don't need it here.",
      date: "2025-06-20",
    },
    {
      name: "Anita Desai",
      location: "Jaipur",
      rating: 5,
      text: "The attention to detail is remarkable. From the handpicked flowers in the room to the perfectly brewed chai on the balcony every morning. A hotel that truly understands hospitality.",
      date: "2025-05-11",
    },
    {
      name: "David Okonkwo",
      location: "Lagos, Nigeria",
      rating: 5,
      text: "India surprised me, and this hotel was the crown jewel of my trip. The staff went above and beyond, arranging a private temple tour and a riverside meditation session.",
      date: "2025-04-03",
    },
    {
      name: "Kavya Nair",
      location: "Kochi",
      rating: 4,
      text: "Loved the food, loved the views, loved the peace. The garden cottage was our private paradise. Already planning our next visit with family.",
      date: "2025-03-18",
    },
    {
      name: "Thomas & Marie Dupont",
      location: "Paris, France",
      rating: 5,
      text: "Magnifique. The elegance of this hotel reminded us of the finest French countryside retreats, yet with an unmistakably Indian soul. The evening aarti from our balcony was unforgettable.",
      date: "2025-02-25",
    },
  ],
  nearbyAttractions: [
    {
      name: "Laxman Jhula",
      distance: "1.2 km",
      description:
        "Iconic suspension bridge over the Ganges, offering stunning views",
      category: "Landmark",
    },
    {
      name: "Beatles Ashram",
      distance: "2.5 km",
      description:
        "Historic ashram where The Beatles stayed in 1968, now an art gallery",
      category: "Culture",
    },
    {
      name: "Triveni Ghat",
      distance: "4 km",
      description:
        "Sacred bathing ghat where three rivers meet, famous for evening aarti",
      category: "Spiritual",
    },
    {
      name: "Rajaji National Park",
      distance: "8 km",
      description:
        "Wildlife sanctuary home to elephants, tigers, and over 300 bird species",
      category: "Nature",
    },
    {
      name: "Neer Garh Waterfall",
      distance: "3 km",
      description:
        "A serene two-tiered waterfall hidden in the forested hills",
      category: "Nature",
    },
    {
      name: "Parmarth Niketan Ashram",
      distance: "1.5 km",
      description:
        "One of the largest ashrams in Rishikesh, renowned for Ganga Aarti",
      category: "Spiritual",
    },
  ],
  spa: {
    available: true,
    description:
      "Our Ayurvedic wellness centre draws upon five thousand years of healing wisdom. Each treatment begins with a personal consultation to tailor therapies to your unique constitution. Surrounded by the sounds of the river and forest, surrender to a journey of deep restoration.",
    image: "https://picsum.photos/id/501/1200/800",
    services: [
      {
        name: "Abhyanga Full Body Massage",
        duration: "90 min",
        price: 3500,
        description:
          "Traditional warm oil massage using herbal oils suited to your dosha",
      },
      {
        name: "Shirodhara",
        duration: "60 min",
        price: 2800,
        description:
          "Continuous stream of warm oil on the forehead for deep relaxation",
      },
      {
        name: "Himalayan Stone Therapy",
        duration: "75 min",
        price: 3000,
        description:
          "Heated river stones placed on energy points to release tension",
      },
      {
        name: "Panchakarma Detox",
        duration: "3 hours",
        price: 8000,
        description:
          "Comprehensive Ayurvedic detoxification and rejuvenation programme",
      },
    ],
  },
  dayItinerary: [
    {
      time: "6:30 AM",
      period: "morning",
      title: "Sunrise Yoga by the Ganges",
      description:
        "Begin your day with a guided yoga session on the riverside deck as the first light touches the Himalayas",
    },
    {
      time: "8:00 AM",
      period: "morning",
      title: "Breakfast at Annapurna",
      description:
        "A spread of fresh fruits, warm parathas, organic muesli, and single-origin Himalayan coffee",
    },
    {
      time: "10:30 AM",
      period: "morning",
      title: "Guided Temple Walk",
      description:
        "Explore ancient temples and hidden ghats with our in-house cultural guide",
    },
    {
      time: "1:00 PM",
      period: "afternoon",
      title: "Lunch & Leisure",
      description:
        "Farm-to-table lunch followed by time at the infinity pool or reading in the library",
    },
    {
      time: "3:30 PM",
      period: "afternoon",
      title: "Ayurvedic Spa Session",
      description:
        "A personalized treatment at our wellness centre to restore balance",
    },
    {
      time: "6:00 PM",
      period: "evening",
      title: "Evening Aarti Viewing",
      description:
        "Watch the mesmerizing Ganga Aarti ceremony from a private vantage point",
    },
    {
      time: "8:00 PM",
      period: "evening",
      title: "Rooftop Dinner Under the Stars",
      description:
        "Multi-course Himalayan tasting menu paired with curated wines on the candlelit terrace",
    },
  ],
  seasons: [
    {
      name: "Spring",
      months: "March - May",
      temperature: "18-32\u00B0C",
      description:
        "Wildflowers blanket the hillsides and the Ganges runs crystal clear. Perfect for outdoor yoga and nature walks.",
      highlights: [
        "Holi celebrations",
        "Wildflower trails",
        "Clear river waters",
        "Ideal trekking weather",
      ],
    },
    {
      name: "Monsoon",
      months: "June - September",
      temperature: "22-30\u00B0C",
      description:
        "The landscape transforms into a lush emerald paradise. Reduced rates, fewer crowds, and the dramatic beauty of rain-kissed mountains.",
      highlights: [
        "Lush greenery",
        "Waterfall season",
        "Spa-focused retreats",
        "Monsoon discounts",
      ],
    },
    {
      name: "Autumn",
      months: "October - November",
      temperature: "14-28\u00B0C",
      description:
        "Crisp air, golden light, and stunning visibility of the Himalayan peaks. The most photographed season at the retreat.",
      highlights: [
        "Diwali festivities",
        "Peak mountain views",
        "Pleasant temperatures",
        "Cultural festivals",
      ],
    },
    {
      name: "Winter",
      months: "December - February",
      temperature: "5-18\u00B0C",
      description:
        "Cool mornings, warm firesides, and snow-dusted peaks in the distance. An intimate, cozy experience with warm Ayurvedic therapies.",
      highlights: [
        "Fireside dining",
        "Hot spring visits",
        "Snow-capped views",
        "New Year celebrations",
      ],
    },
  ],
  gettingHere: [
    {
      from: "Dehradun Airport (DED)",
      mode: "Drive",
      duration: "45 minutes",
      details:
        "Our chauffeur service meets you at arrivals. Pre-book through the concierge for a seamless transfer.",
    },
    {
      from: "Delhi (IGI Airport)",
      mode: "Drive",
      duration: "5-6 hours",
      details:
        "Via NH-334 through Haridwar. We arrange luxury car transfers with a refreshment stop en route.",
    },
    {
      from: "Haridwar Railway Station",
      mode: "Drive",
      duration: "1 hour",
      details:
        "Well-connected by Shatabdi Express from Delhi. Hotel transfer available on request.",
    },
    {
      from: "Jolly Grant Airport",
      mode: "Helicopter",
      duration: "15 minutes",
      details:
        "Private helicopter transfers available for a truly elevated arrival experience.",
    },
  ],
  amenities: [
    "Free WiFi",
    "Infinity Pool",
    "Yoga Deck",
    "Ayurvedic Spa",
    "Rooftop Restaurant",
    "Room Service",
    "Valet Parking",
    "Laundry & Pressing",
    "Fitness Centre",
    "Library & Reading Room",
    "Meditation Garden",
    "River Access",
    "Concierge Desk",
    "Airport Transfers",
    "Currency Exchange",
    "In-room Safe",
  ],
  policies: [
    {
      title: "Check-in & Check-out",
      details:
        "Check-in from 2:00 PM. Check-out by 11:00 AM. Early check-in and late check-out available on request, subject to availability.",
    },
    {
      title: "Cancellation Policy",
      details:
        "Free cancellation up to 48 hours before check-in. Cancellations within 48 hours are charged one night's stay. No-shows are charged in full.",
    },
    {
      title: "Children & Extra Beds",
      details:
        "Children under 6 stay free. Extra beds available at \u20B91,500 per night. Babysitting services can be arranged with 24 hours notice.",
    },
    {
      title: "Pet Policy",
      details:
        "We welcome well-behaved pets in our Garden Cottages. A refundable deposit of \u20B92,000 applies. Please inform us at the time of booking.",
    },
    {
      title: "Smoking Policy",
      details:
        "The Ganges Retreat is a non-smoking property. Designated smoking areas are available in the outdoor garden.",
    },
  ],
  faqs: [
    {
      question: "Is the hotel suitable for solo travellers?",
      answer:
        "Absolutely. Many of our guests are solo travellers seeking peace and rejuvenation. Our yoga programmes, spa, and guided walks are perfect for individual experiences.",
    },
    {
      question: "Do you offer vegetarian and vegan meals?",
      answer:
        "Yes. Our restaurant offers an extensive vegetarian and vegan menu. Rishikesh is a vegetarian city, and we celebrate this with creative plant-based cuisine.",
    },
    {
      question: "Can you arrange adventure activities?",
      answer:
        "Our concierge can arrange white-water rafting, bungee jumping, trekking, and camping with trusted local operators. Book at least 24 hours in advance.",
    },
    {
      question: "Is there mobile network coverage?",
      answer:
        "Jio and Airtel have strong coverage. BSNL works well too. The hotel also provides complimentary high-speed WiFi throughout the property.",
    },
    {
      question: "What is the best time to visit?",
      answer:
        "October to March offers the most pleasant weather. However, the monsoon season (July-September) has a dramatic beauty and lower rates.",
    },
    {
      question: "Do you offer airport transfers?",
      answer:
        "Yes, we offer complimentary transfers from Dehradun Airport and paid luxury transfers from Delhi. Helicopter transfers are also available.",
    },
  ],
  events: {
    available: true,
    description:
      "From intimate weddings by the river to corporate retreats in the mountains, The Ganges Retreat offers bespoke event spaces that blend natural beauty with world-class facilities.",
    image: "https://picsum.photos/id/416/1200/800",
    spaces: [
      {
        name: "The River Pavilion",
        capacity: "Up to 150 guests",
        description:
          "An open-air pavilion overlooking the Ganges, perfect for ceremonies and receptions",
        amenities: [
          "Sound system",
          "Lighting",
          "Catering",
          "Decoration",
          "Bridal suite",
        ],
      },
      {
        name: "The Summit Room",
        capacity: "Up to 40 guests",
        description:
          "A wood-panelled conference room with mountain views, ideal for corporate retreats",
        amenities: [
          "Projector",
          "Whiteboard",
          "Video conferencing",
          "Coffee service",
          "Breakout areas",
        ],
      },
    ],
  },
  testimonialHighlight: {
    name: "Thomas & Marie Dupont",
    location: "Paris, France",
    rating: 5,
    text: "In all our years of travel, few places have stirred us the way The Ganges Retreat did. The elegance of this hotel reminded us of the finest French countryside retreats, yet with an unmistakably Indian soul. Watching the evening aarti from our balcony, with the mountains turning amber in the fading light, we understood why people return to Rishikesh again and again.",
    date: "2025-02-25",
  },
  agnotitaMessage:
    "This digital presence was crafted for The Ganges Retreat by agnotita. Every detail was gathered, every photo selected, every word considered. If you\u2019d like to claim this as your own \u2014 we\u2019d love to hear from you.",
};
