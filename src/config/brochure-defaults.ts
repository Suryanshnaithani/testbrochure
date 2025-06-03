
import type { BrochureContent } from '@/types/brochure';
import { nanoid } from 'nanoid';

export const defaultBrochureContent: BrochureContent = {
  meta: {
    brochureTitle: 'Insignia Towers Brochure',
  },
  page1: {
    logoTextLine1: 'INSIGNIA',
    logoTextLine2: 'T O W E R S',
    tagline: 'नमन Vihar',
    mainTitle: 'Insignia Towers',
    subTitle: 'Experience Luxurious Living at Naman Vihar',
    buildingImage: 'https://placehold.co/450x280.png',
    buildingImageAiHint: 'modern building highrise',
    introHeading: 'Welcome to Insignia Towers',
    introPara1:
      'Discover a new standard of urban living at Insignia Towers, located in the heart of Naman Vihar. Offering a blend of contemporary design, premium amenities, and unparalleled connectivity, Insignia Towers is where your dream home awaits.',
    introPara2:
      'Crafted with meticulous attention to detail, each residence at Insignia Towers provides spacious layouts, abundant natural light, and breathtaking views, ensuring a lifestyle of comfort and sophistication.',
    developerHeading: 'About the Developer',
    developerPara:
      'With a legacy of trust and excellence, we are committed to creating iconic landmarks that redefine urban landscapes. Our focus on quality, innovation, and customer-centricity drives us to deliver projects that exceed expectations and offer lasting value.',
  },
  page2: {
    siteAddressHeading: 'Prime Location: Naman Vihar',
    siteAddress:
      'Insignia Towers,\nPlot No. 123, Naman Vihar Sector 5,\nCityville, State 12345\nLandmark: Opposite City Central Park',
    locationMapImage: 'https://placehold.co/600x250.png',
    locationMapImageAiHint: 'city map generic',
    connectivityHeading: 'Unmatched Connectivity',
    connectivityMetroRailwayTitle: '🚉 Transport Hubs',
    connectivityMetroRailwayItems: [
      'Naman Vihar Metro - 500m',
      'City Railway Station - 3 km',
      'Interstate Bus Terminal - 2 km',
    ],
    connectivityMajorRoadsTitle: '🛣️ Arterial Roads',
    connectivityMajorRoadsItems: [
      'City Expressway - 1 km',
      'National Highway 42 - 2.5 km',
      'Ring Road Access - 1.5 km',
    ],
    connectivityHealthcareTitle: '🏥 Healthcare Nearby',
    connectivityHealthcareItems: [
      'Lifeline Hospital - 800m', 
      'WellCare Clinic - 1.2 km',
      'City Medical College - 2 km',
    ],
    connectivityEducationTitle: '🎓 Educational Institutions',
    connectivityEducationItems: [
      'City Public School - 1 km',
      'Knowledge University - 3.5 km',
      'Global Business School - 2.8 km',
    ],
  },
  page3: {
    amenitiesHeading: 'World-Class Amenities',
    amenities: [
      { id: nanoid(), icon: '🏊', text: 'Infinity Pool', imageUrl: 'https://placehold.co/64x64.png', imageAiHint: 'pool luxury' },
      { id: nanoid(), icon: '🏋️', text: 'Fitness Center', imageUrl: 'https://placehold.co/64x64.png', imageAiHint: 'gym modern' },
      { id: nanoid(), icon: '🌳', text: 'Sky Garden', imageUrl: 'https://placehold.co/64x64.png', imageAiHint: 'garden rooftop' },
      { id: nanoid(), icon: '🧒', text: 'Kids Play Zone', imageUrl: 'https://placehold.co/64x64.png', imageAiHint: 'playground kids' },
      { id: nanoid(), icon: '🏘️', text: 'Residents Lounge', imageUrl: 'https://placehold.co/64x64.png', imageAiHint: 'lounge modern' },
      { id: nanoid(), icon: '🚗', text: 'Valet Parking', imageUrl: 'https://placehold.co/64x64.png', imageAiHint: 'car parking valet' },
    ],
    masterPlanHeading: 'Thoughtfully Designed Master Plan',
    masterPlanImage: 'https://placehold.co/600x200.png',
    masterPlanImageAiHint: 'architectural layout site',
  },
  page4: {
    floorPlanHeading: 'Spacious & Elegant Floor Plans',
    floorPlanImage: 'https://placehold.co/300x250.png',
    floorPlanImageAiHint: 'apartment floorplan luxury',
    specsHeading: 'Unit Specifications',
    specsCarpetArea: 'Starting from 1200 sq. ft.',
    specsBuiltUpArea: 'Starting from 1500 sq. ft.',
    specsBalconyArea: 'Spacious private balconies',
    specsConfiguration: '2, 3 & 4 BHK Luxury Apartments',
    specsFeaturesTitle: 'Premium Finishes:',
    specsFeaturesItems: [
      'Italian Marble Flooring',
      'Modular Kitchen with Hob & Chimney',
      'Designer Bathrooms with Premium Fittings',
      'Smart Home Automation',
      'VRV Air Conditioning',
    ],
    contactInfoHeading: 'Connect With Us',
    contactSalesOfficeTitle: '📞 Sales Gallery',
    contactSalesOfficePhone: '+91 98765 43210',
    contactSalesOfficeEmail: 'sales@insigniatowers.com',
    contactSalesOfficeWebsite: 'www.insigniatowers.com',
    contactSiteOfficeTitle: '🏢 Site Office',
    contactSiteOfficeAddress: 'Insignia Towers, Naman Vihar,\nCityville, State 12345',
    contactSiteOfficeHours: 'Open Daily: 10 AM - 7 PM',
    legalInfoHeading: 'Legal Information',
    legalReraNo: 'UPRERAPRJ000000 (Example)',
    legalReraLinkText: 'Visit UPRERA official website for details',
  },
};
