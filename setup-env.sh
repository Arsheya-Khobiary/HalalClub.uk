#!/bin/bash

echo "Setting up Halal Food Club environment..."

# Create .env.local file
cat > .env.local << 'EOF'
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
EOF

echo "✅ Created .env.local file"
echo ""
echo "⚠️  IMPORTANT: You still need to add your actual Stripe secret key and Firebase Admin credentials:"
echo "   - STRIPE_SECRET_KEY (from Stripe Dashboard)"
echo "   - STRIPE_WEBHOOK_SECRET (from 'stripe listen' command)"
echo "   - FIREBASE_ADMIN_CLIENT_EMAIL (from Firebase service account)"
echo "   - FIREBASE_ADMIN_PRIVATE_KEY (from Firebase service account)"
echo ""
echo "🚀 Run 'npm run dev' to start the development server" 