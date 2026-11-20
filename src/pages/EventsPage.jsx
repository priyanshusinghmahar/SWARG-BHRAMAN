import React from 'react';
import { useNavigate } from 'react-router-dom';
import LiveUpcomingEvents from '../components/LiveUpcomingEvents';

export default function EventsPage({ events, onBookEventPass }) {
  const navigate = useNavigate();

  return (
    <div className="pt-4 pb-12">
      <LiveUpcomingEvents
        events={events}
        onLocateOnMap={() => navigate('/map')}
        onBookEventPass={onBookEventPass}
      />
    </div>
  );
}
