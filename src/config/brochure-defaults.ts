
import type { BrochureContent } from '@/types/brochure';
import { nanoid } from 'nanoid';

export const defaultBrochureContent: BrochureContent = {
  meta: {
    brochureTitle: 'Brochure Forge - Sample Project',
  },
  page1: {
    builderLogoImage: 'https://placehold.co/150x60.png',
    builderLogoImageAiHint: 'modern construction logo',
    logoTextLine1: 'Prime Properties Inc.',
    logoTextLine2: 'Crafting Your Future Spaces',
    tagline: 'Excellence in Every Brick',
    mainTitle: 'The Grand Vista Condominiums',
    subTitle: 'Experience Unmatched Urban Elegance',
    buildingImage: 'https://placehold.co/450x280.png',
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
    locationMapImage: 'https://placehold.co/600x250.png',
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
    amenitiesHeading: 'Lifestyle Amenities at Your Doorstep',
    amenities: [
      { id: nanoid(), icon: '🏊', text: 'Olympic Size Pool', imageUrl: 'https://placehold.co/70x70.png', imageAiHint: 'swimming pool luxury' },
      { id: nanoid(), icon: '🏋️', text: 'State-of-the-Art Fitness Center', imageUrl: 'https://placehold.co/70x70.png', imageAiHint: 'modern gym' },
      { id: nanoid(), icon: '🌳', text: 'Serene Zen Garden & Yoga Deck', imageUrl: 'https://placehold.co/70x70.png', imageAiHint: 'peaceful garden' },
      { id: nanoid(), icon: '🧒', text: 'Adventure Kids Play Zone', imageUrl: 'https://placehold.co/70x70.png', imageAiHint: 'children playground' },
      { id: nanoid(), icon: '🎉', text: 'Elegant Clubhouse & Party Hall', imageUrl: 'https://placehold.co/70x70.png', imageAiHint: 'event clubhouse' },
      { id: nanoid(), icon: '🚗', text: 'Secure Multi-Level Parking', imageUrl: 'https://placehold.co/70x70.png', imageAiHint: 'underground parking' },
    ],
    masterPlanHeading: 'Intelligently Designed Master Plan',
    masterPlanImage: 'https://placehold.co/600x350.png',
    masterPlanImageAiHint: 'architectural site plan',
  },
  page4: {
    floorPlanHeading: 'Explore Our Exquisite Floor Plan', // Singular
    // Single Floor Plan Data
    floorPlanName: 'The Signature 3BHK Apartment',
    floorPlanImage: 'https://placehold.co/350x300.png',
    floorPlanImageAiHint: 'luxury apartment floorplan',
    specsHeading: 'Apartment Specifications Overview',
    specsCarpetArea: '1800 sq. ft.',
    specsBuiltUpArea: '2200 sq. ft.',
    specsBalconyArea: '250 sq. ft. View Balcony',
    specsConfiguration: '3 Bedrooms, 3 Bathrooms, Living, Dining, Modern Kitchen, Utility',
    specsFeaturesTitle: 'Key Apartment Features:',
    specsFeaturesItems: [
      'Premium Vitrified Tile Flooring',
      'Modular Kitchen with Chimney & Hob',
      'Designer Bathrooms with Branded Fittings',
      'Video Door Phone Security',
      'Provision for Split Air Conditioners',
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
