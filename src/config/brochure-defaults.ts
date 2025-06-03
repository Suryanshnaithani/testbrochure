import type { BrochureContent } from '@/types/brochure';
import { nanoid } from 'nanoid'; // You might need to install nanoid: npm install nanoid

export const defaultBrochureContent: BrochureContent = {
  meta: {
    brochureTitle: 'Insignia Complete Brochure',
  },
  page1: {
    logoTextLine1: 'HKAB',
    logoTextLine2: 'HOME KEYED TO ASPIRE BEYOND',
    tagline: 'नमन',
    mainTitle: 'Insignia',
    subTitle: '1 BHK BALCONY HOME',
    buildingImage: 'https://placehold.co/450x280.png',
    buildingImageAiHint: 'building modern',
    introHeading: 'Welcome to Insignia',
    introPara1:
      'Discover the perfect blend of luxury and comfort at Insignia, where every detail is crafted to elevate your lifestyle. Our thoughtfully designed 1 BHK homes with balconies offer you the space to dream, grow, and create lasting memories.',
    introPara2:
      'Located in the heart of Pushpak Nagar, Navi Mumbai, Insignia represents the pinnacle of modern living with world-class amenities and unparalleled connectivity.',
    developerHeading: 'About HKAB Developers',
    developerPara:
      'With years of excellence in real estate development, HKAB Developers has been creating homes that inspire and spaces that matter. Our commitment to quality, innovation, and customer satisfaction makes us a trusted name in the industry.',
  },
  page2: {
    siteAddressHeading: 'Site Address',
    siteAddress:
      'PROPOSED COMM. / RESI. BUILDING\nPLOT NO. 181 + 182, SECTOR-03,\n(22.5% SCHEME) PUSHPAKNAGAR,\nNAVI MUMBAI - 410210',
    locationMapImage: 'https://placehold.co/600x250.png',
    locationMapImageAiHint: 'map city',
    connectivityHeading: 'Excellent Connectivity',
    connectivityMetroRailwayTitle: '🚇 Metro & Railway',
    connectivityMetroRailwayItems: [
      'Kharghar Railway Station - 5 km',
      'Panvel Railway Station - 8 km',
      'Proposed Metro Line - 2 km',
    ],
    connectivityMajorRoadsTitle: '🛣️ Major Roads',
    connectivityMajorRoadsItems: [
      'Mumbai-Pune Highway - 6 km',
      'Sion-Panvel Highway - 4 km',
      'Palm Beach Road - 7 km',
    ],
    connectivityHealthcareTitle: '🏥 Healthcare',
    connectivityHealthcareItems: ['Apollo Hospital - 6 km', 'MGM Hospital - 5 km', 'Local Clinics - 1 km'],
    connectivityEducationTitle: '🎓 Education',
    connectivityEducationItems: [
      'DY Patil University - 4 km',
      'International Schools - 3 km',
      'Local Schools - 500 m',
    ],
  },
  page3: {
    amenitiesHeading: 'Premium Amenities',
    amenities: [
      { id: nanoid(), icon: '🏊', text: 'Swimming Pool' },
      { id: nanoid(), icon: '💪', text: 'Fitness Center' },
      { id: nanoid(), icon: '🌳', text: 'Landscaped Gardens' },
      { id: nanoid(), icon: '🎮', text: "Children's Play Area" },
      { id: nanoid(), icon: '🏛️', text: 'Clubhouse' },
      { id: nanoid(), icon: '🚗', text: 'Covered Parking' },
      { id: nanoid(), icon: '🔒', text: '24/7 Security' },
      { id: nanoid(), icon: '⚡', text: 'Power Backup' },
      { id: nanoid(), icon: '💧', text: 'Water Supply' },
    ],
    masterPlanHeading: 'Master Plan',
    masterPlanImage: 'https://placehold.co/600x200.png',
    masterPlanImageAiHint: 'architectural plan',
  },
  page4: {
    floorPlanHeading: '1 BHK Floor Plan',
    floorPlanImage: 'https://placehold.co/300x250.png',
    floorPlanImageAiHint: 'floor plan apartment',
    specsHeading: 'Specifications',
    specsCarpetArea: '450 sq ft',
    specsBuiltUpArea: '580 sq ft',
    specsBalconyArea: '80 sq ft',
    specsConfiguration: '1 BHK + Balcony',
    specsFeaturesTitle: 'Features:',
    specsFeaturesItems: [
      'Spacious bedroom with attached balcony',
      'Modern modular kitchen',
      'Premium bathroom fittings',
      'Ample natural light & ventilation',
      'Optimized space utilization',
    ],
    contactInfoHeading: 'Contact Information',
    contactSalesOfficeTitle: '📞 Sales Office',
    contactSalesOfficePhone: '+91 77770 22222',
    contactSalesOfficeEmail: 'sales@insigniakharghar.com',
    contactSalesOfficeWebsite: 'www.insigniakharghar.com',
    contactSiteOfficeTitle: '🏢 Site Office',
    contactSiteOfficeAddress: 'Plot No. 181 + 182, Sector-03\nPushpak Nagar, Navi Mumbai',
    contactSiteOfficeHours: 'Open: 10 AM - 7 PM (All Days)',
    legalInfoHeading: 'Legal Information',
    legalReraNo: 'P52000051000',
    legalReraLinkText: 'Available at maharera.mahaonline.gov.in',
  },
};
