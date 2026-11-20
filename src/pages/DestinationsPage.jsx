import React from 'react';
import { useNavigate } from 'react-router-dom';
import FamousLocations from '../components/FamousLocations';

export default function DestinationsPage({ destinations, onBookLocation }) {
  const navigate = useNavigate();

  return (
    <div className="pt-4 pb-12">
      <FamousLocations
        destinations={destinations}
        onBookLocation={onBookLocation}
        onLocateOnMap={(item) => navigate('/map')}
        onAddToAIPlan={() => navigate('/ai-planner')}
      />
    </div>
  );
}
