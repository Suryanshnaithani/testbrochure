
import type { BrochureContent } from '@/types/brochure';
import { nanoid } from 'nanoid';

export const defaultBrochureContent: BrochureContent = {
  meta: {
    brochureTitle: 'Generic Brochure Title',
  },
  page1: {
    logoTextLine1: 'LOGO',
    logoTextLine2: 'Your Company Tagline',
    tagline: 'Project Slogan',
    mainTitle: 'Project Title',
    subTitle: 'Elegant 1, 2 & 3 BHK Homes',
    buildingImage: 'https://placehold.co/450x280.png',
    buildingImageAiHint: 'building modern',
    introHeading: 'About the Project',
    introPara1:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    introPara2:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    developerHeading: 'About the Developer',
    developerPara:
      'We are committed to creating exceptional living spaces with a focus on quality, innovation, and customer satisfaction. Our projects are designed to offer a superior lifestyle and lasting value.',
  },
  page2: {
    siteAddressHeading: 'Site Address',
    siteAddress:
      '123 Placeholder Street,\nProject City, State, ZIPCODE\nLandmark: Near Famous Landmark',
    locationMapImage: 'https://placehold.co/600x250.png',
    locationMapImageAiHint: 'map generic',
    connectivityHeading: 'Key Distances & Connectivity',
    connectivityMetroRailwayTitle: '🚉 Transport Links',
    connectivityMetroRailwayItems: [
      'Metro Station - 1 km',
      'Railway Station - 5 km',
      'Bus Terminal - 500 m',
    ],
    connectivityMajorRoadsTitle: '🛣️ Major Roads',
    connectivityMajorRoadsItems: [
      'National Highway - 2 km',
      'Expressway Access - 3 km',
      'City Ring Road - 4 km',
    ],
    connectivityHealthcareTitle: '🏥 Healthcare Facilities',
    connectivityHealthcareItems: ['General Hospital - 1.5 km', 'Multi-specialty Clinic - 2 km'],
    connectivityEducationTitle: '🎓 Educational Institutions',
    connectivityEducationItems: [
      'Reputed School - 1 km',
      'College/University - 3 km',
    ],
  },
  page3: {
    amenitiesHeading: 'Project Amenities',
    amenities: [
      { id: nanoid(), icon: '🏊', text: 'Swimming Pool' },
      { id: nanoid(), icon: '🏋️', text: 'Gymnasium' },
      { id: nanoid(), icon: '🌳', text: 'Landscaped Garden' },
      { id: nanoid(), icon: '🧒', text: "Children's Play Area" },
      { id: nanoid(), icon: '🏘️', text: 'Clubhouse' },
      { id: nanoid(), icon: '🚗', text: 'Covered Parking' },
    ],
    masterPlanHeading: 'Master Layout Plan',
    masterPlanImage: 'https://placehold.co/600x200.png',
    masterPlanImageAiHint: 'layout sketch',
  },
  page4: {
    floorPlanHeading: 'Typical Unit Floor Plan',
    floorPlanImage: 'https://placehold.co/300x250.png',
    floorPlanImageAiHint: 'floorplan residential',
    specsHeading: 'Unit Specifications',
    specsCarpetArea: 'Approx. XXX sq. ft.',
    specsBuiltUpArea: 'Approx. YYY sq. ft.',
    specsBalconyArea: 'Approx. ZZZ sq. ft.',
    specsConfiguration: 'X BHK Apartment',
    specsFeaturesTitle: 'Key Features:',
    specsFeaturesItems: [
      'High-quality flooring',
      'Premium sanitary fittings',
      'Spacious living areas',
      'Modern kitchen layout',
      'Ample natural light',
    ],
    contactInfoHeading: 'Get In Touch',
    contactSalesOfficeTitle: '📞 Sales Inquiries',
    contactSalesOfficePhone: '+1 (234) 567-8900',
    contactSalesOfficeEmail: 'sales@exampleproject.com',
    contactSalesOfficeWebsite: 'www.exampleproject.com',
    contactSiteOfficeTitle: '🏢 Site Office',
    contactSiteOfficeAddress: 'Project Site Location,\nPlaceholder City, State',
    contactSiteOfficeHours: 'Open: Mon - Sat, 10 AM - 6 PM',
    legalInfoHeading: 'Legal & Disclaimers',
    legalReraNo: 'RERA0000000000 (If applicable)',
    legalReraLinkText: 'Details available at official.rera.portal.gov',
  },
};
