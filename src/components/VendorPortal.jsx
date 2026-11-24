import React from 'react';
import ProviderPortal from './ProviderPortal';

// Backward compatibility alias: VendorPortal now delegates to the comprehensive ProviderPortal
export default function VendorPortal(props) {
  return <ProviderPortal {...props} />;
}
