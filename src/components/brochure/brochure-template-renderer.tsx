
import type { BrochureContent, AmenityItem, FloorPlanItem } from '@/types/brochure';
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

const ProfessionalPlaceholder: React.FC<{
  altText: string;
  aiHint?: string;
  className?: string;
  iconSize?: number;
  baseWidth?: string;
  baseHeight?: string;
}> = ({ altText, aiHint, className, iconSize = 24, baseWidth = '100%', baseHeight = '100%' }) => {
  const placeholderText = aiHint || altText || "Image";
  return (
    <div
      className={className}
      style={{
        width: baseWidth,
        height: baseHeight,
        backgroundColor: '#f9fafb', // Light gray background
        border: '1px dashed #e5e7eb', // Dashed border
        borderRadius: '8px', // Rounded corners
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#9ca3af', // Muted text color
        padding: '10px', // Padding
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

const MAX_AMENITIES_ON_PAGE3_WITH_MASTERPLAN = 4; 
const MAX_AMENITIES_ON_PAGE3_WITHOUT_MASTERPLAN = 8; 
const FLOORPLANS_PER_PAGE = 3;

const UniversalDisclaimer: React.FC = () => (
  <div style={parseStyle("position: absolute; bottom: 0; left: 0; right: 0; background: #374151; color: white; padding: 10px 40px; text-align: center; font-size: 9px; line-height: 1.3; z-index: 10;")}>
    Disclaimer: This brochure is for illustrative purposes only and does not constitute a legal offering. All specifications, plans, and images are indicative and subject to change by authorities or the developer without prior notice.
  </div>
);

const ContactAndLegalInfo: React.FC<{ pageData: BrochureContent['page4'] }> = ({ pageData }) => (
  <div style={{paddingTop: '20px', flexShrink: 0}}> {/* Ensure this section doesn't cause overflow if page is full */}
      <div style={parseStyle("background: rgba(255,255,255,0.9); padding: 20px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.08); margin-bottom: 15px;")}>
          <h3 style={parseStyle("font-size: 16px; font-weight: bold; color: #1e40af; margin: 0 0 15px 0; font-family: 'Poppins', sans-serif;")}>{pageData.contactInfoHeading}</h3>
          <div style={parseStyle("display: grid; grid-template-columns: 1fr 1fr; gap: 20px;")}>
              <div>
                  <h4 style={parseStyle("font-size: 13px; font-weight: bold; color: #1e40af; margin: 0 0 8px 0; font-family: 'Poppins', sans-serif;")}>{pageData.contactSalesOfficeTitle}</h4>
                  <p style={parseStyle("font-size: 12px; color: #475569; line-height: 1.5; margin: 0; white-space: pre-line;")}>
                      Phone: {pageData.contactSalesOfficePhone || 'N/A'}<br/>
                      Email: {pageData.contactSalesOfficeEmail || 'N/A'}<br/>
                      Website: {pageData.contactSalesOfficeWebsite || 'N/A'}
                  </p>
              </div>
              <div>
                  <h4 style={parseStyle("font-size: 13px; font-weight: bold; color: #1e40af; margin: 0 0 8px 0; font-family: 'Poppins', sans-serif;")}>{pageData.contactSiteOfficeTitle}</h4>
                  <p style={parseStyle("font-size: 12px; color: #475569; line-height: 1.5; margin: 0; white-space: pre-line;")}>
                      {pageData.contactSiteOfficeAddress || 'N/A'}<br/>
                      {pageData.contactSiteOfficeHours || 'N/A'}
                  </p>
              </div>
          </div>
      </div>
      <div style={parseStyle("background: #1e40af; color: white; padding: 15px; border-radius: 12px; text-align: center;")}>
          <h4 style={parseStyle("font-size: 13px; font-weight: bold; margin: 0 0 8px 0; font-family: 'Poppins', sans-serif;")}>{pageData.legalInfoHeading}</h4>
          <p style={parseStyle("font-size: 11px; margin: 0 0 6px 0;")}>RERA No.: {pageData.legalReraNo || 'N/A'}</p>
          <p style={parseStyle("font-size: 10px; margin: 0; opacity: 0.9;")}>{pageData.legalReraLinkText || 'N/A'}</p>
      </div>
  </div>
);


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
    boxSizing: 'border-box',
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
          <div style={{ width: '180px', height: '70px', position: 'relative' }}>
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
                baseWidth="180px"
                baseHeight="70px"
                iconSize={24}
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
        <div style={{ maxWidth: '500px', height: '320px', margin: '0 auto', position: 'relative', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 8px 25px rgba(0,0,0,0.05)' }}>
          {isActualImageSrc(page1.buildingImage) ? (
            <Image src={page1.buildingImage!} alt={page1.mainTitle || "Building"} layout="fill" objectFit="cover" data-ai-hint={page1.buildingImageAiHint || 'modern building'}/>
          ) : (
            <ProfessionalPlaceholder
              altText={page1.mainTitle || "Building Image"}
              aiHint={page1.buildingImageAiHint}
              className={getImagePrintClass(page1.buildingImage)}
              baseHeight="320px"
              iconSize={54}
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
          <h2 style={parseStyle("font-size: 28px; font-weight: bold; margin: 0; font-family: 'Poppins', sans-serif;")}>Location &amp; Connectivity</h2>
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
              <div style={{ width: '100%', height: '280px', position: 'relative', borderRadius: '8px', overflow: 'hidden' }}>
                  {isActualImageSrc(page2.locationMapImage) ? (
                    <Image src={page2.locationMapImage!} alt="Location Map" layout="fill" objectFit="cover" data-ai-hint={page2.locationMapImageAiHint || 'city map'} />
                  ) : (
                    <ProfessionalPlaceholder
                        altText="Location Map"
                        aiHint={page2.locationMapImageAiHint}
                        className={getImagePrintClass(page2.locationMapImage)}
                        baseHeight="280px"
                        iconSize={48}
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

  const renderAmenityItem = (amenity: AmenityItem, itemCount: number) => {
    let itemStyle: React.CSSProperties = {
      background: "rgba(255,255,255,0.95)",
      padding: "15px",
      borderRadius: "10px",
      boxShadow: "0 3px 10px rgba(0,0,0,0.07)",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start", 
      minHeight: "220px", 
    };

    let imageContainerSize = '180px'; 

    if (itemCount === 1) { 
      itemStyle.gridColumn = 'span 2'; 
      imageContainerSize = '250px';
    } else if (itemCount === 2) {
       imageContainerSize = '200px';
    } else if (itemCount === 3) {
       imageContainerSize = '180px';
    }


    const hasContent = amenity.icon || amenity.text || amenity.imageUrl;
    if (!hasContent) return null;

    return (
      <div key={amenity.id} style={itemStyle}>
        <div style={{ width: imageContainerSize, height: imageContainerSize, marginBottom: '12px', position: 'relative', overflow:'hidden', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {isActualImageSrc(amenity.imageUrl) ? (
            <Image src={amenity.imageUrl!} alt={amenity.text || "Amenity"} layout="fill" style={{ objectFit: 'cover' }} data-ai-hint={amenity.imageAiHint || 'amenity icon'}/>
          ) : amenity.icon && (!amenity.imageUrl || isPlaceholderImageSrc(amenity.imageUrl)) ? (
            <span style={parseStyle("font-size: 70px;")}>{amenity.icon}</span>
          ): (
            <ProfessionalPlaceholder
                altText={amenity.text || "Amenity"}
                aiHint={amenity.imageAiHint}
                className={getImagePrintClass(amenity.imageUrl)}
                baseWidth={imageContainerSize}
                baseHeight={imageContainerSize}
                iconSize={Math.max(24, parseInt(imageContainerSize)/3.5)} 
            />
          )}
        </div>
        <div style={parseStyle("font-size: 14px; font-weight: bold; color: #1e40af; line-height: 1.4;")}>{amenity.text || ''}</div>
      </div>
    );
  };
  
  const renderPage3Content = (amenitiesToDisplay: AmenityItem[], showMasterPlanOnThisPage: boolean, isOverallLastPage: boolean, noFloorPlans: boolean) => (
    <>
      <div style={parseStyle("background: #1e40af; color: white; padding: 20px 40px; text-align: center; flex-shrink: 0;")}>
          <h2 style={parseStyle("font-size: 28px; font-weight: bold; margin: 0; font-family: 'Poppins', sans-serif;")}>Amenities {showMasterPlanOnThisPage && page3.masterPlanHeading ? "&amp; Master Plan" : ""}</h2>
          <p style={parseStyle("font-size: 14px; margin: 5px 0 0 0; opacity: 0.9;")}>Facilities for Modern Living</p>
      </div>

      <div style={parseStyle("padding: 30px 40px; box-sizing: border-box; flex-grow: 1; display: flex; flex-direction: column; justify-content: space-between;")}>
        <div> {/* Wrapper for amenities and master plan to allow contact info to be at bottom */}
          {page3.amenitiesHeading && <h3 style={parseStyle("font-size: 20px; font-weight: bold; color: #1e40af; margin: 0 0 20px 0; font-family: 'Poppins', sans-serif;")}>{page3.amenitiesHeading}</h3>}
          {Array.isArray(amenitiesToDisplay) && amenitiesToDisplay.length > 0 && (
            <div style={parseStyle(`display: grid; grid-template-columns: repeat(auto-fill, minmax(${amenitiesToDisplay.length <= 2 ? '300px' : '200px'}, 1fr)); gap: 25px; margin-bottom: 30px;`)}>
                {amenitiesToDisplay.map(amenity => renderAmenityItem(amenity, amenitiesToDisplay.length))}
            </div>
          )}

          {showMasterPlanOnThisPage && page3.masterPlanHeading && (
              <div style={{ flexShrink: 0 }}> 
              <h3 style={parseStyle("font-size: 20px; font-weight: bold; color: #1e40af; margin: 30px 0 20px 0; font-family: 'Poppins', sans-serif;")}>{page3.masterPlanHeading}</h3>
              <div style={{ width: '100%', maxHeight: '380px', minHeight: '200px', height: 'auto', position: 'relative', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {isActualImageSrc(page3.masterPlanImage) ? (
                      <Image src={page3.masterPlanImage!} alt="Master Plan" layout="fill" objectFit="contain" data-ai-hint={page3.masterPlanImageAiHint || 'site layout'} />
                  ) : (
                  <ProfessionalPlaceholder
                      altText="Master Plan"
                      aiHint={page3.masterPlanImageAiHint}
                      className={getImagePrintClass(page3.masterPlanImage)}
                      baseWidth="100%" 
                      baseHeight="100%" 
                      iconSize={70}
                  />
                  )}
              </div>
              </div>
          )}
        </div>
        {isOverallLastPage && noFloorPlans && <ContactAndLegalInfo pageData={page4} />}
      </div>
    </>
  );

  const renderOverflowPageContent = (overflowAmenities: AmenityItem[], showMasterPlanOnThisPage: boolean, isOverallLastPage: boolean, noFloorPlans: boolean) => (
    <>
      <div style={parseStyle("background: #1e40af; color: white; padding: 20px 40px; text-align: center; flex-shrink: 0;")}>
          <h2 style={parseStyle("font-size: 28px; font-weight: bold; margin: 0; font-family: 'Poppins', sans-serif;")}>More Amenities {showMasterPlanOnThisPage && page3.masterPlanHeading ? "&amp; Master Plan" : ""}</h2>
          <p style={parseStyle("font-size: 14px; margin: 5px 0 0 0; opacity: 0.9;")}>Continued</p>
      </div>
       <div style={parseStyle("padding: 30px 40px; box-sizing: border-box; flex-grow: 1; display: flex; flex-direction: column; justify-content: space-between;")}>
        <div> {/* Wrapper for amenities and master plan */}
          {Array.isArray(overflowAmenities) && overflowAmenities.length > 0 && (
              <div>
                  <h3 style={parseStyle("font-size: 20px; font-weight: bold; color: #1e40af; margin: 0 0 20px 0; font-family: 'Poppins', sans-serif;")}>Additional Amenities</h3>
                  <div style={parseStyle(`display: grid; grid-template-columns: repeat(auto-fill, minmax(${overflowAmenities.length <= 2 ? '300px' : '200px'}, 1fr)); gap: 25px; margin-bottom: 30px;`)}>
                      {overflowAmenities.map(amenity => renderAmenityItem(amenity, overflowAmenities.length))}
                  </div>
              </div>
          )}
          {showMasterPlanOnThisPage && page3.masterPlanHeading && (
              <div style={{ flexShrink: 0 }}>
                  <h3 style={parseStyle("font-size: 20px; font-weight: bold; color: #1e40af; margin: 30px 0 20px 0; font-family: 'Poppins', sans-serif;")}>{page3.masterPlanHeading}</h3>
                  <div style={{ width: '100%', maxHeight: '380px', minHeight: '200px', height: 'auto', position: 'relative', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {isActualImageSrc(page3.masterPlanImage) ? (
                      <Image src={page3.masterPlanImage!} alt="Master Plan" layout="fill" objectFit="contain" data-ai-hint={page3.masterPlanImageAiHint || 'site layout'} />
                  ) : (
                      <ProfessionalPlaceholder
                          altText="Master Plan"
                          aiHint={page3.masterPlanImageAiHint}
                          className={getImagePrintClass(page3.masterPlanImage)}
                          baseWidth="100%"
                          baseHeight="100%"
                          iconSize={70}
                      />
                  )}
                  </div>
              </div>
          )}
        </div>
        {isOverallLastPage && noFloorPlans && <ContactAndLegalInfo pageData={page4} />}
      </div>
    </>
  );

  const renderFloorPlanPageContent = (floorPlansToShow: FloorPlanItem[], isLastFloorPlanPageChunk: boolean) => (
    <>
      <div style={parseStyle("background: #1e40af; color: white; padding: 20px 40px; text-align: center; flex-shrink: 0;")}>
          <h2 style={parseStyle("font-size: 28px; font-weight: bold; margin: 0; font-family: 'Poppins', sans-serif;")}>{page4.floorPlanHeading || "Floor Plans"}</h2>
          {page4.floorPlanHeading && <p style={parseStyle("font-size: 14px; margin: 5px 0 0 0; opacity: 0.9;")}>Detailed Unit Layouts</p>}
      </div>

      <div style={parseStyle("padding: 25px 40px; box-sizing: border-box; flex-grow: 1; display:flex; flex-direction: column; justify-content: space-between;")}>
        <div> {/* Wrapper for floor plans */}
          {floorPlansToShow.map((fp, index) => (
              <div key={fp.id} style={parseStyle(`display: flex; flex-direction: column; gap: 15px; margin-bottom: ${index === floorPlansToShow.length -1 && !isLastFloorPlanPageChunk ? '25px' : '0px'}; padding-bottom: ${index === floorPlansToShow.length -1 && !isLastFloorPlanPageChunk ? '25px' : '0px'}; border-bottom: ${index === floorPlansToShow.length -1 && !isLastFloorPlanPageChunk ? '1px solid #eee' : 'none'}; flex-grow:1; justify-content: space-between; min-height: ${100 / Math.min(floorPlansToShow.length, FLOORPLANS_PER_PAGE) - (floorPlansToShow.length > 1 ? 5 : 0)}%;`)}>
                  <div style={parseStyle("display: flex; gap: 25px; flex-grow: 1;")}>
                      <div style={{ flex: 1.3, minHeight: '300px', position: 'relative', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {isActualImageSrc(fp.floorPlanImage) ? (
                          <Image src={fp.floorPlanImage!} alt={fp.name || `Floor Plan`} layout="fill" objectFit="contain" data-ai-hint={fp.floorPlanImageAiHint || 'floor plan design'}/>
                          ) : (
                          <ProfessionalPlaceholder
                              altText={fp.name || "Floor Plan"}
                              aiHint={fp.floorPlanImageAiHint}
                              className={getImagePrintClass(fp.floorPlanImage)}
                              baseHeight="100%"
                              baseWidth="100%"
                              iconSize={60}
                          />
                          )}
                      </div>

                      <div style={parseStyle("flex: 1; display: flex; flex-direction: column;")}>
                          <div style={parseStyle("background: rgba(255,255,255,0.9); padding: 20px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.08); height: 100%; overflow-y: auto;")}>
                              <h4 style={parseStyle("font-size: 18px; font-weight: bold; color: #1e40af; margin: 0 0 12px 0; font-family: 'Poppins', sans-serif;")}>{fp.name}</h4>
                              {fp.specsHeading && <h5 style={parseStyle("font-size: 15px; font-weight: bold; color: #1e40af; margin: 0 0 10px 0; font-family: 'Poppins', sans-serif;")}>{fp.specsHeading}</h5>}
                              <div style={parseStyle("font-size: 13px; color: #475569; line-height: 1.6;")}>
                                  {fp.specsCarpetArea && <p style={parseStyle("margin: 0 0 8px 0;")}><strong style={{fontWeight: 600}}>Carpet Area:</strong> {fp.specsCarpetArea}</p>}
                                  {fp.specsBuiltUpArea && <p style={parseStyle("margin: 0 0 8px 0;")}><strong style={{fontWeight: 600}}>Built-up Area:</strong> {fp.specsBuiltUpArea}</p>}
                                  {fp.specsBalconyArea && <p style={parseStyle("margin: 0 0 8px 0;")}><strong style={{fontWeight: 600}}>Balcony:</strong> {fp.specsBalconyArea}</p>}
                                  {fp.specsConfiguration && <p style={parseStyle("margin: 0 0 12px 0;")}><strong style={{fontWeight: 600}}>Configuration:</strong> {fp.specsConfiguration}</p>}
                                  {fp.specsFeaturesTitle && <h5 style={parseStyle("font-size: 14px; font-weight: bold; color: #1e40af; margin: 10px 0 6px 0; font-family: 'Poppins', sans-serif;")}>{fp.specsFeaturesTitle}</h5>}
                                  {fp.specsFeaturesItems && Array.isArray(fp.specsFeaturesItems) && fp.specsFeaturesItems.length > 0 && (
                                  <ul style={parseStyle("margin: 0; padding-left: 16px; font-size: 12px;")}>
                                      {fp.specsFeaturesItems.map((item, idx) => item && <li key={idx} style={{marginBottom: '4px'}}>{item}</li>)}
                                  </ul>
                                  )}
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          ))}
        </div>
        {isLastFloorPlanPageChunk && (page4.contactInfoHeading || page4.legalInfoHeading) && <ContactAndLegalInfo pageData={page4} />}
      </div>
    </>
  );

  // --- Page generation logic ---
  const pageStructure: Array<{type: string, data?: any}> = [];
  
  pageStructure.push({type: 'page1'});
  pageStructure.push({type: 'page2'});
  
  const allAmenities = page3.amenities || [];
  const allFloorPlans = Array.isArray(page4.floorPlans) ? page4.floorPlans : [];
  
  let masterPlanInitiallyOnPage3 = true;
  if (!page3.masterPlanHeading && !page3.masterPlanImage) { // No master plan content at all
      masterPlanInitiallyOnPage3 = false;
  }

  let amenitiesForPage3: AmenityItem[];
  let amenitiesForOverflow: AmenityItem[] = [];
  let showMasterPlanOnPage3 = masterPlanInitiallyOnPage3;
  let showMasterPlanOnOverflow = false;

  if (masterPlanInitiallyOnPage3) {
      if (allAmenities.length > MAX_AMENITIES_ON_PAGE3_WITH_MASTERPLAN) {
          amenitiesForPage3 = allAmenities.slice(0, MAX_AMENITIES_ON_PAGE3_WITHOUT_MASTERPLAN);
          amenitiesForOverflow = allAmenities.slice(MAX_AMENITIES_ON_PAGE3_WITHOUT_MASTERPLAN);
          showMasterPlanOnPage3 = false;
          showMasterPlanOnOverflow = true;
      } else {
          amenitiesForPage3 = allAmenities;
      }
  } else { // Master plan is not shown initially on page 3 (either no content or already too many amenities)
      amenitiesForPage3 = allAmenities.slice(0, MAX_AMENITIES_ON_PAGE3_WITHOUT_MASTERPLAN);
      amenitiesForOverflow = allAmenities.slice(MAX_AMENITIES_ON_PAGE3_WITHOUT_MASTERPLAN);
      // If master plan had content, it should go to overflow if not on page3
      showMasterPlanOnOverflow = masterPlanInitiallyOnPage3; 
  }
  
  pageStructure.push({type: 'page3', data: {amenities: amenitiesForPage3, showMasterPlan: showMasterPlanOnPage3}});

  const needsOverflowPage = amenitiesForOverflow.length > 0 || showMasterPlanOnOverflow;
  if (needsOverflowPage) {
      pageStructure.push({type: 'overflowAmenity', data: {amenities: amenitiesForOverflow, showMasterPlan: showMasterPlanOnOverflow}});
  }

  if (allFloorPlans.length > 0) {
    for (let i = 0; i < allFloorPlans.length; i += FLOORPLANS_PER_PAGE) {
        const floorPlanChunk = allFloorPlans.slice(i, i + FLOORPLANS_PER_PAGE);
        const isLastChunk = (i + FLOORPLANS_PER_PAGE) >= allFloorPlans.length;
        pageStructure.push({type: 'floorPlan', data: {plans: floorPlanChunk, isLastChunk: isLastChunk}});
    }
  } else if (page4.contactInfoHeading || page4.legalInfoHeading) { 
    // If no floor plans, but contact/legal info needs to be shown on its own "final" page segment.
    pageStructure.push({type: 'floorPlan', data: {plans: [], isLastChunk: true}});
  }
  
  const totalPageCount = pageStructure.length;
  const pageElements: JSX.Element[] = pageStructure.map((pageDef, index) => {
    const isOverallLastPage = index === totalPageCount - 1;
    let pageContent: React.ReactNode;

    switch(pageDef.type) {
        case 'page1':
            pageContent = renderPage1Content();
            break;
        case 'page2':
            pageContent = renderPage2Content();
            break;
        case 'page3':
            pageContent = renderPage3Content(pageDef.data.amenities, pageDef.data.showMasterPlan, isOverallLastPage, allFloorPlans.length === 0 && !needsOverflowPage);
            break;
        case 'overflowAmenity':
            pageContent = renderOverflowPageContent(pageDef.data.amenities, pageDef.data.showMasterPlan, isOverallLastPage, allFloorPlans.length === 0);
            break;
        case 'floorPlan':
            pageContent = renderFloorPlanPageContent(pageDef.data.plans, pageDef.data.isLastChunk);
            break;
        default:
            pageContent = null;
    }

    return (
        <div key={`page-${index}`} className="page" style={viewMode === 'landscape' ? pageOnSpreadStyle : pageStylePortrait}>
            {pageContent}
            {isOverallLastPage && <UniversalDisclaimer />}
        </div>
    );
  });


  if (viewMode === 'landscape') {
    const landscapeSpreads = [];
    for (let i = 0; i < pageElements.length; i += 2) {
      landscapeSpreads.push(
        <div key={`spread-${i/2}`} className="page-spread" style={pageSpreadStyle}>
          {pageElements[i]}
          {pageElements[i+1] ? React.cloneElement(pageElements[i+1], {style: {...pageOnSpreadStyle, borderLeft: '1px solid #e0e0e0'}}) : <div className="page" style={pageOnSpreadStyle}></div>}
        </div>
      );
    }
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
        {landscapeSpreads}
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
      {pageElements}
    </div>
  );
};
