export interface HostelPhoto {
  url: string;
  caption?: string;
}

export interface HostelReview {
  author: string;
  country: string;
  flag: string;
  text: string;
  rating: number;
  date: string;
}

export interface HostelRoom {
  name: string;
  price: number;
  photo: string;
  description: string;
  amenities: string[];
}

export interface NearbyPlace {
  name: string;
  type: string;
  distance: string;
  distanceKm: number;
  angle: number;
}

export interface HouseRule {
  icon: string;
  rule: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface TimelineEvent {
  time: string;
  title: string;
  description: string;
  icon: string;
}

export interface MonthData {
  month: string;
  shortMonth: string;
  crowdLevel: number;
  weather: string;
}

export interface HostelData {
  name: string;
  slug: string;
  tagline: string;
  city: string;
  state: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  rating: number;
  reviewCount: number;
  vibeWords: string[];
  description: string;
  longDescription: string;
  heroImage: string;
  driftImage: string;
  photos: HostelPhoto[];
  reviews: HostelReview[];
  rooms: HostelRoom[];
  amenities: string[];
  nearbyPlaces: NearbyPlace[];
  houseRules: HouseRule[];
  faq: FAQItem[];
  timeline: TimelineEvent[];
  monthlyData: MonthData[];
  hostName: string;
  hostPhoto: string;
  hostQuote: string;
  honestReviews: HostelReview[];
  weatherMood: {
    season: string;
    temperature: string;
    description: string;
    activities: string[];
  };
  howToReach: {
    from: string;
    steps: { mode: string; description: string; duration: string }[];
  }[];
  bookingUrl: string;
  whatsappNumber: string;
  social: {
    instagram?: string;
    facebook?: string;
    tripadvisor?: string;
    website?: string;
  };
  coordinates: { lat: number; lng: number };
}

export const sampleHostel: HostelData = {
  name: "Ganga Vibes Hostel",
  slug: "ganga-vibes-hostel",
  tagline: "where the river meets the road",
  city: "Rishikesh",
  state: "Uttarakhand",
  address: "Near Laxman Jhula, Tapovan, Rishikesh, Uttarakhand 249192",
  phone: "+91 98765 43210",
  email: "hello@gangavibeshostel.com",
  website: "https://gangavibeshostel.com",
  rating: 4.6,
  reviewCount: 342,
  vibeWords: ["chill", "community", "river views"],
  description:
    "A backpacker's paradise perched above the Ganges. We're not a hotel trying to be a hostel — we're travelers who built the place we always wished existed.",
  longDescription:
    "We started Ganga Vibes in 2019, three friends who'd spent years bouncing between hostels across Southeast Asia and South America. We knew what made a hostel great — it wasn't the thread count or the lobby art. It was the rooftop where strangers became friends over chai at sunset. The common room where someone always had a guitar. The kitchen where you'd learn to make dal from the person who arrived yesterday.\n\nSo we found this old building above the Ganges, right where Tapovan meets the forest trail. We tore out the walls, built bunk beds from local wood, painted the walls with maps of everywhere we'd been, and opened the doors. That first month, eight people came. By the third month, we were full every night.\n\nThree years later, we're still here. Still making chai every morning. Still sitting on the rooftop watching the river. The building got a few upgrades — better mattresses, a proper kitchen, the world's most scenic bathroom — but the spirit hasn't changed. Come as a guest, leave as family.",

  heroImage: "https://picsum.photos/seed/hostel-hero/1920/1080",
  driftImage: "https://picsum.photos/seed/hostel-drift/1920/800",

  photos: [
    { url: "https://picsum.photos/seed/hostel-1/800/600", caption: "Common area with river views" },
    { url: "https://picsum.photos/seed/hostel-2/800/1000", caption: "Our rooftop at golden hour" },
    { url: "https://picsum.photos/seed/hostel-3/600/800", caption: "The dorm life" },
    { url: "https://picsum.photos/seed/hostel-4/800/600", caption: "Morning yoga session" },
    { url: "https://picsum.photos/seed/hostel-5/800/800", caption: "Kitchen chaos (the good kind)" },
    { url: "https://picsum.photos/seed/hostel-6/800/600", caption: "Ganges from our balcony" },
    { url: "https://picsum.photos/seed/hostel-7/600/900", caption: "The reading nook" },
    { url: "https://picsum.photos/seed/hostel-8/800/600", caption: "Bonfire nights" },
  ],

  reviews: [
    {
      author: "Mika Johansson",
      country: "Sweden",
      flag: "\uD83C\uDDF8\uD83C\uDDEA",
      text: "Best hostel I've stayed in across all of India. The rooftop view of the Ganges at sunrise is something I'll never forget. Met incredible people here.",
      rating: 5,
      date: "2025-12-15",
    },
    {
      author: "Tom Brennan",
      country: "Australia",
      flag: "\uD83C\uDDE6\uD83C\uDDFA",
      text: "Came for 2 nights, stayed for 2 weeks. The community here is special. Morning yoga, afternoon chai, evening jams on the rooftop. Exactly what I needed.",
      rating: 5,
      date: "2025-11-28",
    },
    {
      author: "Priya Sharma",
      country: "India",
      flag: "\uD83C\uDDEE\uD83C\uDDF3",
      text: "Finally a hostel in India that understands what backpackers want. Clean beds, great Wi-Fi, amazing people. The kitchen is a bonus!",
      rating: 4,
      date: "2025-11-10",
    },
    {
      author: "Lucas Meyer",
      country: "Germany",
      flag: "\uD83C\uDDE9\uD83C\uDDEA",
      text: "The location is unbeatable. 5 minutes walk to Laxman Jhula, right above the river. Staff are super helpful with arranging rafting and treks.",
      rating: 5,
      date: "2025-10-22",
    },
    {
      author: "Yuki Tanaka",
      country: "Japan",
      flag: "\uD83C\uDDEF\uD83C\uDDF5",
      text: "Very peaceful place. I loved the morning meditation sessions. The beds are comfortable and the common area has a great vibe. Will come back!",
      rating: 5,
      date: "2025-10-05",
    },
    {
      author: "Emma Wilson",
      country: "UK",
      flag: "\uD83C\uDDEC\uD83C\uDDE7",
      text: "The dorms are basic but clean. What makes this place is the people and the views. Rooftop sunsets are magical. Great value for money.",
      rating: 4,
      date: "2025-09-18",
    },
    {
      author: "Carlos Rivera",
      country: "Mexico",
      flag: "\uD83C\uDDF2\uD83C\uDDFD",
      text: "Incredible energy at this hostel. Everyone is so welcoming. The shared kitchen saved me a lot of money. Location is perfect for exploring Rishikesh.",
      rating: 5,
      date: "2025-09-02",
    },
    {
      author: "Anika Patel",
      country: "India",
      flag: "\uD83C\uDDEE\uD83C\uDDF3",
      text: "Went for a solo trip and left with a group of friends. The hostel organizes group activities that actually bring people together. Loved it!",
      rating: 5,
      date: "2025-08-20",
    },
    {
      author: "Pierre Dubois",
      country: "France",
      flag: "\uD83C\uDDEB\uD83C\uDDF7",
      text: "Good hostel with amazing location. The beds could use better curtains for privacy, but the atmosphere makes up for it. Would recommend.",
      rating: 4,
      date: "2025-08-05",
    },
    {
      author: "Sarah Kim",
      country: "South Korea",
      flag: "\uD83C\uDDF0\uD83C\uDDF7",
      text: "Clean, affordable, and the staff actually care. They helped me plan my entire Uttarakhand trip. The chai here is the best I've had in India.",
      rating: 5,
      date: "2025-07-15",
    },
  ],

  rooms: [
    {
      name: "River View Dorm",
      price: 499,
      photo: "https://picsum.photos/seed/room-1/600/400",
      description: "6-bed mixed dorm with Ganges views from every bunk",
      amenities: ["River View", "Personal Locker", "Reading Light", "USB Charging"],
    },
    {
      name: "Female Dorm",
      price: 549,
      photo: "https://picsum.photos/seed/room-2/600/400",
      description: "4-bed female-only dorm with extra privacy curtains",
      amenities: ["Women Only", "Privacy Curtains", "Mirror", "Personal Locker"],
    },
    {
      name: "Rooftop Tent",
      price: 399,
      photo: "https://picsum.photos/seed/room-3/600/400",
      description: "Sleep under the stars in our rooftop glamping tents",
      amenities: ["Open Air", "Star Views", "Sleeping Bag", "Shared Bath"],
    },
    {
      name: "Private Double",
      price: 1499,
      photo: "https://picsum.photos/seed/room-4/600/400",
      description: "Cozy private room for two with mountain views",
      amenities: ["Private Bath", "Mountain View", "Queen Bed", "Balcony"],
    },
    {
      name: "The Treehouse",
      price: 1999,
      photo: "https://picsum.photos/seed/room-5/600/400",
      description: "Our signature wooden cabin elevated among the trees",
      amenities: ["Unique Stay", "Forest View", "Private Deck", "Hammock"],
    },
  ],

  amenities: [
    "Free Wi-Fi",
    "Hot Water",
    "Shared Kitchen",
    "Personal Lockers",
    "Rooftop Terrace",
    "Laundry Service",
    "Book Exchange",
    "Yoga Space",
    "Guitar Corner",
    "Travel Desk",
    "Filtered Water",
    "Common Room",
    "Board Games",
    "Chai Station",
    "Luggage Storage",
  ],

  nearbyPlaces: [
    { name: "Laxman Jhula", type: "landmark", distance: "0.5 km", distanceKm: 0.5, angle: 45 },
    { name: "Ram Jhula", type: "landmark", distance: "1.8 km", distanceKm: 1.8, angle: 120 },
    { name: "Beatles Ashram", type: "historical", distance: "2.1 km", distanceKm: 2.1, angle: 200 },
    { name: "Little Buddha Cafe", type: "cafe", distance: "0.3 km", distanceKm: 0.3, angle: 80 },
    { name: "Freedom Cafe", type: "cafe", distance: "0.4 km", distanceKm: 0.4, angle: 150 },
    { name: "Parmarth Niketan", type: "temple", distance: "1.2 km", distanceKm: 1.2, angle: 270 },
    { name: "Triveni Ghat", type: "temple", distance: "3.5 km", distanceKm: 3.5, angle: 310 },
    { name: "Shivpuri (Rafting)", type: "adventure", distance: "4.5 km", distanceKm: 4.5, angle: 30 },
    { name: "Neer Garh Waterfall", type: "nature", distance: "3.2 km", distanceKm: 3.2, angle: 160 },
    { name: "Rajaji National Park", type: "nature", distance: "5.0 km", distanceKm: 5.0, angle: 340 },
    { name: "Tera Manzil Temple", type: "temple", distance: "0.6 km", distanceKm: 0.6, angle: 60 },
    { name: "Gita Bhawan", type: "temple", distance: "0.8 km", distanceKm: 0.8, angle: 230 },
    { name: "German Bakery", type: "cafe", distance: "0.2 km", distanceKm: 0.2, angle: 100 },
    { name: "Bungee Jumping Point", type: "adventure", distance: "4.8 km", distanceKm: 4.8, angle: 70 },
    { name: "Patna Waterfall", type: "nature", distance: "4.0 km", distanceKm: 4.0, angle: 250 },
  ],

  houseRules: [
    { icon: "\uD83E\uDDB6", rule: "Shoes off at the door. The floor has feelings." },
    { icon: "\uD83C\uDF19", rule: "Music off by 11pm. The mountains sleep too." },
    { icon: "\uD83C\uDF72", rule: "Clean your dishes. Your mom doesn't work here." },
    { icon: "\uD83D\uDEAC", rule: "No smoking indoors. The rooftop is your canvas." },
    { icon: "\uD83D\uDD12", rule: "Use your locker. We're trusting, not naive." },
    { icon: "\uD83E\uDD1D", rule: "Say hi to strangers. That's literally why you're here." },
    { icon: "\u267B\uFE0F", rule: "Separate your waste. The Ganges will thank you." },
    { icon: "\uD83C\uDF55", rule: "Share your snacks or face silent judgment." },
  ],

  faq: [
    {
      question: "What time is check-in and check-out?",
      answer: "Check-in is from 1:00 PM onwards. Check-out is by 11:00 AM. Early check-in or late check-out? Just ask — we'll try to make it work.",
    },
    {
      question: "Can I store my luggage before check-in?",
      answer: "Absolutely! We have a secure luggage storage room. Drop your bags and go explore until your room is ready.",
    },
    {
      question: "Is the hostel suitable for solo female travelers?",
      answer: "100%. We have a female-only dorm with extra privacy curtains, and our staff is available 24/7. Many of our guests are solo female travelers.",
    },
    {
      question: "Do you organize group activities?",
      answer: "Yes! We run daily yoga sessions, weekly bonfire nights, group treks, and impromptu jam sessions. Check our common room board for the daily schedule.",
    },
    {
      question: "Can I cancel my booking?",
      answer: "Free cancellation up to 48 hours before check-in. After that, one night's charge applies. We get it — plans change.",
    },
    {
      question: "Are pets allowed?",
      answer: "We love animals, but no. We have a resident dog though — his name is Baba and he thinks he owns the place.",
    },
    {
      question: "Is parking available?",
      answer: "Limited parking is available on the street nearby. For bikes, we have a small parking area. We'd recommend coming by foot or auto from the bus stand.",
    },
    {
      question: "Do you have a curfew?",
      answer: "No curfew. The front door has a keypad — come and go as you please. Just be quiet after 11pm if you're coming back late.",
    },
  ],

  timeline: [
    {
      time: "6:30 AM",
      title: "Sunrise over the Ganges",
      description: "Wake up to golden light hitting the river. Grab a blanket and head to the rooftop.",
      icon: "\uD83C\uDF05",
    },
    {
      time: "7:30 AM",
      title: "Morning yoga",
      description: "Join our daily session on the terrace. All levels welcome. Mats provided.",
      icon: "\uD83E\uDDD8",
    },
    {
      time: "9:00 AM",
      title: "Breakfast & chai",
      description: "Hit up the kitchen or walk to German Bakery for banana pancakes and strong coffee.",
      icon: "\u2615",
    },
    {
      time: "11:00 AM",
      title: "Explore Laxman Jhula",
      description: "Walk across the iconic suspension bridge. Browse the market. Get lost in the temples.",
      icon: "\uD83C\uDF09",
    },
    {
      time: "1:00 PM",
      title: "Lunch at a river cafe",
      description: "Little Buddha or Freedom Cafe — thali, momos, or wood-fired pizza. Your call.",
      icon: "\uD83C\uDF5C",
    },
    {
      time: "3:00 PM",
      title: "River time",
      description: "Jump into the Ganges at the ghat below, or just sit on the rocks and read.",
      icon: "\uD83C\uDFCA",
    },
    {
      time: "5:30 PM",
      title: "Ganga Aarti",
      description: "Walk to Parmarth Niketan for the evening ceremony. Fire, chanting, river. Unforgettable.",
      icon: "\uD83D\uDD6F\uFE0F",
    },
    {
      time: "7:30 PM",
      title: "Rooftop dinner & jams",
      description: "Cook together, order in, or join the nightly rooftop gathering. Someone always has a guitar.",
      icon: "\uD83C\uDFB6",
    },
  ],

  monthlyData: [
    { month: "January", shortMonth: "Jan", crowdLevel: 3, weather: "Cold" },
    { month: "February", shortMonth: "Feb", crowdLevel: 4, weather: "Cool" },
    { month: "March", shortMonth: "Mar", crowdLevel: 7, weather: "Warm" },
    { month: "April", shortMonth: "Apr", crowdLevel: 6, weather: "Warm" },
    { month: "May", shortMonth: "May", crowdLevel: 5, weather: "Hot" },
    { month: "June", shortMonth: "Jun", crowdLevel: 2, weather: "Monsoon" },
    { month: "July", shortMonth: "Jul", crowdLevel: 1, weather: "Monsoon" },
    { month: "August", shortMonth: "Aug", crowdLevel: 1, weather: "Monsoon" },
    { month: "September", shortMonth: "Sep", crowdLevel: 4, weather: "Post-monsoon" },
    { month: "October", shortMonth: "Oct", crowdLevel: 8, weather: "Pleasant" },
    { month: "November", shortMonth: "Nov", crowdLevel: 7, weather: "Cool" },
    { month: "December", shortMonth: "Dec", crowdLevel: 5, weather: "Cold" },
  ],

  hostName: "Arjun & Meera",
  hostPhoto: "https://picsum.photos/seed/host-photo/400/400",
  hostQuote:
    "We didn't start a business. We built the place we always wished existed when we were on the road. Every brick here has a story, and every guest adds a new one.",

  honestReviews: [
    {
      author: "James O'Brien",
      country: "Ireland",
      flag: "\uD83C\uDDEE\uD83C\uDDEA",
      text: "The hot water situation is... inconsistent. Some mornings it's great, others you're doing a cold water dance at 6am. The views make up for it, but just be prepared.",
      rating: 3,
      date: "2025-09-10",
    },
    {
      author: "Anna Bergstrom",
      country: "Sweden",
      flag: "\uD83C\uDDF8\uD83C\uDDEA",
      text: "The road up to the hostel is steep and not well lit at night. I'd recommend downloading offline maps and carrying a torch. Also, the Wi-Fi struggles when the hostel is full.",
      rating: 3,
      date: "2025-08-22",
    },
    {
      author: "Raj Malhotra",
      country: "India",
      flag: "\uD83C\uDDEE\uD83C\uDDF3",
      text: "It's a hostel, not a hotel. If you need constant hot water, room service, and AC — this isn't for you. But if you want an authentic experience with great people, come here.",
      rating: 4,
      date: "2025-07-30",
    },
  ],

  weatherMood: {
    season: "March",
    temperature: "18-28\u00B0C",
    description: "Warm days, cool evenings. The river is calm and the skies are clear. Peak season is winding down — perfect sweet spot.",
    activities: ["River Rafting", "Cafe Hopping", "Sunrise Yoga", "Temple Walks", "Waterfall Treks"],
  },

  howToReach: [
    {
      from: "Delhi",
      steps: [
        { mode: "bus", description: "Overnight bus from ISBT Kashmere Gate to Rishikesh", duration: "6-7 hours" },
        { mode: "walk", description: "Auto from bus stand to Tapovan", duration: "20 minutes" },
      ],
    },
    {
      from: "Dehradun Airport",
      steps: [
        { mode: "flight", description: "Fly into Jolly Grant Airport (DED)", duration: "1 hour from Delhi" },
        { mode: "taxi", description: "Taxi from airport to Rishikesh", duration: "45 minutes" },
      ],
    },
    {
      from: "Haridwar",
      steps: [
        { mode: "train", description: "Train to Haridwar Junction from anywhere in India", duration: "varies" },
        { mode: "bus", description: "Local bus or shared auto to Rishikesh", duration: "30 minutes" },
      ],
    },
  ],

  bookingUrl: "https://www.hostelworld.com/hosteldetails.php/Ganga-Vibes-Hostel",
  whatsappNumber: "+919876543210",

  social: {
    instagram: "https://instagram.com/gangavibeshostel",
    facebook: "https://facebook.com/gangavibeshostel",
    tripadvisor: "https://tripadvisor.com/gangavibeshostel",
    website: "https://gangavibeshostel.com",
  },

  coordinates: { lat: 30.1254, lng: 78.3217 },
};
