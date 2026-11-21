import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  auth,
  googleProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  updateProfile,
  sendPasswordResetEmail
} from '../firebase';

const AuthContext = createContext(null);

// Human-friendly Firebase error message formatter
export function formatFirebaseAuthError(error) {
  if (!error) return '';
  const code = error.code || '';
  
  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
      return 'Invalid email or password. Please double check and try again.';
    case 'auth/user-not-found':
      return 'No account exists with this email address. Switch to Register to create one.';
    case 'auth/email-already-in-use':
      return 'An account already exists with this email. Please sign in instead.';
    case 'auth/weak-password':
      return 'Password is too weak. Please use at least 6 characters.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/popup-closed-by-user':
      return 'Google sign-in popup was closed before completion.';
    case 'auth/network-request-failed':
      return 'Network error: Please check your internet connection.';
    case 'auth/operation-not-allowed':
      return 'This sign-in method is currently not enabled in your Firebase console. (You can also use 1-Click Instant Demo login).';
    case 'auth/too-many-requests':
      return 'Too many attempts. Access has been temporarily restricted for security. Please try again later.';
    default:
      return error.message || 'Authentication failed. Please try again.';
  }
}

export const AuthProvider = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState('');

  // Primary app-wide user profile state
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('safarnama_user') || localStorage.getItem('pahadivibe_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    // Default demo session for smooth onboarding
    return {
      id: 'usr-1',
      name: 'Priyanshu Singh Mahar',
      email: 'priyanshu@safarnama.in',
      role: 'traveler', // 'traveler' | 'vendor' | 'admin'
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      badge: 'Verified Himalayan Explorer',
      isDemo: true
    };
  });

  // Listen for real Firebase Auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      setFirebaseUser(fbUser);
      if (fbUser) {
        // Retrieve persistent role/metadata from localStorage if previously stored
        const savedMetaKey = `safarnama_meta_${fbUser.uid}`;
        let meta = {};
        try {
          const raw = localStorage.getItem(savedMetaKey);
          if (raw) meta = JSON.parse(raw);
        } catch (e) {}

        const userRole = meta.role || 'traveler';
        const userBadge = meta.badge || (
          userRole === 'vendor'
            ? 'Master Artisan Partner'
            : userRole === 'admin'
            ? 'State Administrator'
            : 'Verified Himalayan Explorer'
        );

        const profile = {
          id: fbUser.uid,
          uid: fbUser.uid,
          name: fbUser.displayName || meta.fullName || fbUser.email?.split('@')[0] || 'Devbhoomi Explorer',
          email: fbUser.email,
          role: userRole,
          avatar: fbUser.photoURL || (
            userRole === 'vendor'
              ? 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
              : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
          ),
          badge: userBadge,
          phone: meta.phone || '',
          studioName: meta.studioName || '',
          isFirebaseUser: true,
          emailVerified: fbUser.emailVerified
        };

        setCurrentUser(profile);
        localStorage.setItem('safarnama_user', JSON.stringify(profile));
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Firebase Email/Password Sign In
  const loginWithEmail = async (email, password, role = 'traveler') => {
    setAuthError('');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const fbUser = userCredential.user;

      // Update stored metadata role
      const savedMetaKey = `safarnama_meta_${fbUser.uid}`;
      let meta = {};
      try {
        const raw = localStorage.getItem(savedMetaKey);
        if (raw) meta = JSON.parse(raw);
      } catch (e) {}

      const effectiveRole = role || meta.role || 'traveler';
      const badge = effectiveRole === 'vendor'
        ? 'Master Artisan Partner'
        : effectiveRole === 'admin'
        ? 'State Administrator'
        : 'Verified Himalayan Explorer';

      meta = { ...meta, role: effectiveRole, badge };
      localStorage.setItem(savedMetaKey, JSON.stringify(meta));

      const profile = {
        id: fbUser.uid,
        uid: fbUser.uid,
        name: fbUser.displayName || meta.fullName || fbUser.email?.split('@')[0] || 'Himalayan Explorer',
        email: fbUser.email,
        role: effectiveRole,
        avatar: fbUser.photoURL || (
          effectiveRole === 'vendor'
            ? 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
            : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
        ),
        badge,
        phone: meta.phone || '',
        studioName: meta.studioName || '',
        isFirebaseUser: true
      };

      setCurrentUser(profile);
      localStorage.setItem('safarnama_user', JSON.stringify(profile));
      return { success: true, user: profile };
    } catch (err) {
      const msg = formatFirebaseAuthError(err);
      setAuthError(msg);
      throw new Error(msg);
    }
  };

  // Firebase Email/Password Sign Up (Registration)
  const signupWithEmail = async (email, password, fullName, role = 'traveler', extraData = {}) => {
    setAuthError('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const fbUser = userCredential.user;

      // Update Firebase Profile displayName
      if (fullName) {
        await updateProfile(fbUser, {
          displayName: fullName
        });
      }

      const badge = role === 'vendor'
        ? 'Master Artisan Partner'
        : role === 'admin'
        ? 'State Administrator'
        : 'Verified Himalayan Explorer';

      const meta = {
        fullName,
        role,
        badge,
        phone: extraData.phone || '',
        studioName: extraData.studioName || ''
      };
      localStorage.setItem(`safarnama_meta_${fbUser.uid}`, JSON.stringify(meta));

      const profile = {
        id: fbUser.uid,
        uid: fbUser.uid,
        name: fullName || fbUser.email?.split('@')[0],
        email: fbUser.email,
        role,
        avatar: role === 'vendor'
          ? 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
          : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
        badge,
        phone: extraData.phone || '',
        studioName: extraData.studioName || '',
        isFirebaseUser: true
      };

      setCurrentUser(profile);
      localStorage.setItem('safarnama_user', JSON.stringify(profile));
      return { success: true, user: profile };
    } catch (err) {
      const msg = formatFirebaseAuthError(err);
      setAuthError(msg);
      throw new Error(msg);
    }
  };

  // Firebase Google One-Tap / Popup Sign In
  const loginWithGoogle = async (role = 'traveler') => {
    setAuthError('');
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const fbUser = result.user;

      const savedMetaKey = `safarnama_meta_${fbUser.uid}`;
      let meta = {};
      try {
        const raw = localStorage.getItem(savedMetaKey);
        if (raw) meta = JSON.parse(raw);
      } catch (e) {}

      const effectiveRole = meta.role || role || 'traveler';
      const badge = effectiveRole === 'vendor'
        ? 'Master Artisan Partner'
        : effectiveRole === 'admin'
        ? 'State Administrator'
        : 'Verified Himalayan Explorer';

      meta = { ...meta, role: effectiveRole, badge };
      localStorage.setItem(savedMetaKey, JSON.stringify(meta));

      const profile = {
        id: fbUser.uid,
        uid: fbUser.uid,
        name: fbUser.displayName || 'Google Explorer',
        email: fbUser.email,
        role: effectiveRole,
        avatar: fbUser.photoURL || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
        badge,
        isFirebaseUser: true
      };

      setCurrentUser(profile);
      localStorage.setItem('safarnama_user', JSON.stringify(profile));
      return { success: true, user: profile };
    } catch (err) {
      const msg = formatFirebaseAuthError(err);
      setAuthError(msg);
      throw new Error(msg);
    }
  };

  // Firebase Password Reset Email
  const resetPassword = async (email) => {
    setAuthError('');
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (err) {
      const msg = formatFirebaseAuthError(err);
      setAuthError(msg);
      throw new Error(msg);
    }
  };

  // Role Switcher for active session
  const switchRole = (newRole) => {
    if (!currentUser) return;
    const badge = newRole === 'vendor'
      ? 'Master Artisan Partner'
      : newRole === 'admin'
      ? 'State Administrator'
      : 'Verified Himalayan Explorer';

    const updated = {
      ...currentUser,
      role: newRole,
      badge
    };

    if (currentUser.uid) {
      const savedMetaKey = `safarnama_meta_${currentUser.uid}`;
      try {
        const raw = localStorage.getItem(savedMetaKey);
        const meta = raw ? JSON.parse(raw) : {};
        localStorage.setItem(savedMetaKey, JSON.stringify({ ...meta, role: newRole, badge }));
      } catch (e) {}
    }

    setCurrentUser(updated);
    localStorage.setItem('safarnama_user', JSON.stringify(updated));
  };

  // Fast 1-Click Instant Demo Login (Zero friction)
  const loginDemo = (demoUserData) => {
    setCurrentUser({ ...demoUserData, isDemo: true });
    localStorage.setItem('safarnama_user', JSON.stringify({ ...demoUserData, isDemo: true }));
  };

  // General login method for backward compatibility
  const login = (userData) => {
    setCurrentUser(userData);
    localStorage.setItem('safarnama_user', JSON.stringify(userData));
  };

  // Universal Sign Out
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.warn('Firebase signout note:', e);
    }
    setCurrentUser(null);
    setFirebaseUser(null);
    localStorage.removeItem('safarnama_user');
    localStorage.removeItem('pahadivibe_user');
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        firebaseUser,
        loading,
        authError,
        setAuthError,
        isLoggedIn: !!currentUser,
        loginWithEmail,
        signupWithEmail,
        loginWithGoogle,
        resetPassword,
        switchRole,
        loginDemo,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
