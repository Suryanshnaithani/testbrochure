
import type { BrochureContent } from '@/types/brochure';
import Image from 'next/image';
import React from 'react';

interface BrochureTemplateRendererProps {
  content: BrochureContent;
  viewMode: 'portrait' | 'landscape';
}

const parseStyle = (styleString: string | undefined): React.CSSProperties => {
  if (!styleString) return {};
  const style: React.CSSProperties = {};
  styleString.split(';').forEach(declaration => {
    const [property, value] = declaration.split(':');
    if (property && value) {
      const camelCasedProperty = property.trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
      // @ts-ignore
      style[camelCasedProperty] = value.trim();
    }
  });
  return style;
};

const isPlaceholderImageSrc = (src: string | undefined | null): boolean => {
  return !!src && src.startsWith('https://placehold.co');
};

const isActualImageSrc = (src: string | undefined | null): boolean => {
    return !!src && (src.startsWith('data:image') || (src.startsWith('http') && !isPlaceholderImageSrc(src)));
}

// New Professional Placeholder Component
const ProfessionalPlaceholder: React.FC<{
  altText: string;
  aiHint?: string;
  className?: string; // For no-print or other container classes
  iconSize?: number;
  baseWidth?: string; // e.g. '150px'
  baseHeight?: string; // e.g. '100%' or a fixed value like '150px'
}> = ({ altText, aiHint, className, iconSize = 24, baseWidth = '100%', baseHeight = '100%' }) => {
  const placeholderText = aiHint || altText || "Image";
  return (
    <div
      className={className}
      style={{
        width: baseWidth,
        height: baseHeight,
        backgroundColor: '#f9fafb', // Tailwind gray-50
        border: '1px dashed #e5e7eb', // Tailwind gray-200
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#9ca3af', // Tailwind gray-400
        padding: '10px',
        boxSizing: 'border-box',
        overflow: 'hidden',
        textAlign: 'center',
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ marginBottom: '8px', opacity: 0.8 }}
      >
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
        <circle cx="9" cy="9" r="2" />
        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
      </svg>
      <p style={{ fontSize: '11px', margin: 0, lineHeight: '1.2', wordBreak: 'break-word' }}>
        {placeholderText}
      </p>
    </div>
  );
};


export const BrochureTemplateRenderer: React.FC<BrochureTemplateRendererProps> = ({ content, viewMode }) => {
  const { page1, page2, page3, page4 } = content;

  const pageBaseStyle: React.CSSProperties = {
    width: '210mm',
    minHeight: '297mm',
    height: '297mm',
    background: 'white',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: "'PT Sans', Arial, sans-serif",
    color: '#333',
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column',
  };

  const pageStylePortrait: React.CSSProperties = {
    ...pageBaseStyle,
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
    margin: '0 auto 30px auto',
  };

  const pageSpreadStyle: React.CSSProperties = {
    width: '420mm',
    height: '297mm',
    display: 'flex',
    flexDirection: 'row',
    boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
    background: 'white',
    overflow: 'hidden',
    flexShrink: 0,
    marginBottom: '30px',
  };

  const pageOnSpreadStyle: React.CSSProperties = {
    ...pageBaseStyle,
    margin: 0,
    boxShadow: 'none',
  };

  const getImagePrintClass = (imageSrc: string | undefined | null) => {
    return isPlaceholderImageSrc(imageSrc) ? 'no-print' : '';
  };


  const renderPage1Content = () => (
    <>
      <div style={parseStyle("display: flex; justify-content: space-between; align-items: center; padding: 20px 40px; background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); min-height: 80px; flex-shrink: 0;")}>
          <div style={{ width: '150px', height: '60px', position: 'relative' }}>
            {isActualImageSrc(page1.builderLogoImage) ? (
              <Image src={page1.builderLogoImage!} alt="Builder Logo" layout="fill" objectFit="contain" data-ai-hint={page1.builderLogoImageAiHint || 'company logo'} />
            ) : (page1.logoTextLine1 || page1.logoTextLine2) && !page1.builderLogoImage && !isPlaceholderImageSrc(page1.builderLogoImage) ? (
              <div>
                <div style={parseStyle("font-size: 24px; font-weight: bold; color: #1e40af; margin-bottom: 2px; font-family: 'Poppins', sans-serif;")}>{page1.logoTextLine1}</div>
                <div style={parseStyle("font-size: 10px; color: #1e40af; font-weight: 500;")}>{page1.logoTextLine2}</div>
              </div>
            ) : (
              <ProfessionalPlaceholder
                altText="Builder Logo"
                aiHint={page1.builderLogoImageAiHint}
                className={getImagePrintClass(page1.builderLogoImage)}
                baseWidth="150px"
                baseHeight="60px"
                iconSize={20}
              />
            )}
          </div>
          <div style={parseStyle("font-size: 20px; color: #f97316; font-weight: bold; font-family: 'Poppins', sans-serif; text-align: right;")}>{page1.tagline}</div>
      </div>

      <div style={parseStyle("text-align: center; padding: 30px 40px; flex-shrink: 0;")}>
          <h1 style={parseStyle("font-size: 64px; font-weight: bold; color: #1e40af; margin: 0 0 10px 0; letter-spacing: -1px; font-family: 'Poppins', sans-serif;")}>{page1.mainTitle}</h1>
          <p style={parseStyle("font-size: 18px; color: #64748b; margin: 0; letter-spacing: 3px; font-weight: 500;")}>{page1.subTitle}</p>
      </div>

      <div style={parseStyle("padding: 0 40px 30px 40px; text-align: center; flex-shrink: 0;")}>
        <div style={{ maxWidth: '450px', height: '280px', margin: '0 auto', position: 'relative', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 8px 25px rgba(0,0,0,0.05)' }}>
          {isActualImageSrc(page1.buildingImage) ? (
            <Image src={page1.buildingImage!} alt={page1.mainTitle || "Building"} layout="fill" objectFit="cover" data-ai-hint={page1.buildingImageAiHint || 'modern building'}/>
          ) : (
            <ProfessionalPlaceholder
              altText={page1.mainTitle || "Building Image"}
              aiHint={page1.buildingImageAiHint}
              className={getImagePrintClass(page1.buildingImage)}
              baseHeight="280px"
              iconSize={48}
            />
          )}
        </div>
      </div>
      
      <div style={parseStyle("padding: 0 40px 30px 40px; flex-grow: 1; display: flex; flex-direction: column; justify-content: center;")}>
            <div style={parseStyle("background: rgba(255,255,255,0.9); padding: 25px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.08);")}>
                <h3 style={parseStyle("font-size: 20px; font-weight: bold; color: #1e40af; margin: 0 0 15px 0; font-family: 'Poppins', sans-serif;")}>{page1.introHeading}</h3>
                <p style={parseStyle("font-size: 14px; color: #475569; line-height: 1.6; margin: 0 0 15px 0;")}>
                    {page1.introPara1}
                </p>
                <p style={parseStyle("font-size: 14px; color: #475569; line-height: 1.6; margin: 0;")}>
                    {page1.introPara2}
                </p>
            </div>
      </div>
      
      <div style={parseStyle("padding: 20px 40px; flex-shrink: 0;")}>
            <div style={parseStyle("background: #1e40af; color: white; padding: 20px; border-radius: 12px;")}>
                <h4 style={parseStyle("font-size: 16px; font-weight: bold; margin: 0 0 10px 0; font-family: 'Poppins', sans-serif;")}>{page1.developerHeading}</h4>
                <p style={parseStyle("font-size: 12px; line-height: 1.5; margin: 0;")}>
                    {page1.developerPara}
                </p>
            </div>
      </div>
    </>
  );

  const renderPage2Content = () => (
    <>
      <div style={parseStyle("background: #1e40af; color: white; padding: 20px 40px; text-align: center; flex-shrink: 0;")}>
          <h2 style={parseStyle("font-size: 28px; font-weight: bold; margin: 0; font-family: 'Poppins', sans-serif;")}>Location & Connectivity</h2>
          <p style={parseStyle("font-size: 14px; margin: 5px 0 0 0; opacity: 0.9;")}>Explore the Prime Location</p>
      </div>

      <div style={parseStyle("padding: 30px 40px; flex-shrink: 0;")}>
            <div style={parseStyle("background: rgba(255,255,255,0.9); padding: 25px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.08); margin-bottom: 25px;")}>
                <h3 style={parseStyle("font-size: 18px; font-weight: bold; color: #1e40af; margin: 0 0 15px 0; font-family: 'Poppins', sans-serif;")}>{page2.siteAddressHeading}</h3>
                <p style={parseStyle("font-size: 14px; color: #374151; line-height: 1.6; margin: 0; font-weight: 500; white-space: pre-line;")}>
                   {page2.siteAddress}
                </p>
            </div>

          <div style={parseStyle("background: rgba(255,255,255,0.9); padding: 25px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.08); margin-bottom: 25px;")}>
              <h3 style={parseStyle("font-size: 18px; font-weight: bold; color: #1e40af; margin: 0 0 20px 0; font-family: 'Poppins', sans-serif;")}>Location Map</h3>
              <div style={{ width: '100%', height: '250px', position: 'relative', borderRadius: '8px', overflow: 'hidden' }}>
                  {isActualImageSrc(page2.locationMapImage) ? (
                    <Image src={page2.locationMapImage!} alt="Location Map" layout="fill" objectFit="cover" data-ai-hint={page2.locationMapImageAiHint || 'city map'} />
                  ) : (
                    <ProfessionalPlaceholder
                        altText="Location Map"
                        aiHint={page2.locationMapImageAiHint}
                        className={getImagePrintClass(page2.locationMapImage)}
                        baseHeight="250px"
                        iconSize={40}
                    />
                  )}
              </div>
          </div>
      </div>
      
      <div style={parseStyle("padding: 0 40px 30px 40px; flex-grow: 1; display: flex; flex-direction: column; justify-content: flex-end;")}>
            <div style={parseStyle("background: rgba(255,255,255,0.9); padding: 25px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.08);")}>
                <h3 style={parseStyle("font-size: 18px; font-weight: bold; color: #1e40af; margin: 0 0 20px 0; font-family: 'Poppins', sans-serif;")}>{page2.connectivityHeading}</h3>
                <div style={parseStyle("display: grid; grid-template-columns: 1fr 1fr; gap: 20px;")}>
                    {[
                      { title: page2.connectivityMetroRailwayTitle, items: page2.connectivityMetroRailwayItems },
                      { title: page2.connectivityMajorRoadsTitle, items: page2.connectivityMajorRoadsItems },
                      { title: page2.connectivityHealthcareTitle, items: page2.connectivityHealthcareItems },
                      { title: page2.connectivityEducationTitle, items: page2.connectivityEducationItems },
                    ].map((section, idx) => (
                      (section.title || (Array.isArray(section.items) && section.items.some(item => item))) && (
                          <div key={idx}>
                              <h4 style={parseStyle("font-size: 14px; font-weight: bold; color: #1e40af; margin: 0 0 10px 0; font-family: 'Poppins', sans-serif;")}>{section.title}</h4>
                              {Array.isArray(section.items) && section.items.length > 0 && (
                                  <ul style={parseStyle("font-size: 12px; color: #475569; line-height: 1.6; margin: 0; padding-left: 15px;")}>
                                      {section.items.map((item, itemIdx) => item && <li key={itemIdx}>{item}</li>)}
                                  </ul>
                              )}
                          </div>
                      )
                    ))}
                </div>
            </div>
      </div>
    </>
  );

  const renderPage3Content = () => (
    <>
      <div style={parseStyle("background: #1e40af; color: white; padding: 20px 40px; text-align: center; flex-shrink: 0;")}>
          <h2 style={parseStyle("font-size: 28px; font-weight: bold; margin: 0; font-family: 'Poppins', sans-serif;")}>Amenities & Master Plan</h2>
          <p style={parseStyle("font-size: 14px; margin: 5px 0 0 0; opacity: 0.9;")}>Facilities for Modern Living</p>
      </div>

      <div style={parseStyle("padding: 30px 40px; box-sizing: border-box; flex-grow: 1; display: flex; flex-direction: column;")}>
        <div>
          <h3 style={parseStyle("font-size: 20px; font-weight: bold; color: #1e40af; margin: 0 0 20px 0; font-family: 'Poppins', sans-serif;")}>{page3.amenitiesHeading}</h3>
          {Array.isArray(page3.amenities) && page3.amenities.length > 0 && (
            <div style={parseStyle("display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 20px; margin-bottom: 30px;")}>
                {page3.amenities.map(amenity => {
                  const hasContent = amenity.icon || amenity.text || amenity.imageUrl;
                  if (!hasContent) return null;

                  return (
                    <div key={amenity.id} style={parseStyle("background: rgba(255,255,255,0.95); padding: 15px; border-radius: 10px; box-shadow: 0 3px 10px rgba(0,0,0,0.07); text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: flex-start; min-height: 150px;")}>
                        <div style={{ width: '70px', height: '70px', marginBottom: '10px', position: 'relative', overflow:'hidden', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {isActualImageSrc(amenity.imageUrl) ? (
                            <Image src={amenity.imageUrl!} alt={amenity.text || "Amenity"} layout="fill" style={{ objectFit: 'cover' }} data-ai-hint={amenity.imageAiHint || 'amenity icon'}/>
                          ) : amenity.icon && (!amenity.imageUrl || isPlaceholderImageSrc(amenity.imageUrl)) ? ( 
                            <span style={parseStyle("font-size: 42px;")}>{amenity.icon}</span>
                          ): (
                            <ProfessionalPlaceholder
                                altText={amenity.text || "Amenity"}
                                aiHint={amenity.imageAiHint}
                                className={getImagePrintClass(amenity.imageUrl)}
                                baseWidth="70px"
                                baseHeight="70px"
                                iconSize={28}
                            />
                          )}
                        </div>
                        <div style={parseStyle("font-size: 13px; font-weight: bold; color: #1e40af; line-height: 1.3;")}>{amenity.text || ''}</div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>

        <div style={{marginTop: 'auto', flexShrink: 0}}> {/* Pushes Master Plan to bottom if space allows, but allows natural flow */}
          <h3 style={parseStyle("font-size: 20px; font-weight: bold; color: #1e40af; margin: 30px 0 20px 0; font-family: 'Poppins', sans-serif;")}>{page3.masterPlanHeading}</h3>
          <div style={{ width: '100%', height: '350px', position: 'relative', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.08)' }}>
            {isActualImageSrc(page3.masterPlanImage) ? (
                <Image src={page3.masterPlanImage!} alt="Master Plan" layout="fill" objectFit="contain" data-ai-hint={page3.masterPlanImageAiHint || 'site layout'} />
            ) : (
              <ProfessionalPlaceholder
                  altText="Master Plan"
                  aiHint={page3.masterPlanImageAiHint}
                  className={getImagePrintClass(page3.masterPlanImage)}
                  baseHeight="350px"
                  iconSize={64}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );

  const renderPage4Content = () => (
    <>
        <div style={parseStyle("background: #1e40af; color: white; padding: 20px 40px; text-align: center; flex-shrink: 0;")}>
            <h2 style={parseStyle("font-size: 28px; font-weight: bold; margin: 0; font-family: 'Poppins', sans-serif;")}>Floor Plan & Contact</h2>
            <p style={parseStyle("font-size: 14px; margin: 5px 0 0 0; opacity: 0.9;")}>Detailed Layout and Information</p>
        </div>

        <div style={parseStyle("padding: 25px 40px; box-sizing: border-box; flex-grow: 1; display:flex; flex-direction: column;")}>
          <div> {/* Content wrapper for floor plan */}
            <h3 style={parseStyle("font-size: 20px; font-weight: bold; color: #1e40af; margin: 0 0 15px 0; font-family: 'Poppins', sans-serif;")}>{page4.floorPlanHeading}</h3>
            
            {(page4.floorPlanName || page4.floorPlanImage || isPlaceholderImageSrc(page4.floorPlanImage) || page4.specsHeading || (page4.specsFeaturesItems && Array.isArray(page4.specsFeaturesItems) && page4.specsFeaturesItems.length > 0)) && (
                <div style={parseStyle("display: flex; gap: 20px; margin-bottom: 20px; min-height: 280px; border-bottom: 1px solid #eee; padding-bottom: 20px;")}>
                    <div style={{ flex: 1.2, height: '280px', position: 'relative', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {isActualImageSrc(page4.floorPlanImage) ? (
                          <Image src={page4.floorPlanImage!} alt={page4.floorPlanName || `Floor Plan`} layout="fill" objectFit="contain" data-ai-hint={page4.floorPlanImageAiHint || 'floor plan'}/>
                        ) : (
                          <ProfessionalPlaceholder
                            altText={page4.floorPlanName || "Floor Plan"}
                            aiHint={page4.floorPlanImageAiHint}
                            className={getImagePrintClass(page4.floorPlanImage)}
                            baseHeight="280px"
                            baseWidth="100%"
                            iconSize={48}
                          />
                        )}
                    </div>

                    <div style={parseStyle("flex: 1;")}>
                        <div style={parseStyle("background: rgba(255,255,255,0.9); padding: 15px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.08); height: 280px; overflow-y: auto;")}>
                            <h4 style={parseStyle("font-size: 16px; font-weight: bold; color: #1e40af; margin: 0 0 10px 0; font-family: 'Poppins', sans-serif;")}>{page4.floorPlanName}</h4>
                            <h5 style={parseStyle("font-size: 14px; font-weight: bold; color: #1e40af; margin: 0 0 8px 0; font-family: 'Poppins', sans-serif;")}>{page4.specsHeading}</h5>

                            <div style={parseStyle("font-size: 12px; color: #475569; line-height: 1.5;")}>
                                <p style={parseStyle("margin: 0 0 8px 0;")}><strong className="font-semibold" style={{fontWeight: 600}}>Carpet Area:</strong> {page4.specsCarpetArea}</p>
                                <p style={parseStyle("margin: 0 0 8px 0;")}><strong className="font-semibold" style={{fontWeight: 600}}>Built-up Area:</strong> {page4.specsBuiltUpArea}</p>
                                <p style={parseStyle("margin: 0 0 8px 0;")}><strong className="font-semibold" style={{fontWeight: 600}}>Balcony:</strong> {page4.specsBalconyArea}</p>
                                <p style={parseStyle("margin: 0 0 12px 0;")}><strong className="font-semibold" style={{fontWeight: 600}}>Configuration:</strong> {page4.specsConfiguration}</p>

                                <h5 style={parseStyle("font-size: 13px; font-weight: bold; color: #1e40af; margin: 0 0 6px 0; font-family: 'Poppins', sans-serif;")}>{page4.specsFeaturesTitle}</h5>
                                {page4.specsFeaturesItems && Array.isArray(page4.specsFeaturesItems) && page4.specsFeaturesItems.length > 0 && (
                                  <ul style={parseStyle("margin: 0; padding-left: 15px; font-size: 11px;")}>
                                      {page4.specsFeaturesItems.map((item, idx) => item && <li key={idx} style={{marginBottom: '3px'}}>{item}</li>)}
                                  </ul>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
          </div>
          
          <div style={{marginTop: 'auto', flexShrink: 0}}> {/* Pushes contact & legal to bottom if space */}
            <div style={parseStyle("background: rgba(255,255,255,0.9); padding: 20px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.08); margin-bottom: 15px; margin-top: 20px;")}>
                <h3 style={parseStyle("font-size: 16px; font-weight: bold; color: #1e40af; margin: 0 0 15px 0; font-family: 'Poppins', sans-serif;")}>{page4.contactInfoHeading}</h3>
                <div style={parseStyle("display: grid; grid-template-columns: 1fr 1fr; gap: 20px;")}>
                    <div>
                        <h4 style={parseStyle("font-size: 13px; font-weight: bold; color: #1e40af; margin: 0 0 8px 0; font-family: 'Poppins', sans-serif;")}>{page4.contactSalesOfficeTitle}</h4>
                        <p style={parseStyle("font-size: 12px; color: #475569; line-height: 1.5; margin: 0; white-space: pre-line;")}>
                            Phone: {page4.contactSalesOfficePhone}<br/>
                            Email: {page4.contactSalesOfficeEmail}<br/>
                            Website: {page4.contactSalesOfficeWebsite}
                        </p>
                    </div>
                    <div>
                        <h4 style={parseStyle("font-size: 13px; font-weight: bold; color: #1e40af; margin: 0 0 8px 0; font-family: 'Poppins', sans-serif;")}>{page4.contactSiteOfficeTitle}</h4>
                        <p style={parseStyle("font-size: 12px; color: #475569; line-height: 1.5; margin: 0; white-space: pre-line;")}>
                            {page4.contactSiteOfficeAddress}<br/>
                            {page4.contactSiteOfficeHours}
                        </p>
                    </div>
                </div>
            </div>
            
            <div style={parseStyle("background: #1e40af; color: white; padding: 15px; border-radius: 12px; text-align: center;")}>
                <h4 style={parseStyle("font-size: 13px; font-weight: bold; margin: 0 0 8px 0; font-family: 'Poppins', sans-serif;")}>{page4.legalInfoHeading}</h4>
                <p style={parseStyle("font-size: 11px; margin: 0 0 6px 0;")}>RERA No.: {page4.legalReraNo}</p>
                <p style={parseStyle("font-size: 10px; margin: 0; opacity: 0.9;")}>{page4.legalReraLinkText}</p>
            </div>
          </div>
        </div>

        <div style={parseStyle("position: absolute; bottom: 0; left: 0; right: 0; background: #374151; color: white; padding: 10px 40px; text-align: center; flex-shrink: 0;")}>
            <p style={parseStyle("font-size: 9px; color: #d1d5db; line-height: 1.3; margin: 0;")}>
                Disclaimer: This brochure is for illustrative purposes only and does not constitute a legal offering.
                All specifications, plans, and images are indicative and subject to change by authorities or the developer without prior notice.
            </p>
        </div>
    </>
  );

  if (viewMode === 'landscape') {
    return (
      <div
        id="brochure-container"
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '30px',
          padding: '20px',
          alignItems: 'flex-start',
          overflowX: 'auto',
          width: 'max-content',
        }}
      >
        <div className="page-spread" style={pageSpreadStyle}>
          <div className="page" style={{...pageOnSpreadStyle, borderRight: '1px solid #e0e0e0'}}>
            {renderPage1Content()}
          </div>
          <div className="page" style={pageOnSpreadStyle}>
            {renderPage2Content()}
          </div>
        </div>

        <div className="page-spread" style={pageSpreadStyle}>
          <div className="page" style={{...pageOnSpreadStyle, borderRight: '1px solid #e0e0e0'}}>
            {renderPage3Content()}
          </div>
          <div className="page" style={pageOnSpreadStyle}>
            {renderPage4Content()}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      id="brochure-container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px 0',
      }}
    >
      <div className="page" style={pageStylePortrait}>
        {renderPage1Content()}
      </div>
      <div className="page" style={pageStylePortrait}>
        {renderPage2Content()}
      </div>
      <div className="page" style={pageStylePortrait}>
        {renderPage3Content()}
      </div>
      <div className="page" style={pageStylePortrait}>
        {renderPage4Content()}
      </div>
    </div>
  );
};

