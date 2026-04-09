export interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Contact {
  name: string;
  role: string;
  phone: string;
  email: string;
}

export interface Hostel {
  id: string;
  name: string;
  tagline: string;
  description: string;
  mainImage: string;
  gallery: string[];
  amenities: string[];
  location: string;
  priceRange: string;
  reviews: Review[];
  contacts: Contact[];
}

export const hostelsData: Hostel[] = [
  {
    id: "urban-hub",
    name: "Urban Hub Hostel",
    tagline: "Where City Meets Comfort",
    description: "Located in the heart of the city, Urban Hub Hostel offers modern amenities and a vibrant social atmosphere. Perfect for travelers who want to explore the city while meeting like-minded adventurers.",
    mainImage: "https://images.unsplash.com/photo-1775212131982-403656f5cced?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3N0ZWwlMjBidWlsZGluZyUyMGV4dGVyaW9yfGVufDF8fHx8MTc3NTc1OTYxNXww&ixlib=rb-4.1.0&q=80&w=1080",
    gallery: [
      "https://images.unsplash.com/photo-1709805619372-40de3f158e83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwaG9zdGVsJTIwaW50ZXJpb3IlMjBkb3JtaXRvcnl8ZW58MXx8fHwxNzc1NzU5NjE1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1613902621852-af2e8d8365d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmlnaHQlMjBob3N0ZWwlMjBjb21tb24lMjBhcmVhfGVufDF8fHx8MTc3NTc1OTYxNXww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1631248387231-e5ca9ae29a86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3N0ZWwlMjBraXRjaGVuJTIwZmFjaWxpdGllc3xlbnwxfHx8fDE3NzU3NTk2MTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1583146950826-75a230afa9e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3N0ZWwlMjBsb3VuZ2UlMjBzb2NpYWxpemluZ3xlbnwxfHx8fDE3NzU3NTk2MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    amenities: [
      "Free WiFi",
      "24/7 Reception",
      "Shared Kitchen",
      "Common Lounge",
      "Laundry Service",
      "City Tours",
      "Lockers",
      "Air Conditioning"
    ],
    location: "Downtown City Center, 123 Main Street",
    priceRange: "$15 - $45 per night",
    reviews: [
      {
        id: 1,
        name: "Sarah Johnson",
        rating: 5,
        comment: "Amazing hostel! The staff was incredibly friendly and the location is perfect. The common areas are great for meeting other travelers.",
        date: "March 2026"
      },
      {
        id: 2,
        name: "Miguel Rodriguez",
        rating: 5,
        comment: "Best hostel experience I've had! Clean rooms, great atmosphere, and the manager was super helpful with local recommendations.",
        date: "February 2026"
      },
      {
        id: 3,
        name: "Emma Chen",
        rating: 4,
        comment: "Very comfortable stay. The facilities are modern and well-maintained. Would definitely recommend to solo travelers.",
        date: "January 2026"
      }
    ],
    contacts: [
      {
        name: "David Martinez",
        role: "Owner",
        phone: "+1 (555) 123-4567",
        email: "david@urbanhub.com"
      },
      {
        name: "Lisa Anderson",
        role: "Manager",
        phone: "+1 (555) 123-4568",
        email: "lisa@urbanhub.com"
      }
    ]
  },
  {
    id: "cozy-corner",
    name: "Cozy Corner Retreat",
    tagline: "Your Home Away From Home",
    description: "Nestled in a quiet neighborhood, Cozy Corner Retreat provides a peaceful escape with a homey atmosphere. Enjoy personalized service and a relaxing environment perfect for unwinding after a day of exploration.",
    mainImage: "https://images.unsplash.com/photo-1573567199032-50a155ba6de1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3V0aXF1ZSUyMGhvc3RlbCUyMHJlY2VwdGlvbnxlbnwxfHx8fDE3NzU3NTk2MTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    gallery: [
      "https://images.unsplash.com/photo-1709805619372-40de3f158e83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3N0ZWwlMjBiZWRyb29tJTIwYnVuayUyMGJlZHN8ZW58MXx8fHwxNzc1NzU5NjE2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1583146950826-75a230afa9e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3N0ZWwlMjBsb3VuZ2UlMjBzb2NpYWxpemluZ3xlbnwxfHx8fDE3NzU3NTk2MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1613902621852-af2e8d8365d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmlnaHQlMjBob3N0ZWwlMjBjb21tb24lMjBhcmVhfGVufDF8fHx8MTc3NTc1OTYxNXww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1631248387231-e5ca9ae29a86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3N0ZWwlMjBraXRjaGVuJTIwZmFjaWxpdGllc3xlbnwxfHx8fDE3NzU3NTk2MTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    amenities: [
      "Free WiFi",
      "Breakfast Included",
      "Garden Patio",
      "Book Exchange",
      "Coffee Bar",
      "Bicycle Rental",
      "Parking",
      "Yoga Classes"
    ],
    location: "Riverside District, 456 Oak Avenue",
    priceRange: "$20 - $50 per night",
    reviews: [
      {
        id: 1,
        name: "James Wilson",
        rating: 5,
        comment: "Such a peaceful place! The garden is beautiful and the breakfast was delicious. The owners really care about their guests.",
        date: "March 2026"
      },
      {
        id: 2,
        name: "Sofia Patel",
        rating: 5,
        comment: "Felt like staying at a friend's place. The atmosphere is so welcoming and relaxing. Perfect for digital nomads!",
        date: "February 2026"
      },
      {
        id: 3,
        name: "Tom Bradley",
        rating: 4,
        comment: "Great value for money. The neighborhood is quiet and safe, and it's easy to get to the main attractions.",
        date: "January 2026"
      }
    ],
    contacts: [
      {
        name: "Rachel Thompson",
        role: "Owner",
        phone: "+1 (555) 234-5678",
        email: "rachel@cozycorner.com"
      },
      {
        name: "Michael Brown",
        role: "Manager",
        phone: "+1 (555) 234-5679",
        email: "michael@cozycorner.com"
      }
    ]
  },
  {
    id: "skyline-stays",
    name: "Skyline Stays",
    tagline: "Elevated Living Experience",
    description: "Experience breathtaking city views from our rooftop terrace at Skyline Stays. This contemporary hostel combines style with substance, offering premium amenities and unforgettable sunsets.",
    mainImage: "https://images.unsplash.com/photo-1676818038357-94308d1ad0ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMGhvc3RlbCUyMG5pZ2h0fGVufDF8fHx8MTc3NTc1OTYxOHww&ixlib=rb-4.1.0&q=80&w=1080",
    gallery: [
      "https://images.unsplash.com/photo-1604064536391-074dc000c776?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3N0ZWwlMjByb29mdG9wJTIwdGVycmFjZXxlbnwxfHx8fDE3NzU3NTk2MTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1709805619372-40de3f158e83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwaG9zdGVsJTIwaW50ZXJpb3IlMjBkb3JtaXRvcnl8ZW58MXx8fHwxNzc1NzU5NjE1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1613902621852-af2e8d8365d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmlnaHQlMjBob3N0ZWwlMjBjb21tb24lMjBhcmVhfGVufDF8fHx8MTc3NTc1OTYxNXww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1583146950826-75a230afa9e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3N0ZWwlMjBsb3VuZ2UlMjBzb2NpYWxpemluZ3xlbnwxfHx8fDE3NzU3NTk2MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    amenities: [
      "Rooftop Terrace",
      "Free WiFi",
      "Premium Beds",
      "Coworking Space",
      "Bar & Restaurant",
      "Events & Activities",
      "Secure Lockers",
      "Movie Room"
    ],
    location: "Arts District, 789 Skyline Boulevard",
    priceRange: "$25 - $60 per night",
    reviews: [
      {
        id: 1,
        name: "Alexandra Kim",
        rating: 5,
        comment: "The rooftop is absolutely stunning! Perfect spot to watch the sunset. The facilities are top-notch and the vibe is amazing.",
        date: "March 2026"
      },
      {
        id: 2,
        name: "Daniel Lee",
        rating: 5,
        comment: "Best hostel I've stayed at! Modern design, comfortable beds, and great social events. The coworking space is a huge plus.",
        date: "February 2026"
      },
      {
        id: 3,
        name: "Nina Santos",
        rating: 5,
        comment: "Incredible experience! The staff goes above and beyond. The location is perfect for exploring the arts district.",
        date: "January 2026"
      }
    ],
    contacts: [
      {
        name: "Alexander Chen",
        role: "Owner",
        phone: "+1 (555) 345-6789",
        email: "alex@skylinestays.com"
      },
      {
        name: "Jennifer Park",
        role: "Manager",
        phone: "+1 (555) 345-6790",
        email: "jennifer@skylinestays.com"
      }
    ]
  }
];
