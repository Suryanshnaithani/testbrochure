
import type { BrochureContent } from '@/types/brochure';
import { nanoid } from 'nanoid';

export const defaultBrochureContent: BrochureContent = {
  meta: {
    brochureTitle: 'My Project Brochure',
  },
  page1: {
    builderLogoImage: 'https://placehold.co/150x60.png', // Default placeholder for builder logo
    builderLogoImageAiHint: 'company logo generic',
    logoTextLine1: 'YOUR BRAND', // Fallback if no logo image
    logoTextLine2: 'TAGLINE HERE', // Fallback if no logo image
    tagline: 'Welcome to Excellence',
    mainTitle: 'Project Title Here',
    subTitle: 'Discover Your Dream Space',
    buildingImage: 'https://placehold.co/450x280.png',
    buildingImageAiHint: 'modern building exterior',
    introHeading: 'Introduction to Your Project',
    introPara1:
      'This is a brief introduction to the project. Highlight its key features and unique selling propositions. Keep it engaging and informative to capture the reader\'s interest from the very first page.',
    introPara2:
      'Describe the vision behind the project and what makes it special. Focus on the lifestyle, benefits, or opportunities it offers to potential clients or residents. Use clear and concise language.',
    developerHeading: 'About Us - The Developer',
    developerPara:
      'Provide a short paragraph about the developer or company behind the project. Mention experience, commitment to quality, and any notable achievements to build trust and credibility.',
  },
  page2: {
    siteAddressHeading: 'Prime Location Details',
    siteAddress:
      'Project Site Address,\nStreet Name, Area/Locality,\nCity, State, Postal Code\nLandmark: Near Prominent Landmark',
    locationMapImage: 'https://placehold.co/600x250.png',
    locationMapImageAiHint: 'city map location',
    connectivityHeading: 'Excellent Connectivity',
    connectivityMetroRailwayTitle: '🚉 Transport Hubs',
    connectivityMetroRailwayItems: [
      'Nearest Metro Station - Distance',
      'Main Railway Station - Distance',
      'Airport - Distance',
    ],
    connectivityMajorRoadsTitle: '🛣️ Road Network',
    connectivityMajorRoadsItems: [
      'Major Highway Access - Distance',
      'Expressway Connection - Distance',
      'City Center Access - Time',
    ],
    connectivityHealthcareTitle: '🏥 Healthcare Facilities',
    connectivityHealthcareItems: [
      'Multi-specialty Hospital - Distance', 
      'Local Clinic - Distance',
      'Pharmacy - Distance',
    ],
    connectivityEducationTitle: '🎓 Educational Institutions',
    connectivityEducationItems: [
      'Reputed School - Distance',
      'College/University - Distance',
      'Training Center - Distance',
    ],
  },
  page3: {
    amenitiesHeading: 'World-Class Amenities',
    amenities: [
      { id: nanoid(), icon: '🏊', text: 'Swimming Pool', imageUrl: 'https://placehold.co/64x64.png', imageAiHint: 'pool' },
      { id: nanoid(), icon: '🏋️', text: 'Gymnasium', imageUrl: 'https://placehold.co/64x64.png', imageAiHint: 'gym fitness' },
      { id: nanoid(), icon: '🌳', text: 'Landscaped Gardens', imageUrl: 'https://placehold.co/64x64.png', imageAiHint: 'garden park' },
      { id: nanoid(), icon: '🧒', text: 'Kids Play Area', imageUrl: 'https://placehold.co/64x64.png', imageAiHint: 'playground children' },
      { id: nanoid(), icon: '🏘️', text: 'Clubhouse', imageUrl: 'https://placehold.co/64x64.png', imageAiHint: 'clubhouse community' },
      { id: nanoid(), icon: '🚗', text: 'Ample Parking', imageUrl: 'https://placehold.co/64x64.png', imageAiHint: 'parking car' },
    ],
    masterPlanHeading: 'Thoughtfully Designed Master Plan',
    masterPlanImage: 'https://placehold.co/600x200.png',
    masterPlanImageAiHint: 'site layout architectural',
  },
  page4: {
    floorPlanHeading: 'Spacious & Elegant Floor Plans',
    floorPlanImage: 'https://placehold.co/300x250.png',
    floorPlanImageAiHint: 'apartment floorplan interior',
    specsHeading: 'Unit Specifications',
    specsCarpetArea: 'Define carpet area range',
    specsBuiltUpArea: 'Define built-up area range',
    specsBalconyArea: 'Details about balcony/deck',
    specsConfiguration: 'Types of units (e.g., 2BHK, 3BHK)',
    specsFeaturesTitle: 'Key Features & Finishes:',
    specsFeaturesItems: [
      'Feature 1 (e.g., Flooring type)',
      'Feature 2 (e.g., Kitchen details)',
      'Feature 3 (e.g., Bathroom fittings)',
      'Feature 4 (e.g., Smart home features)',
      'Feature 5 (e.g., Window type)',
    ],
    contactInfoHeading: 'Get In Touch',
    contactSalesOfficeTitle: '📞 Sales Inquiries',
    contactSalesOfficePhone: '+XX XXXXXXXXXX',
    contactSalesOfficeEmail: 'sales@example.com',
    contactSalesOfficeWebsite: 'www.example.com',
    contactSiteOfficeTitle: '🏢 Site Office Address',
    contactSiteOfficeAddress: 'Project Site Address,\nCity, State, Postal Code',
    contactSiteOfficeHours: 'Working Hours: Eg. 10 AM - 6 PM',
    legalInfoHeading: 'Legal & Compliance',
    legalReraNo: 'RERA Registration No. (if applicable)',
    legalReraLinkText: 'RERA Website Link (if applicable)',
  },
};
