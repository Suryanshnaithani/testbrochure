
export interface AmenityItem {
  id: string;
  icon: string; // Emoji or SVG string
  text: string;
  imageUrl?: string; // data URI or URL for amenity image
  imageAiHint?: string; // AI hint for amenity image
}

// FloorPlanItem is removed as we revert to a single floor plan structure on page4

export interface BrochureContent {
  meta: {
    brochureTitle: string;
  };
  page1: {
    builderLogoImage?: string; // data URI or URL
    builderLogoImageAiHint?: string;
    logoTextLine1: string;
    logoTextLine2: string;
    tagline: string;
    mainTitle: string;
    subTitle: string;
    buildingImage?: string; // data URI or URL
    buildingImageAiHint?: string;
    introHeading: string;
    introPara1: string;
    introPara2: string;
    developerHeading: string;
    developerPara: string;
  };
  page2: {
    siteAddressHeading: string;
    siteAddress: string;
    locationMapImage?: string; // data URI or URL
    locationMapImageAiHint?: string;
    connectivityHeading: string;
    connectivityMetroRailwayTitle: string;
    connectivityMetroRailwayItems: string[];
    connectivityMajorRoadsTitle: string;
    connectivityMajorRoadsItems: string[];
    connectivityHealthcareTitle: string;
    connectivityHealthcareItems: string[];
    connectivityEducationTitle: string;
    connectivityEducationItems: string[];
  };
  page3: {
    amenitiesHeading: string;
    amenities: AmenityItem[];
    masterPlanHeading: string;
    masterPlanImage?: string; // data URI or URL
    masterPlanImageAiHint?: string;
  };
  page4: {
    floorPlanHeading: string;
    // Single floor plan details directly on page4
    floorPlanName: string; // Added for clarity, previously might have been implicit
    floorPlanImage?: string; // data URI or URL
    floorPlanImageAiHint?: string;
    specsHeading: string;
    specsCarpetArea: string;
    specsBuiltUpArea: string;
    specsBalconyArea: string;
    specsConfiguration: string;
    specsFeaturesTitle: string;
    specsFeaturesItems: string[];
    // Contact and Legal info remain
    contactInfoHeading: string;
    contactSalesOfficeTitle: string;
    contactSalesOfficePhone: string;
    contactSalesOfficeEmail: string;
    contactSalesOfficeWebsite: string;
    contactSiteOfficeTitle: string;
    contactSiteOfficeAddress: string;
    contactSiteOfficeHours: string;
    legalInfoHeading: string;
    legalReraNo: string;
    legalReraLinkText: string;
  };
}
