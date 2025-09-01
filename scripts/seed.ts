import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, GeoPoint, serverTimestamp } from 'firebase/firestore'
import { Restaurant } from '../src/types'

// Initialize Firebase (use same config as client)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const sampleRestaurants = [
  {
    name: "Al-Madina Restaurant",
    cuisines: ["Pakistani", "Indian"],
    address: "123 Ladypool Road, Sparkbrook, Birmingham",
    postcode: "B11 1JA",
    location: new GeoPoint(52.4625, -1.8848),
    phone: "0121 449 0712",
    website: "https://al-madina-birmingham.co.uk",
    halalCertified: true,
    bestItems: [
      {
        id: "1",
        name: "Lamb Biryani",
        price: 12.99,
        imageUrl: "https://images.unsplash.com/photo-1563379091339-03246963d293?w=400",
        description: "Aromatic basmati rice with tender lamb"
      },
      {
        id: "2", 
        name: "Chicken Karahi",
        price: 10.99,
        imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400",
        description: "Traditional Pakistani curry"
      }
    ],
    menu: [
      {
        section: "Starters",
        items: [
          { name: "Samosas (2 pieces)", price: 3.99, description: "Crispy pastries with spiced filling" },
          { name: "Seekh Kebab", price: 6.99, description: "Grilled minced lamb skewers" }
        ]
      },
      {
        section: "Main Courses", 
        items: [
          { name: "Lamb Biryani", price: 12.99, description: "Aromatic rice with tender lamb" },
          { name: "Chicken Karahi", price: 10.99, description: "Traditional Pakistani curry" },
          { name: "Beef Nihari", price: 11.99, description: "Slow-cooked beef stew" }
        ]
      }
    ],
    socials: {
      instagram: "@almadina_birmingham",
      facebook: "https://facebook.com/almadinabirmingham"
    },
    gallery: [
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400",
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400"
    ],
    videos: [],
    ratingAvg: 4.5,
    ratingCount: 127,
    ownerUid: "demo_owner_1"
  },
  {
    name: "Istanbul Grill",
    cuisines: ["Turkish"],
    address: "45 Green Street, London",
    postcode: "E7 8JF",
    location: new GeoPoint(51.5385, 0.0342),
    phone: "020 8472 3456",
    halalCertified: true,
    bestItems: [
      {
        id: "1",
        name: "Mixed Grill",
        price: 18.99,
        imageUrl: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400",
        description: "Assorted grilled meats with rice"
      }
    ],
    menu: [
      {
        section: "Grills",
        items: [
          { name: "Lamb Shish", price: 14.99, description: "Marinated lamb cubes" },
          { name: "Chicken Wings", price: 8.99, description: "Grilled spicy wings" }
        ]
      }
    ],
    socials: {
      instagram: "@istanbul_grill_london"
    },
    gallery: [
      "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400"
    ],
    videos: [],
    ratingAvg: 4.2,
    ratingCount: 89,
    ownerUid: "demo_owner_2"
  },
  {
    name: "Marrakech Express",
    cuisines: ["Moroccan"],
    address: "78 Curry Mile, Rusholme, Manchester",
    postcode: "M14 5AB",
    location: new GeoPoint(53.4508, -2.2374),
    phone: "0161 224 7890",
    halalCertified: true,
    bestItems: [
      {
        id: "1",
        name: "Lamb Tagine",
        price: 15.99,
        imageUrl: "https://images.unsplash.com/photo-1539136788836-5699e78bfc75?w=400",
        description: "Slow-cooked with apricots and almonds"
      }
    ],
    menu: [
      {
        section: "Tagines",
        items: [
          { name: "Chicken Tagine", price: 13.99, description: "With preserved lemons" },
          { name: "Vegetable Tagine", price: 11.99, description: "Seasonal vegetables" }
        ]
      }
    ],
    socials: {},
    gallery: [
      "https://images.unsplash.com/photo-1539136788836-5699e78bfc75?w=400"
    ],
    videos: [],
    ratingAvg: 4.7,
    ratingCount: 156,
    ownerUid: "demo_owner_3"
  }
]

async function seedDatabase() {
  console.log('Starting database seed...')
  
  try {
    for (const restaurant of sampleRestaurants) {
      const docData = {
        ...restaurant,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }
      
      const docRef = await addDoc(collection(db, 'restaurants'), docData)
      console.log(`Created restaurant: ${restaurant.name} (${docRef.id})`)
    }
    
    console.log('✅ Database seeded successfully!')
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  }
}

seedDatabase() 