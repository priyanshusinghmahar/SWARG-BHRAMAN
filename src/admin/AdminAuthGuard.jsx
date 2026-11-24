import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert, Loader2 } from 'lucide-react';

/**
 * AdminAuthGuard
 * Restricts all /admin/* routes strictly to authorized administrators.
 * If unauthorized or unauthenticated, redirects to /admin/login.
 */
export default function AdminAuthGuard({ children }) {
  const { currentUser, isLoggedIn, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070B19] text-amber-400 flex flex-col items-center justify-center p-4">
        <Loader2 className="w-10 h-10 animate-spin text-amber-500 mb-3" />
        <span className="text-xs uppercase tracking-widest font-mono text-slate-400">
          Verifying Administrative Credentials...
        </span>
      </div>
    );
  }

  const isAdmin = isLoggedIn && currentUser && (
    currentUser.role === 'admin' ||
    currentUser.email?.trim().toLowerCase() === 'priyanshumahar88@gmail.com'
  );

  if (!isAdmin) {
    return (
      <Navigate
        to={`/admin/login?redirect=${encodeURIComponent(location.pathname)}`}
        replace
        state={{
          accessDenied: true,
          attemptedUrl: location.pathname,
          message: 'Security Notice: This portal is strictly restricted to authorized administrators. Please log in with admin credentials.'
        }}
      />
    );
  }

  return children;
}
