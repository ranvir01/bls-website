import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Improved error handling and logging
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.example.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER || 'user@example.com',
    pass: process.env.EMAIL_PASSWORD || 'password',
  },
});

export async function POST(req: Request) {
  try {
    // Parse the request body
    const body = await req.json();
    
    // Extract form data with improved type safety
    const { 
      name, email, phone, message, service, 
      address, projectType, projectSize, urgency, details, estimatedCost 
    } = body as {
      name: string;
      email: string;
      phone?: string;
      message?: string;
      service?: string;
      address?: string;
      projectType?: string;
      projectSize?: string;
      urgency?: string;
      details?: string;
      estimatedCost?: number;
    };
    
    // Enhanced validation with specific error messages
    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }
    
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Please provide a valid email address' }, { status: 400 });
    }
    
    // Determine if this is a contact form or quote request
    const isQuoteRequest = !!projectType;
    
    // Create email subject with more descriptive information
    const subject = isQuoteRequest 
      ? `Quote Request from ${name} - ${projectType} (${projectSize || 'Not specified'})`
      : `Contact Form Submission from ${name} - ${service || 'General Inquiry'}`;
    
    // Create email html content with improved formatting
    let htmlContent = `
      <h1 style="color: #075985; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">${isQuoteRequest ? 'New Quote Request' : 'New Contact Form Submission'}</h1>
      <h2 style="color: #075985;">Contact Information</h2>
      <table style="border-collapse: collapse; width: 100%; margin-bottom: 20px;">
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;"><strong>Name:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;"><strong>Email:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${email}</td>
        </tr>
    `;
    
    if (phone) {
      htmlContent += `
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;"><strong>Phone:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${phone}</td>
        </tr>
      `;
    }
    
    htmlContent += `</table>`;
    
    if (isQuoteRequest) {
      // Add quote-specific fields with better formatting
      htmlContent += `
        <h2 style="color: #075985;">Project Details</h2>
        <table style="border-collapse: collapse; width: 100%; margin-bottom: 20px;">
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;"><strong>Address:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${address}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;"><strong>Project Type:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${projectType}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;"><strong>Project Size:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${projectSize}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;"><strong>Timeframe:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${urgency}</td>
          </tr>
      `;
      
      if (details) {
        htmlContent += `
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;"><strong>Additional Details:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${details}</td>
          </tr>
        `;
      }
      
      htmlContent += `</table>`;
      
      if (estimatedCost) {
        htmlContent += `
          <h2 style="color: #075985;">Estimated Cost</h2>
          <table style="border-collapse: collapse; width: 100%; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;"><strong>Range:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">$${estimatedCost - 500} - $${estimatedCost + 500}</td>
            </tr>
          </table>
        `;
      }
    } else {
      // Add general contact form fields
      if (service) {
        htmlContent += `
          <h2 style="color: #075985;">Service Requested</h2>
          <p>${service}</p>
        `;
      }
      
      htmlContent += `
        <h2 style="color: #075985;">Message</h2>
        <p>${message?.replace(/\n/g, '<br>') || 'No message provided.'}</p>
      `;
    }
    
    // Mail options with enhanced headers for better deliverability
    const mailOptions = {
      from: {
        name: 'Blue Landscaping Services',
        address: process.env.EMAIL_FROM || 'no-reply@bluelandscaping.com',
      },
      to: process.env.EMAIL_TO || 'info@bluelandscaping.com',
      replyTo: email,
      subject,
      html: htmlContent,
      headers: {
        'X-Priority': '1',
        'X-MSMail-Priority': 'High',
        'Importance': 'high',
      },
    };
    
    // Send email
    await transporter.sendMail(mailOptions);
    
    // Log success for monitoring (only in development)
    if (process.env.NODE_ENV !== 'production') {
      console.log(`Email sent successfully to ${process.env.EMAIL_TO || 'info@bluelandscaping.com'}`);
    }
    
    // Return success response with more information
    return NextResponse.json({ 
      success: true,
      message: 'Email sent successfully',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    // Enhanced error handling with specific error types
    console.error('Email sending error:', error);
    
    // Return error response with more context
    return NextResponse.json(
      { 
        error: 'Failed to send email',
        message: error instanceof Error ? error.message : 'An unexpected error occurred',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}