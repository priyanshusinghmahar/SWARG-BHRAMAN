import React from 'react';
import { useNavigate } from 'react-router-dom';
import GallerySection from '../components/GallerySection';

export default function GalleryPage({ photos, onAddNewPhoto }) {
  const navigate = useNavigate();

  return (
    <div className="pt-4 pb-12">
      <GallerySection
        photos={photos}
        onAddNewPhoto={onAddNewPhoto}
        onPlanTripToLocation={() => navigate('/destinations')}
      />
    </div>
  );
}
