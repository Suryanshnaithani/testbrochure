
import type { BrochureContent } from '@/types/brochure';
import Image from 'next/image';
import React from 'react';

interface BrochureTemplateRendererProps {
  content: BrochureContent;
  viewMode: 'portrait' | 'landscape';
}

// Helper to convert inline styles string to JSX style object
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


export const BrochureTemplateRenderer: React.FC<BrochureTemplateRendererProps> = ({ content, viewMode }) => {
  const { page1, page2, page3, page4 } = content;

  const pageBaseStyle: React.CSSProperties = {
    width: '210mm',
    minHeight: '297mm',
    background: 'white',
    position: 'relative',
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)', // Reduced shadow for potentially tighter layout
    overflow: 'hidden',
    fontFamily: "'PT Sans', Arial, sans-serif",
    flexShrink: 0, // Important for landscape flex layout
  };
  
  const pageStylePortrait: React.CSSProperties = {
    ...pageBaseStyle,
    margin: '0 auto 30px auto', // Centered with bottom margin
  };

  const pageStyleLandscape: React.CSSProperties = {
    ...pageBaseStyle,
    margin: '0', // Margin will be handled by gap in the container
  };
  
  const currentPageStyle = viewMode === 'landscape' ? pageStyleLandscape : pageStylePortrait;

  return (
    <div 
      id="brochure-container"
      style={{
        display: viewMode === 'landscape' ? 'flex' : 'block',
        flexDirection: viewMode === 'landscape' ? 'row' : undefined,
        gap: viewMode === 'landscape' ? '20px' : undefined, // Spacing between pages in landscape
        padding: viewMode === 'landscape' ? '20px' : '0', // Padding around pages in landscape
      }}
    >
      {/* PAGE 1: COVER & INTRODUCTION */}
      <div className="page" style={currentPageStyle}>
        <div style={parseStyle("display: flex; justify-content: space-between; align-items: flex-start; padding: 30px 40px 20px 40px; background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);")}>
            <div style={parseStyle("display: flex; align-items: center; gap: 15px;")}>
                <div style={parseStyle("width: 60px; height: 60px; background: #1e40af; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 14px;")}>
                  {page1.logoTextLine1}
                </div>
                <div>
                    <div style={parseStyle("font-size: 24px; font-weight: bold; color: #1e40af; margin-bottom: 2px; font-family: 'Poppins', sans-serif;")}>{page1.logoTextLine1}</div>
                    <div style={parseStyle("font-size: 10px; color: #1e40af; font-weight: 500;")}>{page1.logoTextLine2}</div>
                </div>
            </div>
            <div style={parseStyle("font-size: 20px; color: #f97316; font-weight: bold; font-family: 'Poppins', sans-serif;")}>{page1.tagline}</div>
        </div>
        
        <div style={parseStyle("text-align: center; padding: 30px 40px;")}>
            <h1 style={parseStyle("font-size: 64px; font-weight: bold; color: #1e40af; margin: 0 0 10px 0; letter-spacing: -1px; font-family: 'Poppins', sans-serif;")}>{page1.mainTitle}</h1>
            <p style={parseStyle("font-size: 18px; color: #64748b; margin: 0; letter-spacing: 3px; font-weight: 500;")}>{page1.subTitle}</p>
        </div>
        
        <div style={parseStyle("text-align: center; padding: 0 40px 30px 40px;")}>
            <div style={parseStyle("width: 100%; max-width: 450px; height: 280px; margin: 0 auto; background: linear-gradient(45deg, #e2e8f0, #cbd5e1); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #64748b; font-size: 16px; box-shadow: 0 8px 25px rgba(0,0,0,0.1); position: relative; overflow: hidden;")}>
                {page1.buildingImage && (page1.buildingImage.startsWith('data:') || page1.buildingImage.startsWith('http')) ? (
                    <Image src={page1.buildingImage} alt={page1.mainTitle + " building"} layout="fill" objectFit="cover" data-ai-hint={page1.buildingImageAiHint}/>
                  ) : (
                    <>
                      <div style={parseStyle("position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 80%; height: 70%; background: linear-gradient(to top, #94a3b8, #cbd5e1); clip-path: polygon(10% 100%, 25% 20%, 35% 100%, 45% 30%, 55% 100%, 65% 15%, 75% 100%, 90% 25%, 100% 100%, 0% 100%);")}></div>
                      <span style={parseStyle("position: relative; z-index: 1;")}>Building Rendering Placeholder</span>
                    </>
                  )}
            </div>
        </div>
        
        <div style={parseStyle("padding: 0 40px 30px 40px;")}>
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
        
        <div style={parseStyle("padding: 0 40px 30px 40px;")}>
            <div style={parseStyle("background: #1e40af; color: white; padding: 20px; border-radius: 12px;")}>
                <h4 style={parseStyle("font-size: 16px; font-weight: bold; margin: 0 0 10px 0; font-family: 'Poppins', sans-serif;")}>{page1.developerHeading}</h4>
                <p style={parseStyle("font-size: 12px; line-height: 1.5; margin: 0;")}>
                    {page1.developerPara}
                </p>
            </div>
        </div>
      </div>

      {/* PAGE 2: LOCATION & CONNECTIVITY */}
      <div className="page" style={currentPageStyle}>
        <div style={parseStyle("background: #1e40af; color: white; padding: 20px 40px; text-align: center;")}>
            <h2 style={parseStyle("font-size: 28px; font-weight: bold; margin: 0; font-family: 'Poppins', sans-serif;")}>Location & Connectivity</h2>
            <p style={parseStyle("font-size: 14px; margin: 5px 0 0 0; opacity: 0.9;")}>Explore the Prime Location</p>
        </div>
        
        <div style={parseStyle("padding: 30px 40px;")}>
            <div style={parseStyle("background: rgba(255,255,255,0.9); padding: 25px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.08); margin-bottom: 25px;")}>
                <h3 style={parseStyle("font-size: 18px; font-weight: bold; color: #1e40af; margin: 0 0 15px 0; font-family: 'Poppins', sans-serif;")}>{page2.siteAddressHeading}</h3>
                <p style={parseStyle("font-size: 14px; color: #374151; line-height: 1.6; margin: 0; font-weight: 500; white-space: pre-line;")}>
                   {page2.siteAddress}
                </p>
            </div>
            
            <div style={parseStyle("background: rgba(255,255,255,0.9); padding: 25px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.08); margin-bottom: 25px;")}>
                <h3 style={parseStyle("font-size: 18px; font-weight: bold; color: #1e40af; margin: 0 0 20px 0; font-family: 'Poppins', sans-serif;")}>Location Map</h3>
                <div style={parseStyle("width: 100%; height: 250px; background: linear-gradient(45deg, #f1f5f9, #e2e8f0); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #64748b; font-size: 16px; position: relative; overflow: hidden;")}>
                    {page2.locationMapImage && (page2.locationMapImage.startsWith('data:') || page2.locationMapImage.startsWith('http')) ? (
                      <Image src={page2.locationMapImage} alt="Location Map" layout="fill" objectFit="cover" data-ai-hint={page2.locationMapImageAiHint} />
                    ) : (
                      <>
                        <div style={parseStyle("position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-image: linear-gradient(rgba(148,163,184,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.3) 1px, transparent 1px); background-size: 20px 20px;")}></div>
                        <div style={parseStyle("position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 20px; height: 20px; background: #ef4444; border-radius: 50% 50% 50% 0; transform: translate(-50%, -50%) rotate(-45deg);")}></div>
                        <span style={parseStyle("position: relative; z-index: 1;")}>Location Map Placeholder</span>
                      </>
                    )}
                </div>
            </div>
        </div>
        
        <div style={parseStyle("padding: 0 40px 30px 40px;")}>
            <div style={parseStyle("background: rgba(255,255,255,0.9); padding: 25px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.08);")}>
                <h3 style={parseStyle("font-size: 18px; font-weight: bold; color: #1e40af; margin: 0 0 20px 0; font-family: 'Poppins', sans-serif;")}>{page2.connectivityHeading}</h3>
                <div style={parseStyle("display: grid; grid-template-columns: 1fr 1fr; gap: 20px;")}>
                    {[
                      { title: page2.connectivityMetroRailwayTitle, items: page2.connectivityMetroRailwayItems },
                      { title: page2.connectivityMajorRoadsTitle, items: page2.connectivityMajorRoadsItems },
                      { title: page2.connectivityHealthcareTitle, items: page2.connectivityHealthcareItems },
                      { title: page2.connectivityEducationTitle, items: page2.connectivityEducationItems },
                    ].map((section, idx) => (
                      <div key={idx}>
                          <h4 style={parseStyle("font-size: 14px; font-weight: bold; color: #1e40af; margin: 0 0 10px 0; font-family: 'Poppins', sans-serif;")}>{section.title}</h4>
                          <ul style={parseStyle("font-size: 12px; color: #475569; line-height: 1.6; margin: 0; padding-left: 15px;")}>
                              {section.items.map((item, itemIdx) => <li key={itemIdx}>{item}</li>)}
                          </ul>
                      </div>
                    ))}
                </div>
            </div>
        </div>
      </div>

      {/* PAGE 3: AMENITIES & MASTER PLAN */}
      <div className="page" style={currentPageStyle}>
        <div style={parseStyle("background: #1e40af; color: white; padding: 20px 40px; text-align: center;")}>
            <h2 style={parseStyle("font-size: 28px; font-weight: bold; margin: 0; font-family: 'Poppins', sans-serif;")}>Amenities & Master Plan</h2>
            <p style={parseStyle("font-size: 14px; margin: 5px 0 0 0; opacity: 0.9;")}>Facilities for Modern Living</p>
        </div>
        
        <div style={parseStyle("padding: 30px 40px;")}>
            <h3 style={parseStyle("font-size: 20px; font-weight: bold; color: #1e40af; margin: 0 0 20px 0; font-family: 'Poppins', sans-serif;")}>{page3.amenitiesHeading}</h3>
            <div style={parseStyle("display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 30px;")}>
                {page3.amenities.map(amenity => (
                  <div key={amenity.id} style={parseStyle("background: rgba(255,255,255,0.9); padding: 15px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); text-align: center;")}>
                      <div style={parseStyle("font-size: 24px; margin-bottom: 8px;")}>{amenity.icon}</div> {/* Ensure icons are generic */}
                      <div style={parseStyle("font-size: 12px; font-weight: bold; color: #1e40af;")}>{amenity.text}</div>
                  </div>
                ))}
            </div>
            
            <h3 style={parseStyle("font-size: 20px; font-weight: bold; color: #1e40af; margin: 0 0 20px 0; font-family: 'Poppins', sans-serif;")}>{page3.masterPlanHeading}</h3>
            <div style={parseStyle("width: 100%; height: 200px; background: linear-gradient(45deg, #f1f5f9, #e2e8f0); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #64748b; font-size: 16px; position: relative; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.08);")}>
              {page3.masterPlanImage && (page3.masterPlanImage.startsWith('data:') || page3.masterPlanImage.startsWith('http')) ? (
                  <Image src={page3.masterPlanImage} alt="Master Plan" layout="fill" objectFit="cover" data-ai-hint={page3.masterPlanImageAiHint} />
              ) : (
                <>
                  <div style={parseStyle("position: absolute; top: 20%; left: 30%; width: 40%; height: 60%; background: #cbd5e1; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 12px; color: #475569;")}>Main Building Block</div>
                  <div style={parseStyle("position: absolute; top: 20%; left: 10%; width: 15%; height: 25%; background: #a7f3d0; border-radius: 4px; text-align: center; font-size: 10px; padding-top: 5px;")}>Green Area</div>
                  <div style={parseStyle("position: absolute; top: 50%; left: 10%; width: 15%; height: 25%; background: #fde68a; border-radius: 4px; text-align: center; font-size: 10px; padding-top: 5px;")}>Parking</div>
                  <span style={parseStyle("position: relative; z-index: 1;")}>Site Layout Placeholder</span>
                </>
              )}
            </div>
        </div>
      </div>

      {/* PAGE 4: FLOOR PLANS & BACK COVER */}
      <div className="page" style={currentPageStyle}>
          <div style={parseStyle("background: #1e40af; color: white; padding: 20px 40px; text-align: center;")}>
              <h2 style={parseStyle("font-size: 28px; font-weight: bold; margin: 0; font-family: 'Poppins', sans-serif;")}>Floor Plans & Contact</h2>
              <p style={parseStyle("font-size: 14px; margin: 5px 0 0 0; opacity: 0.9;")}>Detailed Layouts and Information</p>
          </div>
          
          <div style={parseStyle("padding: 30px 40px;")}>
              <h3 style={parseStyle("font-size: 20px; font-weight: bold; color: #1e40af; margin: 0 0 20px 0; font-family: 'Poppins', sans-serif;")}>{page4.floorPlanHeading}</h3>
              
              <div style={parseStyle("display: flex; gap: 25px; margin-bottom: 30px;")}>
                  <div style={parseStyle("flex: 1; height: 300px; background: rgba(255,255,255,0.9); border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.08); position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center;")}>
                      {page4.floorPlanImage && (page4.floorPlanImage.startsWith('data:') || page4.floorPlanImage.startsWith('http')) ? (
                        <Image src={page4.floorPlanImage} alt="Floor Plan" layout="fill" objectFit="contain" data-ai-hint={page4.floorPlanImageAiHint}/>
                      ) : (
                        <>
                          <div style={parseStyle("position: absolute; top: 20%; left: 15%; width: 35%; height: 50%; border: 2px solid #1e40af; background: rgba(30,64,175,0.1); display: flex; align-items: center; justify-content: center; font-size: 12px; color: #1e40af;")}>Bedroom Area</div>
                          <div style={parseStyle("position: absolute; top: 20%; right: 15%; width: 35%; height: 30%; border: 2px solid #1e40af; background: rgba(30,64,175,0.1); display: flex; align-items: center; justify-content: center; font-size: 12px; color: #1e40af;")}>Kitchen Area</div>
                          <span style={parseStyle("position: absolute; top: 10px; left: 10px; font-size: 14px; color: #64748b;")}>Floor Plan Placeholder</span>
                        </>
                      )}
                  </div>
                  
                  <div style={parseStyle("flex: 1;")}>
                      <div style={parseStyle("background: rgba(255,255,255,0.9); padding: 20px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.08); height: 300px; overflow-y: auto;")}>
                          <h4 style={parseStyle("font-size: 16px; font-weight: bold; color: #1e40af; margin: 0 0 15px 0; font-family: 'Poppins', sans-serif;")}>{page4.specsHeading}</h4>
                          
                          <div style={parseStyle("font-size: 13px; color: #475569; line-height: 1.6;")}>
                              <p style={parseStyle("margin: 0 0 10px 0;")}><strong className="font-semibold">Carpet Area:</strong> {page4.specsCarpetArea}</p>
                              <p style={parseStyle("margin: 0 0 10px 0;")}><strong className="font-semibold">Built-up Area:</strong> {page4.specsBuiltUpArea}</p>
                              <p style={parseStyle("margin: 0 0 10px 0;")}><strong className="font-semibold">Balcony:</strong> {page4.specsBalconyArea}</p>
                              <p style={parseStyle("margin: 0 0 15px 0;")}><strong className="font-semibold">Configuration:</strong> {page4.specsConfiguration}</p>
                              
                              <h5 style={parseStyle("font-size: 14px; font-weight: bold; color: #1e40af; margin: 0 0 8px 0; font-family: 'Poppins', sans-serif;")}>{page4.specsFeaturesTitle}</h5>
                              <ul style={parseStyle("margin: 0; padding-left: 15px;")}>
                                  {page4.specsFeaturesItems.map((item, idx) => <li key={idx}>{item}</li>)}
                              </ul>
                          </div>
                      </div>
                  </div>
              </div>
              
              <div style={parseStyle("background: rgba(255,255,255,0.9); padding: 25px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.08); margin-bottom: 20px;")}>
                  <h3 style={parseStyle("font-size: 18px; font-weight: bold; color: #1e40af; margin: 0 0 20px 0; font-family: 'Poppins', sans-serif;")}>{page4.contactInfoHeading}</h3>
                  <div style={parseStyle("display: grid; grid-template-columns: 1fr 1fr; gap: 25px;")}>
                      <div>
                          <h4 style={parseStyle("font-size: 14px; font-weight: bold; color: #1e40af; margin: 0 0 10px 0; font-family: 'Poppins', sans-serif;")}>{page4.contactSalesOfficeTitle}</h4>
                          <p style={parseStyle("font-size: 13px; color: #475569; line-height: 1.6; margin: 0; white-space: pre-line;")}>
                              Phone: {page4.contactSalesOfficePhone}<br/>
                              Email: {page4.contactSalesOfficeEmail}<br/>
                              Website: {page4.contactSalesOfficeWebsite}
                          </p>
                      </div>
                      <div>
                          <h4 style={parseStyle("font-size: 14px; font-weight: bold; color: #1e40af; margin: 0 0 10px 0; font-family: 'Poppins', sans-serif;")}>{page4.contactSiteOfficeTitle}</h4>
                          <p style={parseStyle("font-size: 13px; color: #475569; line-height: 1.6; margin: 0; white-space: pre-line;")}>
                              {page4.contactSiteOfficeAddress}<br/>
                              {page4.contactSiteOfficeHours}
                          </p>
                      </div>
                  </div>
              </div>
              
              <div style={parseStyle("background: #1e40af; color: white; padding: 20px; border-radius: 12px; text-align: center;")}>
                  <h4 style={parseStyle("font-size: 14px; font-weight: bold; margin: 0 0 10px 0; font-family: 'Poppins', sans-serif;")}>{page4.legalInfoHeading}</h4>
                  <p style={parseStyle("font-size: 12px; margin: 0 0 8px 0;")}>RERA No.: {page4.legalReraNo}</p>
                  <p style={parseStyle("font-size: 11px; margin: 0; opacity: 0.9;")}>{page4.legalReraLinkText}</p>
              </div>
          </div>
          
          <div style={parseStyle("position: absolute; bottom: 0; left: 0; right: 0; background: #374151; color: white; padding: 15px 40px; text-align: center;")}>
              <p style={parseStyle("font-size: 9px; color: #d1d5db; line-height: 1.4; margin: 0;")}>
                  Disclaimer: This brochure is for illustrative purposes only and does not constitute a legal offering. 
                  All specifications, plans, and images are indicative and subject to change by authorities or the developer without prior notice.
              </p>
          </div>
      </div>
    </div>
  );
};
