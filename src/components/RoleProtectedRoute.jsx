import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Role-Based Route Protection Guard
 * - traveler: cannot access /portal/admin and /portal/provider
 * - vendor/guide: cannot access /portal/admin; can access normal website & /portal/provider
 * - admin: can access all portals & pages
 * - visitor (unauthenticated): can access normal website only; redirected to /login for portals
 */
export default function RoleProtectedRoute({
  children,
  allowedRoles = [],
  requireAuth = true,
  portalName = 'portal'
}) {
  const { currentUser, isLoggedIn, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#080D1A] text-amber-400">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-400" />
      </div>
    );
  }

  // 1. Unauthenticated visitor attempting to access protected portals
  if (requireAuth && (!isLoggedIn || !currentUser)) {
    const isProviderPortal = location.pathname.includes('/portal/provider') || location.pathname.includes('/portal/vendor');
    const isAdminPortal = location.pathname.startsWith('/admin') || location.pathname.includes('/portal/admin');
    const loginTarget = isProviderPortal 
      ? `/provider/login?redirect=${encodeURIComponent(location.pathname)}` 
      : isAdminPortal 
      ? `/admin/login?redirect=${encodeURIComponent(location.pathname)}` 
      : `/login?redirect=${encodeURIComponent(location.pathname)}`;

    return (
      <Navigate
        to={loginTarget}
        replace
        state={{
          accessDenied: true,
          message: `Sign in required: Please sign in to access the ${portalName}. Visitors have access to the main website.`
        }}
      />
    );
  }

  const userRole = currentUser?.role || 'visitor';

  // 2. Admin has universal access to everything
  if (userRole === 'admin') {
    return children;
  }

  // 3. Strict Role-based Permission Boundary
  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    // If Traveler tries to access admin or vendor portals -> redirect to traveler user hub
    if (userRole === 'traveler') {
      return (
        <Navigate
          to="/portal/user"
          replace
          state={{
            accessDenied: true,
            attemptedPortal: portalName,
            message: `Access Denied: Your current profile is Traveler (Explorer). Traveler accounts cannot access the ${portalName}.`
          }}
        />
      );
    }

    // If Vendor/Guide tries to access admin portal -> redirect to provider portal
    if (userRole === 'vendor' || userRole === 'guide') {
      return (
        <Navigate
          to="/portal/provider"
          replace
          state={{
            accessDenied: true,
            attemptedPortal: portalName,
            message: 'Access Denied: Vendor accounts cannot access the Admin Control Nexus. You have access to the Vendor Portal and main website.'
          }}
        />
      );
    }

    // Default safe fallback
    return <Navigate to="/login" replace />;
  }

  return children;
}
