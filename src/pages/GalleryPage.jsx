import React from 'react';
import { useNavigate } from 'react-router-dom';
import GallerySection from '../components/GallerySection';

export default function GalleryPage({ photos }) {
  const navigate = useNavigate();

  return (
    <div className="pt-4 pb-12">
      <GallerySection
        photos={photos}
        onPlanTripToLocation={() => navigate('/ai-planner')}
      />
    </div>
  );
}
