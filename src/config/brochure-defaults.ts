
import type { BrochureContent, FloorPlanItem } from '@/types/brochure';
import { nanoid } from 'nanoid';

const defaultFloorPlan1: FloorPlanItem = {
  id: nanoid(),
  name: 'The Signature 2BHK Haven',
  floorPlanImage: 'https://placehold.co/500x350.png',
  floorPlanImageAiHint: 'modern 2bhk floorplan',
  specsHeading: '2BHK Specifications',
  specsCarpetArea: '1200 sq. ft.',
  specsBuiltUpArea: '1450 sq. ft.',
  specsBalconyArea: '150 sq. ft. Garden View Balcony',
  specsConfiguration: '2 Bedrooms, 2 Bathrooms, Living/Dining, Modern Kitchen, Utility Area',
  specsFeaturesTitle: 'Apartment Highlights:',
  specsFeaturesItems: [
    'Italian Marble Flooring in Living Area',
    'Premium Modular Kitchen with Quartz Countertop',
    'Designer Bathrooms with Rain Showers',
    'Smart Home Automation Ready',
    'Large French Windows for Ample Light',
  ],
};

const defaultFloorPlan2: FloorPlanItem = {
  id: nanoid(),
  name: 'The Grand 3BHK Vista',
  floorPlanImage: 'https://placehold.co/500x350.png',
  floorPlanImageAiHint: 'luxury 3bhk apartment',
  specsHeading: '3BHK Specifications',
  specsCarpetArea: '1800 sq. ft.',
  specsBuiltUpArea: '2200 sq. ft.',
  specsBalconyArea: '250 sq. ft. Panoramic View Balcony',
  specsConfiguration: '3 Bedrooms, 3 Bathrooms, Separate Living & Dining, Gourmet Kitchen, Store Room, Utility',
  specsFeaturesTitle: 'Exclusive Features:',
  specsFeaturesItems: [
    'Wooden Flooring in Master Bedroom',
    'Fully Equipped Kitchen with European Appliances',
    'Jacuzzi in Master Bathroom',
    'Private Elevator Lobby (Optional)',
    'VRV Air Conditioning',
  ],
};

const defaultFloorPlan3: FloorPlanItem = {
  id: nanoid(),
  name: 'The Compact Studio Suite',
  floorPlanImage: 'https://placehold.co/500x350.png',
  floorPlanImageAiHint: 'studio apartment layout',
  specsHeading: 'Studio Specifications',
  specsCarpetArea: '600 sq. ft.',
  specsBuiltUpArea: '750 sq. ft.',
  specsBalconyArea: '80 sq. ft. City View Balcony',
  specsConfiguration: '1 Large Studio Room with Kitchenette, 1 Bathroom',
  specsFeaturesTitle: 'Suite Perks:',
  specsFeaturesItems: [
    'Space-saving modular furniture included',
    'Efficient kitchenette design',
    'Walk-in closet',
    'High-speed internet pre-installed',
  ],
};

const defaultFloorPlan4: FloorPlanItem = {
  id: nanoid(),
  name: 'The Duplex Penthouse',
  floorPlanImage: 'https://placehold.co/500x350.png',
  floorPlanImageAiHint: 'duplex penthouse design',
  specsHeading: 'Penthouse Specifications',
  specsCarpetArea: '3500 sq. ft.',
  specsBuiltUpArea: '4200 sq. ft.',
  specsBalconyArea: '500 sq. ft. Terrace Garden',
  specsConfiguration: '4 Bedrooms, 5 Bathrooms, Double Height Living, Formal Dining, Study, Home Theatre, Servant Quarters',
  specsFeaturesTitle: 'Penthouse Exclusives:',
  specsFeaturesItems: [
    'Private Terrace Pool',
    'Imported Marble and Wood Finishes',
    'Dedicated Home Elevator',
    'Unobstructed 360° City Views',
    'Automated Blinds and Lighting',
  ],
};


export const defaultBrochureContent: BrochureContent = {
  meta: {
    brochureTitle: 'Brochure Forge - Enhanced Project',
  },
  page1: {
    builderLogoImage: 'https://placehold.co/180x70.png', // Slightly larger logo
    builderLogoImageAiHint: 'modern construction logo',
    logoTextLine1: 'Prime Properties Inc.',
    logoTextLine2: 'Crafting Your Future Spaces',
    tagline: 'Excellence in Every Brick',
    mainTitle: 'The Grand Vista Condominiums',
    subTitle: 'Experience Unmatched Urban Elegance',
    buildingImage: 'https://placehold.co/500x320.png', // Adjusted aspect ratio
    buildingImageAiHint: 'luxury apartment exterior',
    introHeading: 'Introducing The Grand Vista',
    introPara1:
      "Welcome to The Grand Vista, a beacon of modern architecture and luxurious living. Situated in the city's most sought-after district, The Grand Vista offers a unique blend of sophisticated design, state-of-the-art amenities, and breathtaking views. This is more than a home; it's a lifestyle statement.",
    introPara2:
      'Our vision was to create an urban sanctuary that caters to every need of its discerning residents. From meticulously designed interiors to expansive green spaces, every aspect of The Grand Vista has been thoughtfully curated to provide an unparalleled living experience. Prepare to be captivated.',
    developerHeading: 'About Prime Properties Inc.',
    developerPara:
      'Prime Properties Inc. has been a leader in real estate development for over 30 years, delivering iconic projects that redefine urban landscapes. Our commitment to quality, innovation, and customer satisfaction is unwavering, making us a trusted name in the industry.',
  },
  page2: {
    siteAddressHeading: 'Unbeatable Location & Connectivity',
    siteAddress:
      '123 Vista Avenue, Downtown Metropolis,\nSkyline City, ST 98765\nLandmark: Adjacent to Central Park & Financial District',
    locationMapImage: 'https://placehold.co/650x280.png', // Slightly wider map
    locationMapImageAiHint: 'detailed city map',
    connectivityHeading: 'Seamlessly Connected to Everything',
    connectivityMetroRailwayTitle: '🚉 Transit Hubs Nearby',
    connectivityMetroRailwayItems: [
      'City Central Metro - 5 min walk (500m)',
      'Downtown Express Line - 10 min walk (1km)',
      'Main Intercity Railway Terminal - 15 min drive (7km)',
      'International Airport - 30 min drive (25km)',
    ],
    connectivityMajorRoadsTitle: '🛣️ Easy Road Access',
    connectivityMajorRoadsItems: [
      'Main Street Expressway - 2 min drive',
      'Cross-City Tunnel - 5 min drive',
      'Coastal Highway Link - 10 min drive',
    ],
    connectivityHealthcareTitle: '🏥 Premier Healthcare',
    connectivityHealthcareItems: [
      'City General Hospital - 5 min drive',
      'Specialty Clinics Complex - 7 min drive',
      '24/7 Pharmacy - 2 min walk',
    ],
    connectivityEducationTitle: '🎓 Top Educational Institutions',
    connectivityEducationItems: [
      'Metropolis International School - 10 min drive',
      'Downtown University - 15 min drive',
      'City Public Library - 5 min walk',
    ],
  },
  page3: {
    amenitiesHeading: 'World-Class Lifestyle Amenities',
    amenities: [
      { id: nanoid(), icon: '🏊', text: 'Infinity Edge Pool', imageUrl: 'https://placehold.co/180x180.png', imageAiHint: 'luxury infinity pool' },
      { id: nanoid(), icon: '🏋️', text: 'Advanced Fitness Studio', imageUrl: 'https://placehold.co/180x180.png', imageAiHint: 'modern gym equipment' },
      { id: nanoid(), icon: '🌳', text: 'Landscaped Zen Garden', imageUrl: 'https://placehold.co/180x180.png', imageAiHint: 'serene japanese garden' },
      { id: nanoid(), icon: '🧒', text: 'Interactive Kids Play Area', imageUrl: 'https://placehold.co/180x180.png', imageAiHint: 'creative children playground' },
      { id: nanoid(), icon: '🎉', text: 'Sky Lounge & Party Deck', imageUrl: 'https://placehold.co/180x180.png', imageAiHint: 'rooftop event space' },
      { id: nanoid(), icon: '🎬', text: 'Private Mini Theatre', imageUrl: 'https://placehold.co/180x180.png', imageAiHint: 'home cinema room' },
      { id: nanoid(), icon: '📚', text: 'Business Center & Library', imageUrl: 'https://placehold.co/180x180.png', imageAiHint: 'modern co-working library' },
    ],
    masterPlanHeading: 'Intelligently Designed Master Site Plan',
    masterPlanImage: 'https://placehold.co/650x400.png', // Larger master plan
    masterPlanImageAiHint: 'architectural site plan development',
  },
  page4: { // Now refers to the section containing floor plans and contact/legal
    floorPlanHeading: 'Explore Our Exquisite Floor Plans',
    floorPlans: [
        defaultFloorPlan1,
        defaultFloorPlan2,
        defaultFloorPlan3,
        defaultFloorPlan4, // Added a 4th to demonstrate overflow
    ],
    // Contact and Legal info
    contactInfoHeading: 'Connect With Us Today',
    contactSalesOfficeTitle: '📞 Sales & Enquiries',
    contactSalesOfficePhone: '+1 (800) 555-0199',
    contactSalesOfficeEmail: 'sales@grandvista.example.com',
    contactSalesOfficeWebsite: 'www.grandvista.example.com',
    contactSiteOfficeTitle: '🏢 Project Site Office',
    contactSiteOfficeAddress: 'The Grand Vista Site, 123 Vista Avenue,\nDowntown Metropolis, Skyline City',
    contactSiteOfficeHours: 'Open Daily: 10:00 AM - 07:00 PM (By Appointment)',
    legalInfoHeading: 'Legal Disclosures & Information',
    legalReraNo: 'RERA REG. NO.: PRJ/ST/CY/12345/2025',
    legalReraLinkText: 'Verify on State RERA Portal: state.rera.gov.example',
  },
};
