import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { auth, db } from '@/lib/firebase';
import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  User
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

export interface UserProfile {
  id: string; // Firebase UID
  name: string;
  email: string;
  avatar: string;
  bio: string;
  skills: string[];
  interests: string[];
  region: string;
  regionFlag: string;
  joinedAt: string;
  discord?: string;
  twitter?: string;
  github?: string; // used for LinkedIn in current form
  role?: string;
  institution?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  registerWithEmail: (email: string, pass: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in, fetch profile from Firestore
        const userDocRef = doc(db, 'users', firebaseUser.uid);
        const userSnapshot = await getDoc(userDocRef);

        if (userSnapshot.exists()) {
          setUser(userSnapshot.data() as UserProfile);
        } else {
          // New user (or profile doesn't exist yet)
          // Create a basic profile in state, but don't save to DB until they complete the form
          // OR save a basic one now. Let's save a basic one now to ensure consistency
          const basicProfile: UserProfile = {
            id: firebaseUser.uid,
            name: firebaseUser.displayName || 'Anonymous',
            email: firebaseUser.email || '',
            avatar: firebaseUser.photoURL || '',
            bio: '',
            skills: [],
            interests: [],
            region: 'Unknown',
            regionFlag: '🌍',
            joinedAt: new Date().toISOString(),
          };

          await setDoc(userDocRef, basicProfile);
          setUser(basicProfile);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };



  const loginWithEmail = async (email: string, pass: string) => {
    await signInWithEmailAndPassword(auth, email, pass);
  };

  const registerWithEmail = async (email: string, pass: string, name: string) => {
    const res = await createUserWithEmailAndPassword(auth, email, pass);
    // Create initial profile
    const userDocRef = doc(db, 'users', res.user.uid);
    const basicProfile: UserProfile = {
      id: res.user.uid,
      name: name || 'Member',
      email: email,
      avatar: '',
      bio: '',
      skills: [],
      interests: [],
      region: 'Unknown',
      regionFlag: '🌍',
      joinedAt: new Date().toISOString(),
    };
    await setDoc(userDocRef, basicProfile);
    setUser(basicProfile);
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!auth.currentUser) return;

    // Optimistic update
    setUser((prev) => prev ? { ...prev, ...updates } : null);

    // Update in Firestore
    const userDocRef = doc(db, 'users', auth.currentUser.uid);
    await updateDoc(userDocRef, updates);
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin',
      loginWithGoogle,
      loginWithEmail,
      registerWithEmail,
      logout,
      updateProfile
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
