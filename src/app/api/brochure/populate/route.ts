
import { type NextRequest, NextResponse } from 'next/server';
import type { BrochureContent } from '@/types/brochure';

// Basic validation function (can be expanded with Zod for production)
function isValidBrochureContent(data: any): data is BrochureContent {
  // Add some basic checks to ensure the data has the expected structure
  return (
    data &&
    typeof data === 'object' &&
    data.meta && typeof data.meta.brochureTitle === 'string' &&
    data.page1 && typeof data.page1.mainTitle === 'string' &&
    data.page2 && typeof data.page2.siteAddressHeading === 'string' &&
    data.page3 && typeof data.page3.amenitiesHeading === 'string' && Array.isArray(data.page3.amenities) &&
    data.page4 && typeof data.page4.floorPlanHeading === 'string' && Array.isArray(data.page4.floorPlans) &&
    // Check for one amenity item structure
    (data.page3.amenities.length === 0 || (data.page3.amenities[0] && typeof data.page3.amenities[0].id === 'string')) &&
    // Check for one floor plan item structure
    (data.page4.floorPlans.length === 0 || (data.page4.floorPlans[0] && typeof data.page4.floorPlans[0].id === 'string'))
  );
}

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();

    if (!isValidBrochureContent(payload)) {
      return NextResponse.json({ error: 'Invalid brochure data format. Ensure all key fields and array structures are present.' }, { status: 400 });
    }

    // In a real application, you might:
    // 1. Save this payload to a database.
    // 2. Perform more complex validation using a library like Zod.
    // 3. Trigger other server-side processes.

    // For now, we just acknowledge receipt.
    // The client-side is responsible for using this data with its `setContent` function
    // if it wants to update the UI with the data sent to this endpoint.
    return NextResponse.json({
      message: 'Brochure data received successfully. Client can now use this data to populate its state.',
      // Example: You could echo back the title for confirmation
      // receivedBrochureTitle: payload.meta.brochureTitle 
    }, { status: 200 });

  } catch (error) {
    // Log the error for server-side debugging
    if (error instanceof Error) {
        console.error('Error processing brochure data:', error.message);
    } else {
        console.error('Unknown error processing brochure data:', error);
    }
    
    if (error instanceof SyntaxError) {
      // Catches errors from request.json() if payload is not valid JSON
      return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 });
    }
    
    return NextResponse.json({ error: 'Internal server error while processing brochure data.' }, { status: 500 });
  }
}
