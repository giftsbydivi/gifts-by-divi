import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();

    // Validate the required fields
    const { name, phone, message } = body;

    if (!name || !phone || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Phone validation (should be 10 digits)
    if (!/^\d{10}$/.test(phone)) {
      return NextResponse.json(
        { error: 'Phone number must be exactly 10 digits' },
        { status: 400 }
      );
    }

    // Call the FormSubmit.co API
    const response = await fetch('https://formsubmit.co/ajax/giftsbydivi@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name,
        phone,
        message,
        _captcha: false,
      }),
    });

    // Handle the FormSubmit.co API response
    const formSubmitResponse = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: formSubmitResponse.message || 'Failed to submit form' },
        { status: response.status }
      );
    }

    // Return success response
    return NextResponse.json({ success: true, message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error in contact form submission:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
