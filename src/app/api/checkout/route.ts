import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { adminAuth } from '@/lib/firebaseAdmin'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

export async function POST(request: NextRequest) {
  try {
    const { submissionId, ownerUid, idToken } = await request.json()

    // Verify the user is authenticated
    if (!idToken) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    // Verify the Firebase ID token
    const decodedToken = await adminAuth.verifyIdToken(idToken)
    if (decodedToken.uid !== ownerUid) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      success_url: `${request.headers.get('origin')}/register/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get('origin')}/register?cancelled=true`,
      metadata: {
        submissionId,
        ownerUid,
      },
      customer_email: decodedToken.email || undefined,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
} 