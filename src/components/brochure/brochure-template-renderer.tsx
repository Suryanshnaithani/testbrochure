
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

  const getImageContainerClass = (imageSrc: string | undefined | null) => {
    return (imageSrc && isPlaceholderImageSrc(imageSrc)) || !imageSrc ? 'no-print' : '';
  };

  const p1BuilderLogoContainerClass = getImageContainerClass(page1.builderLogoImage);
  const p1BuildingImageContainerClass = getImageContainerClass(page1.buildingImage);
  const p2LocationMapImageContainerClass = getImageContainerClass(page2.locationMapImage);
  const p3MasterPlanImageContainerClass = getImageContainerClass(page3.masterPlanImage);
  const p4FloorPlanImageContainerClass = getImageContainerClass(page4.floorPlanImage);


  const renderPage1Content = () => (
    <>
      <div style={parseStyle("display: flex; justify-content: space-between; align-items: center; padding: 20px 40px; background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); min-height: 80px;")}>
          {isActualImageSrc(page1.builderLogoImage) ? (
            <div 
              style={parseStyle("width: 150px; height: 60px; position: relative;")}
              className={p1BuilderLogoContainerClass} // handles print visibility for placeholder
            >
              <Image src={page1.builderLogoImage!} alt="Builder Logo" layout="fill" objectFit="contain" data-ai-hint={page1.builderLogoImageAiHint} />
            </div>
          ) : isPlaceholderImageSrc(page1.builderLogoImage) ? (
             <div 
              style={parseStyle("width: 150px; height: 60px; background: #e2e8f0; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 10px; color: #64748b;")}
              className={p1BuilderLogoContainerClass}
            >
              <Image src={page1.builderLogoImage!} alt="Builder Logo Placeholder" layout="fill" objectFit="contain" data-ai-hint={page1.builderLogoImageAiHint} />
            </div>
          ) : ( // Fallback text logo
            <div>
                <div style={parseStyle("font-size: 24px; font-weight: bold; color: #1e40af; margin-bottom: 2px; font-family: 'Poppins', sans-serif;")}>{page1.logoTextLine1}</div>
                <div style={parseStyle("font-size: 10px; color: #1e40af; font-weight: 500;")}>{page1.logoTextLine2}</div>
            </div>
          )}
          <div style={parseStyle("font-size: 20px; color: #f97316; font-weight: bold; font-family: 'Poppins', sans-serif; text-align: right;")}>{page1.tagline}</div>
      </div>
      
      <div style={parseStyle("text-align: center; padding: 30px 40px;")}>
          <h1 style={parseStyle("font-size: 64px; font-weight: bold; color: #1e40af; margin: 0 0 10px 0; letter-spacing: -1px; font-family: 'Poppins', sans-serif;")}>{page1.mainTitle}</h1>
          <p style={parseStyle("font-size: 18px; color: #64748b; margin: 0; letter-spacing: 3px; font-weight: 500;")}>{page1.subTitle}</p>
      </div>
      
      <div style={parseStyle("text-align: center; padding: 0 40px 30px 40px;")}>
          <div 
            style={parseStyle("width: 100%; max-width: 450px; height: 280px; margin: 0 auto; background: linear-gradient(45deg, #e2e8f0, #cbd5e1); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #64748b; font-size: 16px; box-shadow: 0 8px 25px rgba(0,0,0,0.1); position: relative; overflow: hidden;")}
            className={p1BuildingImageContainerClass}
          >
              {isActualImageSrc(page1.buildingImage) ? (
                  <Image src={page1.buildingImage!} alt={page1.mainTitle + " building"} layout="fill" objectFit="cover" data-ai-hint={page1.buildingImageAiHint}/>
                ) : isPlaceholderImageSrc(page1.buildingImage) ? (
                  <Image src={page1.buildingImage!} alt="Building placeholder" layout="fill" objectFit="cover" data-ai-hint={page1.buildingImageAiHint}/>
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
      
      <div style={parseStyle("padding: 0 40px 30px 40px; position: absolute; bottom: 10px; left: 0; right: 0;")}>
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
              <div 
                style={parseStyle("width: 100%; height: 250px; background: linear-gradient(45deg, #f1f5f9, #e2e8f0); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #64748b; font-size: 16px; position: relative; overflow: hidden;")}
                className={p2LocationMapImageContainerClass}
              >
                  {isActualImageSrc(page2.locationMapImage) ? (
                    <Image src={page2.locationMapImage!} alt="Location Map" layout="fill" objectFit="cover" data-ai-hint={page2.locationMapImageAiHint} />
                  ) : isPlaceholderImageSrc(page2.locationMapImage) ? (
                    <Image src={page2.locationMapImage!} alt="Location map placeholder" layout="fill" objectFit="cover" data-ai-hint={page2.locationMapImageAiHint} />
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
      
      <div style={parseStyle("padding: 0 40px 30px 40px; position: absolute; bottom: 10px; left: 0; right: 0;")}>
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
    </>
  );

  const renderPage3Content = () => (
    <>
      <div style={parseStyle("background: #1e40af; color: white; padding: 20px 40px; text-align: center;")}>
          <h2 style={parseStyle("font-size: 28px; font-weight: bold; margin: 0; font-family: 'Poppins', sans-serif;")}>Amenities & Master Plan</h2>
          <p style={parseStyle("font-size: 14px; margin: 5px 0 0 0; opacity: 0.9;")}>Facilities for Modern Living</p>
      </div>
      
      <div style={parseStyle("padding: 30px 40px; display: flex; flex-direction: column; justify-content: space-between; height: calc(100% - 78px); box-sizing: border-box;")}>
        <div>
          <h3 style={parseStyle("font-size: 20px; font-weight: bold; color: #1e40af; margin: 0 0 20px 0; font-family: 'Poppins', sans-serif;")}>{page3.amenitiesHeading}</h3>
          <div style={parseStyle("display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 30px;")}>
              {page3.amenities.map(amenity => {
                const amenityImageContainerClass = getImageContainerClass(amenity.imageUrl);

                return (
                  <div key={amenity.id} style={parseStyle("background: rgba(255,255,255,0.9); padding: 15px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100px;")}>
                      <div className={amenityImageContainerClass} style={{ width: '40px', height: '40px', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow:'hidden' }}>
                        {isActualImageSrc(amenity.imageUrl) ? (
                          <Image src={amenity.imageUrl!} alt={amenity.text} layout="fill" style={{ objectFit: 'contain' }} data-ai-hint={amenity.imageAiHint}/>
                        ) : isPlaceholderImageSrc(amenity.imageUrl) ? (
                           <Image src={amenity.imageUrl!} alt="Amenity placeholder" layout="fill" style={{ objectFit: 'contain' }} data-ai-hint={amenity.imageAiHint}/>
                        ) : (
                          <span style={parseStyle("font-size: 28px;")}>{amenity.icon}</span>
                        )}
                      </div>
                      <div style={parseStyle("font-size: 12px; font-weight: bold; color: #1e40af; line-height: 1.3;")}>{amenity.text}</div>
                  </div>
                );
              })}
          </div>
        </div>
        
        <div>
          <h3 style={parseStyle("font-size: 20px; font-weight: bold; color: #1e40af; margin: 30px 0 20px 0; font-family: 'Poppins', sans-serif;")}>{page3.masterPlanHeading}</h3>
          <div 
            style={parseStyle("width: 100%; height: 350px; background: linear-gradient(45deg, #f1f5f9, #e2e8f0); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #64748b; font-size: 16px; position: relative; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.08);")}
            className={p3MasterPlanImageContainerClass}
          >
            {isActualImageSrc(page3.masterPlanImage) ? (
                <Image src={page3.masterPlanImage!} alt="Master Plan" layout="fill" objectFit="cover" data-ai-hint={page3.masterPlanImageAiHint} />
            ) : isPlaceholderImageSrc(page3.masterPlanImage) ? (
                <Image src={page3.masterPlanImage!} alt="Master plan placeholder" layout="fill" objectFit="cover" data-ai-hint={page3.masterPlanImageAiHint} />
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
    </>
  );

  const renderPage4Content = () => (
    <>
        <div style={parseStyle("background: #1e40af; color: white; padding: 20px 40px; text-align: center;")}>
            <h2 style={parseStyle("font-size: 28px; font-weight: bold; margin: 0; font-family: 'Poppins', sans-serif;")}>Floor Plans & Contact</h2>
            <p style={parseStyle("font-size: 14px; margin: 5px 0 0 0; opacity: 0.9;")}>Detailed Layouts and Information</p>
        </div>
        
        <div style={parseStyle("padding: 25px 40px; display: flex; flex-direction: column; justify-content: space-between; height: calc(100% - 78px - 65px); box-sizing: border-box;")}>
          <div>
            <h3 style={parseStyle("font-size: 20px; font-weight: bold; color: #1e40af; margin: 0 0 15px 0; font-family: 'Poppins', sans-serif;")}>{page4.floorPlanHeading}</h3>
            
            <div style={parseStyle("display: flex; gap: 20px; margin-bottom: 20px; min-height: 280px;")}>
                <div 
                  style={parseStyle("flex: 1.2; height: 280px; background: rgba(255,255,255,0.9); border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.08); position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center;")}
                  className={p4FloorPlanImageContainerClass}
                >
                    {isActualImageSrc(page4.floorPlanImage) ? (
                      <Image src={page4.floorPlanImage!} alt="Floor Plan" layout="fill" objectFit="contain" data-ai-hint={page4.floorPlanImageAiHint}/>
                    ) : isPlaceholderImageSrc(page4.floorPlanImage) ? (
                      <Image src={page4.floorPlanImage!} alt="Floor plan placeholder" layout="fill" objectFit="contain" data-ai-hint={page4.floorPlanImageAiHint}/>
                    ) : (
                      <>
                        <div style={parseStyle("position: absolute; top: 20%; left: 15%; width: 35%; height: 50%; border: 2px solid #1e40af; background: rgba(30,64,175,0.1); display: flex; align-items: center; justify-content: center; font-size: 12px; color: #1e40af;")}>Bedroom Area</div>
                        <div style={parseStyle("position: absolute; top: 20%; right: 15%; width: 35%; height: 30%; border: 2px solid #1e40af; background: rgba(30,64,175,0.1); display: flex; align-items: center; justify-content: center; font-size: 12px; color: #1e40af;")}>Kitchen Area</div>
                        <span style={parseStyle("position: absolute; top: 10px; left: 10px; font-size: 14px; color: #64748b;")}>Floor Plan Placeholder</span>
                      </>
                    )}
                </div>
                
                <div style={parseStyle("flex: 1;")}>
                    <div style={parseStyle("background: rgba(255,255,255,0.9); padding: 15px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.08); height: 280px; overflow-y: auto;")}>
                        <h4 style={parseStyle("font-size: 16px; font-weight: bold; color: #1e40af; margin: 0 0 10px 0; font-family: 'Poppins', sans-serif;")}>{page4.specsHeading}</h4>
                        
                        <div style={parseStyle("font-size: 12px; color: #475569; line-height: 1.5;")}>
                            <p style={parseStyle("margin: 0 0 8px 0;")}><strong className="font-semibold" style={{fontWeight: 600}}>Carpet Area:</strong> {page4.specsCarpetArea}</p>
                            <p style={parseStyle("margin: 0 0 8px 0;")}><strong className="font-semibold" style={{fontWeight: 600}}>Built-up Area:</strong> {page4.specsBuiltUpArea}</p>
                            <p style={parseStyle("margin: 0 0 8px 0;")}><strong className="font-semibold" style={{fontWeight: 600}}>Balcony:</strong> {page4.specsBalconyArea}</p>
                            <p style={parseStyle("margin: 0 0 12px 0;")}><strong className="font-semibold" style={{fontWeight: 600}}>Configuration:</strong> {page4.specsConfiguration}</p>
                            
                            <h5 style={parseStyle("font-size: 13px; font-weight: bold; color: #1e40af; margin: 0 0 6px 0; font-family: 'Poppins', sans-serif;")}>{page4.specsFeaturesTitle}</h5>
                            <ul style={parseStyle("margin: 0; padding-left: 15px; font-size: 11px;")}>
                                {page4.specsFeaturesItems.map((item, idx) => <li key={idx} style={{marginBottom: '3px'}}>{item}</li>)}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            
            <div style={parseStyle("background: rgba(255,255,255,0.9); padding: 20px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.08); margin-bottom: 15px;")}>
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
        
        <div style={parseStyle("position: absolute; bottom: 0; left: 0; right: 0; background: #374151; color: white; padding: 10px 40px; text-align: center;")}>
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
