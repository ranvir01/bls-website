import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // Parse the request body
    const body = await req.json();
    
    // Improved type safety
    const { name, phone, message } = body as {
      name: string;
      phone: string;
      message: string;
    };
    
    // Basic validation
    if (!name || !phone) {
      return NextResponse.json({ 
        error: 'Name and phone number are required' 
      }, { status: 400 });
    }
    
    // Log for development
    if (process.env.NODE_ENV !== 'production') {
      console.log('SMS would be sent with data:', {
        name,
        phone,
        message,
        timestamp: new Date().toISOString()
      });
    }
    
    // In a real implementation, you would use a service like Twilio here
    // Twilio implementation would look something like:
    
    /*
    // Import the Twilio SDK
    import twilio from 'twilio';
    
    // Create a Twilio client
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );
    
    // Send the SMS
    const twilioResponse = await client.messages.create({
      body: `New message from ${name}: ${message}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: process.env.ADMIN_PHONE_NUMBER || process.env.RECIPIENT_PHONE_NUMBER
    });
    
    // Return the Twilio response for logging or debugging
    return NextResponse.json({ 
      success: true, 
      messageId: twilioResponse.sid,
      status: twilioResponse.status
    });
    */
    
    // Return success response with timestamp for tracking
    return NextResponse.json({ 
      success: true,
      message: 'SMS would be sent (simulation)',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('SMS sending error:', error);
    
    // Enhanced error response with timestamp and more context
    return NextResponse.json(
      { 
        error: 'Failed to send SMS',
        message: error instanceof Error ? error.message : 'An unexpected error occurred',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}