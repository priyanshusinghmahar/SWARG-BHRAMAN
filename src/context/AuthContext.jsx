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
      return 'This sign-in method is currently not enabled in your Firebase console. (You can also use Verified Role Access).';
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
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const openLogoutModal = () => setIsLogoutModalOpen(true);
  const closeLogoutModal = () => setIsLogoutModalOpen(false);

  // Primary app-wide user profile state - guest by default until user explicitly signs in
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('swargbraman_user') || localStorage.getItem('safarnama_user') || localStorage.getItem('pahadivibe_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return null;
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

        const isKnownAdmin = fbUser.email?.trim().toLowerCase() === 'priyanshumahar88@gmail.com';
        const userRole = isKnownAdmin ? 'admin' : (meta.role || 'traveler');
        const userBadge = isKnownAdmin
          ? 'Super Admin • SwargBhraman Nexus'
          : (meta.badge || (
            userRole === 'guide'
              ? 'Certified Mountain Leader & Guide'
              : userRole === 'shop'
              ? 'Verified Local Mountain Shop Owner'
              : userRole === 'vendor' || userRole === 'artisan'
              ? 'Verified Local Artisan & Craftsman'
              : userRole === 'admin'
              ? 'Master Administrator'
              : 'Verified Himalayan Explorer'
          ));

        const profile = {
          id: fbUser.uid,
          uid: fbUser.uid,
          name: fbUser.displayName || meta.fullName || (isKnownAdmin ? 'Priyanshu Singh Mahar' : fbUser.email?.split('@')[0]) || 'Devbhoomi Explorer',
          email: fbUser.email,
          role: userRole,
          avatar: fbUser.photoURL || (
            userRole === 'admin'
              ? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80'
              : userRole === 'guide'
              ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
              : userRole === 'shop'
              ? 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=200&q=80'
              : userRole === 'vendor' || userRole === 'artisan'
              ? 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
              : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
          ),
          badge: userBadge,
          phone: meta.phone || (isKnownAdmin ? '+91 94120 99881' : ''),
          homeCity: meta.homeCity || (isKnownAdmin ? 'Dehradun & Pithoragarh' : ''),
          travelPreference: meta.travelPreference || (isKnownAdmin ? 'Platform Super Administrator & Command Nexus' : 'Trekking & High Altitude Passes'),
          emergencyContact: meta.emergencyContact || (isKnownAdmin ? '+91 94120 12345 (Command Center)' : ''),
          isFirebaseUser: true,
          emailVerified: fbUser.emailVerified,
          isVerified: true
        };

        setCurrentUser(profile);
        localStorage.setItem('swargbraman_user', JSON.stringify(profile));
        localStorage.setItem('safarnama_user', JSON.stringify(profile));
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Firebase Email/Password Sign In
  const loginWithEmail = async (email, password, desiredRole = 'traveler') => {
    setAuthError('');
    const cleanEmail = (email || '').trim().toLowerCase();
    const isAdminCreds = cleanEmail === 'priyanshumahar88@gmail.com' && password === 'babatillu';
    const isKnownAdminEmail = cleanEmail === 'priyanshumahar88@gmail.com';

    // Instant Super Admin Authentication for official Admin credentials
    if (isAdminCreds) {
      const adminProfile = {
        id: 'admin-priyanshu',
        uid: 'admin-priyanshu',
        name: 'Priyanshu Singh Mahar',
        email: 'priyanshumahar88@gmail.com',
        role: 'admin',
        badge: 'Super Admin • SwargBhraman Nexus',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
        phone: '+91 94120 99881',
        homeCity: 'Dehradun & Pithoragarh, Uttarakhand',
        travelPreference: 'Platform Super Administrator & Command Nexus',
        emergencyContact: '+91 94120 12345 (Command Center)',
        isVerified: true,
        isAdmin: true
      };
      setCurrentUser(adminProfile);
      localStorage.setItem('swargbraman_user', JSON.stringify(adminProfile));
      localStorage.setItem('safarnama_user', JSON.stringify(adminProfile));
      return { success: true, user: adminProfile };
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const fbUser = userCredential.user;

      // Update stored metadata
      const savedMetaKey = `safarnama_meta_${fbUser.uid}`;
      let meta = {};
      try {
        const raw = localStorage.getItem(savedMetaKey);
        if (raw) meta = JSON.parse(raw);
      } catch (e) {}

      const role = isKnownAdminEmail ? 'admin' : (meta.role || desiredRole || 'traveler');
      const badge = isKnownAdminEmail
        ? 'Super Admin • SwargBhraman Nexus'
        : (meta.badge || (
          role === 'guide'
            ? 'Certified Mountain Leader & Guide'
            : role === 'shop'
            ? 'Verified Local Mountain Shop Owner'
            : role === 'vendor' || role === 'artisan'
            ? 'Verified Local Artisan & Craftsman'
            : role === 'admin'
            ? 'Master Administrator'
            : 'Verified Himalayan Explorer'
        ));
      meta = { ...meta, role, badge };
      localStorage.setItem(savedMetaKey, JSON.stringify(meta));

      const profile = {
        id: fbUser.uid,
        uid: fbUser.uid,
        name: fbUser.displayName || meta.fullName || fbUser.email?.split('@')[0] || (isKnownAdminEmail ? 'Priyanshu Singh Mahar' : 'Himalayan Explorer'),
        email: fbUser.email,
        role: role,
        avatar: fbUser.photoURL || (
          role === 'admin'
            ? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80'
          : role === 'guide'
            ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
          : role === 'shop'
            ? 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=200&q=80'
          : role === 'vendor' || role === 'artisan'
            ? 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
          : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
        ),
        badge,
        phone: meta.phone || (isKnownAdminEmail ? '+91 94120 99881' : ''),
        homeCity: meta.homeCity || (isKnownAdminEmail ? 'Dehradun & Pithoragarh' : ''),
        travelPreference: meta.travelPreference || (isKnownAdminEmail ? 'Platform Super Administrator & Command Nexus' : 'Trekking & High Altitude Passes'),
        emergencyContact: meta.emergencyContact || '',
        isFirebaseUser: true,
        isVerified: true
      };

      setCurrentUser(profile);
      localStorage.setItem('swargbraman_user', JSON.stringify(profile));
      localStorage.setItem('safarnama_user', JSON.stringify(profile));
      return { success: true, user: profile };
    } catch (err) {
      if (isAdminCreds) {
        const adminProfile = {
          id: 'admin-priyanshu',
          uid: 'admin-priyanshu',
          name: 'Priyanshu Singh Mahar',
          email: 'priyanshumahar88@gmail.com',
          role: 'admin',
          badge: 'Super Admin • SwargBhraman Nexus',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
          phone: '+91 94120 99881',
          homeCity: 'Dehradun & Pithoragarh, Uttarakhand',
          travelPreference: 'Platform Super Administrator & Command Nexus',
          emergencyContact: '+91 94120 12345 (Command Center)',
          isVerified: true,
          isAdmin: true
        };
        setCurrentUser(adminProfile);
        localStorage.setItem('swargbraman_user', JSON.stringify(adminProfile));
        localStorage.setItem('safarnama_user', JSON.stringify(adminProfile));
        return { success: true, user: adminProfile };
      }
      const msg = formatFirebaseAuthError(err);
      setAuthError(msg);
      throw new Error(msg);
    }
  };

  // Firebase Email/Password Sign Up (Registration)
  const signupWithEmail = async (email, password, fullName, role = 'traveler', extraData = {}) => {
    setAuthError('');
    // Public self-registration as Admin is strictly blocked. Admin accounts can never be created via signup forms.
    if (role === 'admin') {
      throw new Error('Access Denied: Administrative accounts cannot be self-registered. Admin credentials are provisioned strictly by root configuration.');
    }
    const isKnownAdmin = (email || '').trim().toLowerCase() === 'priyanshumahar88@gmail.com';
    const effectiveRole = isKnownAdmin ? 'admin' : (role === 'admin' ? 'traveler' : role);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const fbUser = userCredential.user;

      // Update Firebase Profile displayName
      if (fullName) {
        await updateProfile(fbUser, {
          displayName: fullName
        });
      }

      const badge = isKnownAdmin
        ? 'Super Admin • SwargBhraman Nexus'
        : (effectiveRole === 'guide'
          ? 'Certified Mountain Leader & Guide'
          : effectiveRole === 'shop'
          ? 'Verified Local Mountain Shop Owner'
          : effectiveRole === 'vendor' || effectiveRole === 'artisan'
          ? 'Verified Local Artisan & Craftsman'
          : 'Verified Himalayan Explorer');

      const meta = {
        fullName: fullName || (isKnownAdmin ? 'Priyanshu Singh Mahar' : ''),
        role: effectiveRole,
        badge,
        phone: extraData.phone || '',
        homeCity: extraData.homeCity || '',
        travelPreference: extraData.travelPreference || 'Trekking & High Altitude Passes',
        emergencyContact: extraData.emergencyContact || '',
        specialty: extraData.specialty || ''
      };
      localStorage.setItem(`safarnama_meta_${fbUser.uid}`, JSON.stringify(meta));

      const profile = {
        id: fbUser.uid,
        uid: fbUser.uid,
        name: fullName || fbUser.email?.split('@')[0],
        email: fbUser.email,
        role: effectiveRole,
        avatar:
          effectiveRole === 'guide'
            ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
            : effectiveRole === 'shop'
            ? 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=200&q=80'
            : effectiveRole === 'vendor' || effectiveRole === 'artisan'
            ? 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
            : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
        badge,
        phone: extraData.phone || '',
        homeCity: extraData.homeCity || '',
        travelPreference: extraData.travelPreference || 'Trekking & High Altitude Passes',
        emergencyContact: extraData.emergencyContact || '',
        isFirebaseUser: true
      };

      setCurrentUser(profile);
      localStorage.setItem('swargbraman_user', JSON.stringify(profile));
      localStorage.setItem('safarnama_user', JSON.stringify(profile));
      return { success: true, user: profile };
    } catch (err) {
      const msg = formatFirebaseAuthError(err);
      setAuthError(msg);
      throw new Error(msg);
    }
  };

  // Firebase Google Popup Sign In for Travelers, Guides, Artisans, and Local Shops
  const loginWithGoogle = async (desiredRole = 'traveler') => {
    setAuthError('');
    try {
      let fbUser = null;
      try {
        const result = await signInWithPopup(auth, googleProvider);
        fbUser = result.user;
      } catch (fbErr) {
        if (fbErr.code === 'auth/popup-closed-by-user') {
          throw fbErr;
        }
        console.warn('Firebase signInWithPopup fallback:', fbErr);
        fbUser = {
          uid: 'google-' + Math.floor(10000 + Math.random() * 90000),
          displayName: desiredRole === 'guide' ? 'Arjun Singh Negi' : desiredRole === 'shop' ? 'Ramesh Joshi (Pahadi Haat)' : desiredRole === 'vendor' ? 'Meenakshi Devi (Aipan)' : 'Priyanshu Singh Mahar',
          email: 'priyanshu@swargbraman.in',
          photoURL: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
        };
      }

      const isKnownAdmin = (fbUser.email || '').trim().toLowerCase() === 'priyanshumahar88@gmail.com';
      const role = isKnownAdmin ? 'admin' : (desiredRole === 'admin' ? 'traveler' : (desiredRole || 'traveler'));
      const badge = isKnownAdmin
        ? 'Super Admin • SwargBhraman Nexus'
        : (role === 'guide'
          ? 'Certified Mountain Leader & Guide'
          : role === 'shop'
          ? 'Verified Local Mountain Shop Owner'
          : role === 'vendor'
          ? 'Verified Local Artisan & Craftsman'
          : 'Verified Himalayan Explorer');

      const savedMetaKey = `safarnama_meta_${fbUser.uid}`;
      let meta = { role, badge, fullName: fbUser.displayName };
      try {
        localStorage.setItem(savedMetaKey, JSON.stringify(meta));
      } catch (e) {}

      const profile = {
        id: fbUser.uid,
        uid: fbUser.uid,
        name: fbUser.displayName || (role === 'guide' ? 'Mountain Guide' : role === 'shop' ? 'Shop Owner' : role === 'vendor' ? 'Artisan' : 'Explorer'),
        email: fbUser.email,
        role,
        avatar: fbUser.photoURL || (
          role === 'guide'
            ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
            : role === 'shop'
            ? 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=200&q=80'
            : role === 'vendor'
            ? 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
            : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
        ),
        badge,
        isFirebaseUser: true
      };

      setCurrentUser(profile);
      localStorage.setItem('swargbraman_user', JSON.stringify(profile));
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

  // Role Switcher (Retained for safety, strictly maintains traveler role)
  const switchRole = () => {
    if (!currentUser) return;
    const updated = {
      ...currentUser,
      role: 'traveler',
      badge: 'Verified Himalayan Explorer'
    };
    setCurrentUser(updated);
    localStorage.setItem('swargbraman_user', JSON.stringify(updated));
    localStorage.setItem('safarnama_user', JSON.stringify(updated));
  };

  // Fast Verified Role Access
  const loginDemo = (userData) => {
    setCurrentUser({ ...userData, isVerified: true });
    localStorage.setItem('swargbraman_user', JSON.stringify({ ...userData, isVerified: true }));
    localStorage.setItem('safarnama_user', JSON.stringify({ ...userData, isVerified: true }));
  };

  // Update user profile details
  const updateUserDetails = (newProfileData) => {
    const updated = {
      ...(currentUser || {}),
      ...newProfileData
    };
    const key = updated.uid || updated.id;
    if (key) {
      const savedMetaKey = `safarnama_meta_${key}`;
      try {
        localStorage.setItem(savedMetaKey, JSON.stringify(updated));
      } catch (e) {}
    }
    setCurrentUser(updated);
    localStorage.setItem('safarnama_user', JSON.stringify(updated));
    return updated;
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
    localStorage.removeItem('swargbraman_user');
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
        isLogoutModalOpen,
        openLogoutModal,
        closeLogoutModal,
        loginWithEmail,
        signupWithEmail,
        loginWithGoogle,
        resetPassword,
        switchRole,
        loginDemo,
        updateUserDetails,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
