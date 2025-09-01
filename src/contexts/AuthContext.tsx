'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { 
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from 'firebase/auth'
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'
import { User as AppUser } from '@/types'

interface AuthContextType {
  user: User | null
  userProfile: AppUser | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, displayName: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  logout: () => Promise<void>
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userProfile, setUserProfile] = useState<AppUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Skip auth if Firebase isn't initialized
    if (!auth) {
      setLoading(false)
      return
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user)
      
      if (user && db) {
        // Fetch user profile with role
        const userDoc = await getDoc(doc(db, 'users', user.uid))
        if (userDoc.exists()) {
          setUserProfile(userDoc.data() as AppUser)
        } else {
          // Create user profile if it doesn't exist
          const newProfile: AppUser = {
            uid: user.uid,
            email: user.email!,
            displayName: user.displayName || 'Anonymous',
            createdAt: serverTimestamp() as any,
          }
          await setDoc(doc(db, 'users', user.uid), newProfile)
          setUserProfile(newProfile)
        }
      } else {
        setUserProfile(null)
      }
      
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const signIn = async (email: string, password: string) => {
    if (!auth) throw new Error('Auth not initialized')
    await signInWithEmailAndPassword(auth, email, password)
  }

  const signUp = async (email: string, password: string, displayName: string) => {
    if (!auth || !db) throw new Error('Auth not initialized')
    const { user } = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(user, { displayName })
    
    const userProfile: AppUser = {
      uid: user.uid,
      email: user.email!,
      displayName,
      createdAt: serverTimestamp() as any,
    }
    await setDoc(doc(db, 'users', user.uid), userProfile)
  }

  const signInWithGoogle = async () => {
    if (!auth) throw new Error('Auth not initialized')
    const provider = new GoogleAuthProvider()
    await signInWithPopup(auth, provider)
  }

  const logout = async () => {
    if (!auth) throw new Error('Auth not initialized')
    await signOut(auth)
  }

  const isAdmin = userProfile?.role === 'admin'

  const value = {
    user,
    userProfile,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    logout,
    isAdmin,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 