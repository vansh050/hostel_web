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

export interface RoomType {
  name: string;
  price: string;
  features: string[];
}

export interface Hostel {
  id: string;
  name: string;
  tagline: string;
  type: "girls" | "boys";
  description: string;
  mainImage: string;
  gallery: string[];
  amenities: string[];
  location: string;
  fullAddress: string;
  landmark: string;
  pincode: string;
  googleMapsUrl: string;
  googleMapsEmbed: string;
  priceRange: string;
  roomTypes: RoomType[];
  reviews: Review[];
  contacts: Contact[];
  whatsapp: string;
  nearbyAttractions: string[];
  faqs: { question: string; answer: string }[];
}

export const BRAND_NAME = "Lalpur Hostels";
export const BRAND_TAGLINE = "Trusted Hostels in Ranchi Since Day One";
export const BRAND_PHONE = "+91-XXXXXXXXXX"; // TODO: Replace with your main phone number
export const BRAND_EMAIL = "info@lalpur hostels.com"; // TODO: Replace with your email
export const BRAND_WHATSAPP = "91XXXXXXXXXX"; // TODO: Replace with your WhatsApp number (country code + number, no +)

export const hostelsData: Hostel[] = [
  {
    id: "muskan-girls-hostel-ranchi",
    name: "Muskan Girls Hostel",
    tagline: "Safe & Comfortable Girls Hostel in Lalpur, Ranchi",
    type: "girls",
    description:
      "Muskan Girls Hostel is a trusted and well-managed girls hostel located in Gujarati Mohalla, Lalpur, Ranchi. Situated opposite Gulmohar Apartment near Dr. Gautam Bakshi Homoe Clinic on Saint Anna Lane, we provide a safe, clean, and homely environment for working women and students. With 24/7 security, nutritious home-cooked meals, and all modern amenities, Muskan Girls Hostel is the ideal choice for girls looking for affordable and comfortable accommodation in Ranchi.",
    mainImage: "/images/muskan-girls-hostel/photo-01.jpeg",
    gallery: [
      "/images/muskan-girls-hostel/photo-02.jpeg",
      "/images/muskan-girls-hostel/photo-03.jpeg",
      "/images/muskan-girls-hostel/photo-04.jpeg",
      "/images/muskan-girls-hostel/photo-05.jpeg",
      "/images/muskan-girls-hostel/photo-06.jpeg",
      "/images/muskan-girls-hostel/photo-07.jpeg",
      "/images/muskan-girls-hostel/photo-08.jpeg",
      "/images/muskan-girls-hostel/photo-09.jpeg",
      "/images/muskan-girls-hostel/photo-10.jpeg",
      "/images/muskan-girls-hostel/photo-11.jpeg",
      "/images/muskan-girls-hostel/photo-12.jpeg",
    ],
    amenities: [
      "4 Home-Cooked Meals Daily (Veg & Non-Veg)",
      "G+4 Building · 30 Toilets & 30 Bathrooms (6 per floor for 20 students)",
      "24/7 Electricity with Power Backup",
      "24/7 High-Speed Wi-Fi (Full Campus)",
      "24/7 Security Guard at Door",
      "CCTV Surveillance",
      "24/7 RO Drinking Water",
      "Washing Machines for Laundry",
      "Terrace Birthday Party Space",
      "Hot Water (Geyser)",
      "Daily Housekeeping",
      "First Aid & Medical Assistance",
    ],
    location: "Lalpur, Ranchi",
    fullAddress:
      "Muskan Girls Hostel, Gujarati Mohalla, Opposite Gulmohar Apartment, Dr Gautam Bakshi Homoe Clinic, Saint Anna Lane, Lalpur, Ranchi, Jharkhand",
    landmark: "Opposite Gulmohar Apartment, Gujarati Mohalla, Saint Anna Lane",
    pincode: "834001",
    googleMapsUrl:
      "https://www.google.com/maps/search/Muskan+Girls+Hostel+Opposite+Gulmohar+Apartment+Saint+Anna+Lane+Lalpur+Ranchi+834001",
    googleMapsEmbed:
      "https://maps.google.com/maps?q=Muskan+Girls+Hostel+Opposite+Gulmohar+Apartment+Gujarati+Mohalla+Saint+Anna+Lane+Lalpur+Ranchi+834001&t=&z=16&ie=UTF8&iwloc=&output=embed",
    priceRange: "₹7,500 - ₹13,000/month",
    roomTypes: [
      {
        name: "Double Sharing",
        price: "₹7,500 / ₹8,000 / ₹8,500 per month",
        features: [
          "4 home-cooked meals included daily",
          "Bed & mattress",
          "Cupboard",
          "Fan",
          "Attached washroom",
          "Study table",
        ],
      },
      {
        name: "Single Room",
        price: "₹11,000 / ₹13,000 per month",
        features: [
          "4 home-cooked meals included daily",
          "Single bed",
          "Cupboard",
          "Fan & AC (optional)",
          "Attached washroom",
          "Study table",
          "Wi-Fi",
        ],
      },
    ],
    reviews: [
      {
        id: 1,
        name: "Priya Kumari",
        rating: 5,
        comment:
          "Best girls hostel in Lalpur! The food is amazing and the rooms are very clean. I feel completely safe here. The aunty takes care of us like family.",
        date: "March 2026",
      },
      {
        id: 2,
        name: "Sneha Sharma",
        rating: 5,
        comment:
          "I have been staying here for 2 years. Very homely environment, good food, and the location is perfect - close to everything in Lalpur. Highly recommended!",
        date: "February 2026",
      },
      {
        id: 3,
        name: "Anjali Singh",
        rating: 4,
        comment:
          "Nice hostel with all basic facilities. The Wi-Fi could be a bit faster, but overall a great place to stay for students and working women in Ranchi.",
        date: "January 2026",
      },
    ],
    contacts: [
      {
        name: "Hostel Manager",
        role: "Manager",
        phone: "+91-XXXXXXXXXX",
        email: "muskan@lalpurhostels.com",
      },
    ],
    whatsapp: "91XXXXXXXXXX",
    nearbyAttractions: [
      "Gulmohar Apartment - Right opposite",
      "Dr Gautam Bakshi Homoe Clinic - Adjacent",
      "Saint Anna Lane - On the same road",
      "Lalpur Chowk - 2 min walk",
      "Ranchi Main Road - 5 min walk",
      "Ranchi Railway Station - 10 min drive",
      "Birsa Munda Airport - 20 min drive",
      "Albert Ekka Chowk - 5 min drive",
    ],
    faqs: [
      {
        question: "Is food included in the hostel fee?",
        answer:
          "Yes! We provide nutritious home-cooked meals - breakfast, lunch, and dinner. Both veg and non-veg options are available.",
      },
      {
        question: "What is the security arrangement?",
        answer:
          "We have 24/7 security with CCTV surveillance, a night guard, and a strict visitor policy. Only verified visitors are allowed during visiting hours.",
      },
      {
        question: "Is there a lock-in period or deposit?",
        answer:
          "We require a refundable security deposit of one month's rent. The minimum stay is 3 months.",
      },
      {
        question: "What are the hostel timings?",
        answer:
          "Gate closes at 9:00 PM. Late entry is allowed up to 10:30 PM with prior permission. Weekend outings are allowed with guardian approval.",
      },
    ],
  },
  {
    id: "sanskriti-girls-hostel-ranchi",
    name: "Sanskriti Girls Hostel",
    tagline: "A Home Away From Home for Girls in Ranchi",
    type: "girls",
    description:
      "Sanskriti Girls Hostel, located behind Apsara Hotel on Circular Road in Lalpur, Ranchi, is a well-established girls hostel known for its discipline, hygiene, and homely atmosphere. We cater to college students, competitive exam aspirants, and working women who seek a secure and affordable place to stay in the heart of Ranchi. With excellent food, modern facilities, and a supportive environment, Sanskriti is where you belong.",
    mainImage: "/images/sanskriti-girls-hostel/photo-01.jpeg",
    gallery: [
      "/images/sanskriti-girls-hostel/photo-02.jpeg",
      "/images/sanskriti-girls-hostel/photo-03.jpeg",
      "/images/sanskriti-girls-hostel/photo-04.jpeg",
      "/images/sanskriti-girls-hostel/photo-05.jpeg",
      "/images/sanskriti-girls-hostel/photo-06.jpeg",
    ],
    amenities: [
      "4 Home-Cooked Meals Daily (Veg & Non-Veg)",
      "G+3 Building · 24 Toilets & 24 Bathrooms (6 per floor for 20 students)",
      "24/7 Electricity with Power Backup",
      "24/7 High-Speed Wi-Fi (Full Campus)",
      "24/7 Security Guard at Door",
      "CCTV Surveillance",
      "24/7 RO Drinking Water",
      "Washing Machines for Laundry",
      "Terrace Birthday Party Space",
      "Hot Water (Geyser)",
      "Daily Housekeeping",
      "First Aid & Medical Assistance",
    ],
    location: "Lalpur, Ranchi",
    fullAddress:
      "Sanskriti Girls Hostel, Behind Apsara Hotel, Circular Road, Lalpur, Ranchi, Jharkhand",
    landmark: "Behind Apsara Hotel, Circular Road",
    pincode: "834001",
    googleMapsUrl:
      "https://www.google.com/maps/search/Sanskriti+Girls+Hostel+Behind+Apsara+Hotel+Circular+Road+Lalpur+Ranchi+834001",
    googleMapsEmbed:
      "https://maps.google.com/maps?q=Sanskriti+Girls+Hostel+Behind+Apsara+Hotel+Circular+Road+Lalpur+Ranchi+834001&t=&z=16&ie=UTF8&iwloc=&output=embed",
    priceRange: "₹7,500 - ₹12,500/month",
    roomTypes: [
      {
        name: "Double Sharing",
        price: "₹7,500 / ₹8,000 per month",
        features: [
          "4 home-cooked meals included daily",
          "Bed & mattress",
          "Cupboard",
          "Fan",
          "Attached washroom",
          "Study table",
        ],
      },
      {
        name: "Single Room",
        price: "₹12,000 / ₹12,500 per month",
        features: [
          "4 home-cooked meals included daily",
          "Single bed",
          "Wardrobe",
          "Fan & AC (optional)",
          "Attached washroom",
          "Study table",
          "High-speed Wi-Fi",
        ],
      },
    ],
    reviews: [
      {
        id: 1,
        name: "Ritu Verma",
        rating: 5,
        comment:
          "Sanskriti is genuinely the best hostel for girls in Ranchi. The warden is very caring, the food is healthy and tasty, and the rooms are spacious. I recommend it to everyone!",
        date: "March 2026",
      },
      {
        id: 2,
        name: "Kavita Devi",
        rating: 5,
        comment:
          "I came to Ranchi for JPSC preparation and this hostel has been perfect. Quiet environment, good study hall, and the location is very convenient. Thank you Sanskriti!",
        date: "February 2026",
      },
      {
        id: 3,
        name: "Nisha Gupta",
        rating: 4,
        comment:
          "Good hostel with nice food and clean rooms. The staff is friendly and helpful. Only thing I'd improve is adding AC in more rooms. Otherwise great value for money.",
        date: "January 2026",
      },
    ],
    contacts: [
      {
        name: "Hostel Manager",
        role: "Manager",
        phone: "+91-XXXXXXXXXX",
        email: "sanskriti@lalpurhostels.com",
      },
    ],
    whatsapp: "91XXXXXXXXXX",
    nearbyAttractions: [
      "Apsara Hotel - Right behind",
      "Circular Road - On the same road",
      "Lalpur Chowk - 3 min walk",
      "Ranchi Main Road - 5 min walk",
      "Ranchi Railway Station - 10 min drive",
      "Birsa Munda Airport - 20 min drive",
      "Firayalal Chowk - 5 min drive",
    ],
    faqs: [
      {
        question: "Is this hostel suitable for competitive exam preparation?",
        answer:
          "Absolutely! We have a dedicated quiet study hall open 24/7 and many of our residents are preparing for JPSC, UPSC, SSC, and other competitive exams.",
      },
      {
        question: "Are guests/visitors allowed?",
        answer:
          "Verified family members can visit during visiting hours (10 AM to 6 PM). Male visitors must meet in the common area only.",
      },
      {
        question: "Can I get a room on a monthly basis?",
        answer:
          "Yes, we offer monthly and quarterly payment options. Minimum stay is 1 month with a refundable security deposit.",
      },
      {
        question: "Is non-veg food available?",
        answer:
          "Yes, we serve both vegetarian and non-vegetarian meals. Special dietary requirements can be accommodated with prior notice.",
      },
    ],
  },
  {
    id: "sankalp-boys-hostel-ranchi",
    name: "Sankalp Boys Hostel",
    tagline: "Affordable Boys Hostel in the Heart of Ranchi",
    type: "boys",
    description:
      "Sankalp Boys Hostel is a modern and affordable boys hostel situated opposite Plaza Cinema Hall, next to Dr Jaiswal Hospital in Thapakhna, Lalpur, Ranchi. Designed for students, working professionals, and competitive exam aspirants, we offer a clean, disciplined, and supportive living environment. With wholesome meals, high-speed internet, and a prime Lalpur location, Sankalp is the smart choice for boys seeking quality accommodation in Ranchi.",
    mainImage: "/images/sankalp-boys-hostel/photo-01.jpeg",
    gallery: [
      "/images/sankalp-boys-hostel/photo-02.jpeg",
      "/images/sankalp-boys-hostel/photo-03.jpeg",
      "/images/sankalp-boys-hostel/photo-04.jpeg",
      "/images/sankalp-boys-hostel/photo-05.jpeg",
      "/images/sankalp-boys-hostel/photo-06.jpeg",
      "/images/sankalp-boys-hostel/photo-07.jpeg",
      "/images/sankalp-boys-hostel/photo-08.jpeg",
    ],
    amenities: [
      "3 Home-Cooked Meals Daily (Veg & Non-Veg)",
      "G+4 Building · 30 Toilets & 30 Bathrooms (6 per floor for 20 students)",
      "24/7 Electricity with Power Backup",
      "24/7 High-Speed Wi-Fi (Full Campus)",
      "24/7 Security Guard at Door",
      "CCTV Surveillance",
      "24/7 RO Drinking Water",
      "Washing Machines for Laundry",
      "Terrace Birthday Party Space",
      "Hot Water (Geyser)",
      "Daily Housekeeping",
      "First Aid & Medical Assistance",
      "Two-Wheeler Parking",
    ],
    location: "Lalpur, Ranchi",
    fullAddress:
      "Sankalp Boys Hostel, Opposite Plaza Cinema Hall, Next to Dr Jaiswal Hospital, Thapakhna, Lalpur, Ranchi, Jharkhand",
    landmark: "Opposite Plaza Cinema Hall, Next to Dr Jaiswal Hospital, Thapakhna",
    pincode: "834001",
    googleMapsUrl:
      "https://www.google.com/maps/search/Sankalp+Boys+Hostel+Next+to+Dr+Jaiswal+Hospital+Thapakhna+Lalpur+Ranchi+834001",
    googleMapsEmbed:
      "https://maps.google.com/maps?q=Sankalp+Boys+Hostel+Opposite+Plaza+Cinema+Hall+Next+to+Dr+Jaiswal+Hospital+Thapakhna+Lalpur+Ranchi+834001&t=&z=16&ie=UTF8&iwloc=&output=embed",
    priceRange: "₹7,500 - ₹14,000/month",
    roomTypes: [
      {
        name: "Double Sharing",
        price: "₹7,500 / ₹8,000 / ₹8,500 per month",
        features: [
          "3 home-cooked meals included daily",
          "Bed & mattress",
          "Cupboard",
          "Fan",
          "Attached washroom",
          "Study table",
        ],
      },
      {
        name: "Single Room",
        price: "₹12,000 / ₹13,000 / ₹14,000 per month",
        features: [
          "3 home-cooked meals included daily",
          "Single bed",
          "Wardrobe",
          "Fan & AC (optional)",
          "Attached washroom",
          "Study table",
          "High-speed Wi-Fi",
        ],
      },
    ],
    reviews: [
      {
        id: 1,
        name: "Rahul Kumar",
        rating: 5,
        comment:
          "Excellent hostel for boys in Ranchi. Clean rooms, tasty food, and the staff is very cooperative. The location in Lalpur makes it easy to reach coaching classes and markets.",
        date: "March 2026",
      },
      {
        id: 2,
        name: "Amit Sinha",
        rating: 5,
        comment:
          "I shifted here 6 months ago and it's been a great experience. Good Wi-Fi for online classes, decent food, and the rooms are well-maintained. Recommended!",
        date: "February 2026",
      },
      {
        id: 3,
        name: "Vikash Oraon",
        rating: 4,
        comment:
          "Value for money hostel in Lalpur. Food quality is good, the environment is friendly, and security is tight. Good option for students and job seekers in Ranchi.",
        date: "January 2026",
      },
    ],
    contacts: [
      {
        name: "Hostel Manager",
        role: "Manager",
        phone: "+91-XXXXXXXXXX",
        email: "sankalp@lalpurhostels.com",
      },
    ],
    whatsapp: "91XXXXXXXXXX",
    nearbyAttractions: [
      "Plaza Cinema Hall - Right opposite",
      "Dr Jaiswal Hospital - Right next door",
      "Thapakhna, Lalpur - In the area",
      "Lalpur Chowk - 3 min walk",
      "Ranchi Main Road - 5 min walk",
      "Ranchi Railway Station - 10 min drive",
      "Birsa Munda Airport - 20 min drive",
      "Kutchery Chowk - 7 min drive",
    ],
    faqs: [
      {
        question: "Is this hostel good for working professionals?",
        answer:
          "Yes! Many of our residents are working professionals. We offer flexible meal timings and 24/7 access so you can manage your work schedule comfortably.",
      },
      {
        question: "Is parking available?",
        answer:
          "Yes, we have dedicated parking space for bikes and scooters. Car parking is available on a first-come-first-served basis.",
      },
      {
        question: "What is the food menu like?",
        answer:
          "We serve North Indian home-style meals - breakfast (poha/paratha/bread), lunch (rice, dal, sabzi, roti), and dinner (rice/roti with curry). Non-veg on select days.",
      },
      {
        question: "Can I visit before booking?",
        answer:
          "Absolutely! We encourage you to visit and see the hostel before making a decision. Call us or message on WhatsApp to schedule a visit anytime between 10 AM and 7 PM.",
      },
    ],
  },
];
