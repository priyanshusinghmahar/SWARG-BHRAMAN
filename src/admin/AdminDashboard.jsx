import React from 'react';
import AdminPortal from '../components/AdminPortal';

/**
 * AdminDashboard
 * Primary dashboard view for the isolated Admin subsystem at /admin.
 */
export default function AdminDashboard(props) {
  return (
    <div className="w-full">
      <AdminPortal {...props} />
    </div>
  );
}
