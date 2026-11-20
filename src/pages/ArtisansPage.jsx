import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArtisansSection from '../components/ArtisansSection';

export default function ArtisansPage({ artisans, onBookWorkshop }) {
  const navigate = useNavigate();

  return (
    <div className="pt-4 pb-12">
      <ArtisansSection
        artisans={artisans}
        onBookWorkshop={onBookWorkshop}
        onLocateOnMap={() => navigate('/map')}
        onOpenArtisanChat={(art) => {
          window.open(`https://wa.me/${art.whatsapp}?text=Namaste!%20I%20am%20interested%20in%20your%20craft.`, '_blank');
        }}
      />
    </div>
  );
}
