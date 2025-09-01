# 🍽️ Halal Food Club

> The UK's premier halal restaurant discovery platform

A beautiful, conversion-focused platform connecting hungry customers with authentic halal restaurants across the UK. Built with Next.js 14, Google Maps, and a stunning foody design system.

## 🎯 Live Demo

**Homepage**: Full-screen interactive map with restaurant discovery  
**Why Us**: Conversion-focused landing page  
**Register**: Smart business registration with postcode validation  
**Admin**: PIN-based dashboard (PIN: `123`)

## ✨ Key Features

## Features

- 🗺️ **Interactive Map** - Search restaurants by postcode or current location
- 🏪 **Restaurant Profiles** - Detailed listings with menus, photos, and reviews
- 💳 **Business Registration** - £69/year subscription with Stripe integration
- 👨‍💼 **Admin Dashboard** - Approve/reject restaurant submissions
- 📱 **Responsive Design** - Optimized for mobile and desktop
- 🔐 **Authentication** - Firebase Auth with Google OAuth
- ⭐ **Reviews System** - Customer feedback and ratings
- 📍 **Proximity Search** - Find restaurants within specified radius

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Storage**: Firebase Storage
- **Maps**: Google Maps API
- **Payments**: Stripe Checkout (subscriptions)
- **State Management**: TanStack Query
- **Forms**: React Hook Form + Zod validation

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Create `.env.local` file in the root directory:

```env
# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyBHzVFf3Hn_BdOjyd_kfpaz5q0zNCufzNQ

# Firebase (client config)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBPWWS1WoOGL8VDmq21K9BnVw5Oxq2B9f0
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=halalclub-fc536.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=halalclub-fc536
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=halalclub-fc536.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=405553990525
NEXT_PUBLIC_FIREBASE_APP_ID=1:405553990525:web:f45dc0b6c3ac4aa1255a14
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-M19WNFY52N

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51S1nPTDZ5kC6lewfb1TA1tc8n4cfvkNtQAODFSQ3pX29S7V3QvjvgMn5bUFtLZ2nJOERwkBCnjkOhrk2ADEFiess00cJH8Rm6V
STRIPE_SECRET_KEY=sk_test_YOUR_SECRET_KEY_HERE
STRIPE_PRICE_ID=prod_SxiwPPv4OH749c
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET_HERE

# Firebase Admin (server-only)
FIREBASE_ADMIN_PROJECT_ID=halalclub-fc536
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-xxxxx@halalclub-fc536.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"

# Admin seed emails
ADMIN_SEED_EMAILS=owner@example.com,admin@halalfoodclub.uk
```

### 3. Firebase Setup

1. **Deploy Firestore Rules**:
   ```bash
   firebase deploy --only firestore:rules
   ```

2. **Deploy Storage Rules**:
   ```bash
   firebase deploy --only storage
   ```

3. **Deploy Cloud Functions**:
   ```bash
   cd functions
   npm install
   npm run deploy
   cd ..
   ```

4. **Seed Admin Users** (run once):
   ```bash
   curl -X POST https://YOUR_PROJECT_ID.cloudfunctions.net/seedAdmins \
     -H "Content-Type: application/json" \
     -d '{}'
   ```

### 4. Stripe Setup

1. **Create Product in Stripe Dashboard**:
   - Name: "Halal Food Club – Business Listing Membership"
   - Type: Recurring
   - Price: £69 GBP
   - Billing: Yearly

2. **Set up Webhook** (for local development):
   ```bash
   stripe listen --forward-to localhost:3000/api/webhook
   ```
   Copy the webhook secret to `STRIPE_WEBHOOK_SECRET` in `.env.local`

3. **Update Environment**:
   - Add your Stripe secret key to `STRIPE_SECRET_KEY`
   - Add your price ID to `STRIPE_PRICE_ID`

### 5. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

### 6. Seed Sample Data

```bash
npm run seed
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin dashboard
│   ├── api/               # API routes (Stripe, webhooks)
│   ├── auth/              # Authentication pages
│   ├── explore/           # Main restaurant discovery page
│   └── register/          # Business registration
├── components/            # React components
│   ├── forms/            # Form components
│   ├── map/              # Map-related components
│   └── ui/               # shadcn/ui components
├── contexts/             # React contexts (Auth)
├── hooks/                # Custom React hooks
├── lib/                  # Utilities and configurations
├── styles/               # Global styles
└── types/                # TypeScript type definitions

functions/                # Firebase Cloud Functions
firestore.rules          # Firestore security rules
storage.rules           # Storage security rules
```

## Key Components

### Restaurant Modal
- **Desktop**: 70% viewport width/height (`w-[70vw] h-[70vh]`)
- **Mobile**: Full-screen sheet with sticky CTAs
- **Features**: Best sellers carousel, reviews, menu tabs, gallery

### Map Integration
- **Search**: Postcode input + geolocation
- **Clustering**: Marker clustering for performance
- **Proximity**: Radius-based filtering (1-25 miles)
- **Controls**: Overlay controls with backdrop blur

### Business Registration
- **Multi-step Form**: Progress tracking with validation
- **File Uploads**: Menu PDFs, food photos, gallery images
- **Payment**: Stripe Checkout integration
- **Admin Approval**: Submissions require admin approval

### Admin Dashboard
- **Submissions Management**: View, approve, reject submissions
- **Real-time Updates**: Live status changes
- **Analytics**: Submission statistics and trends

## Firebase Collections

### `restaurants` (Public)
```typescript
{
  name: string
  cuisines: string[]
  address: string
  postcode: string
  location: GeoPoint
  phone: string
  website?: string
  halalCertified: boolean
  bestItems: BestItem[]
  menu: MenuSection[]
  socials: { instagram?, tiktok?, youtube?, facebook? }
  gallery: string[]
  videos: string[]
  ratingAvg: number
  ratingCount: number
  createdAt: Timestamp
  updatedAt: Timestamp
  ownerUid: string
}
```

### `submissions` (Protected)
Similar to restaurants with additional fields:
- `status: 'pending' | 'approved' | 'rejected'`
- `paid: boolean`
- `whyUs?: string`

### `users` (Protected)
```typescript
{
  uid: string
  email: string
  displayName: string
  role?: 'admin'
  createdAt: Timestamp
}
```

## Security

### Firestore Rules
- **Public read** for restaurants
- **Owner/admin write** for submissions
- **Admin-only** for user management
- **Authenticated users** can create reviews

### Storage Rules
- **User uploads** to `submissions/{uid}/`
- **Public read** for approved content
- **File size limits**: 5MB images, 10MB PDFs

## API Routes

### `/api/checkout` (POST)
Creates Stripe checkout session for £69/year subscription.

**Request**:
```json
{
  "submissionId": "sub_xxx",
  "ownerUid": "user_xxx", 
  "idToken": "firebase_token"
}
```

**Response**:
```json
{
  "url": "https://checkout.stripe.com/xxx"
}
```

### `/api/webhook` (POST)
Handles Stripe webhook events:
- `checkout.session.completed` → Mark submission as paid
- `customer.subscription.deleted` → Handle cancellations

## Cloud Functions

### `seedAdmins`
Sets admin role for users in `ADMIN_SEED_EMAILS`.

### `onSubmissionApproved`
Firestore trigger that creates restaurant document when submission is approved.

### `cleanupRejectedSubmissions`
Scheduled function to remove old rejected submissions.

## Development

### Running Tests
```bash
npm test
```

### Linting
```bash
npm run lint
```

### Building for Production
```bash
npm run build
```

## Deployment

### Vercel (Recommended)
1. Connect your GitHub repository
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main

### Firebase Hosting
```bash
npm run build
firebase deploy --only hosting
```

## Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Google Maps API key | ✅ |
| `NEXT_PUBLIC_FIREBASE_*` | Firebase client configuration | ✅ |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | ✅ |
| `STRIPE_SECRET_KEY` | Stripe secret key | ✅ |
| `STRIPE_PRICE_ID` | Stripe price ID for £69/year | ✅ |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret | ✅ |
| `FIREBASE_ADMIN_*` | Firebase Admin SDK credentials | ✅ |
| `ADMIN_SEED_EMAILS` | Comma-separated admin emails | ✅ |

## Support

For issues and feature requests, please create an issue in the GitHub repository.

## License

MIT License - see LICENSE file for details.  