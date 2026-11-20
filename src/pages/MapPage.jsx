import React from 'react';
import InteractiveMap from '../components/InteractiveMap';

export default function MapPage({
  destinations,
  artisans,
  foodShops,
  events,
  sites = [],
  onOpenBookingModal
}) {
  return (
    <div className="pt-4 pb-12">
      <InteractiveMap
        destinations={destinations}
        artisans={artisans}
        foodShops={foodShops}
        events={events}
        sites={sites}
        onSelectDestination={(dest) => onOpenBookingModal(dest)}
        onSelectArtisan={(art) => onOpenBookingModal({
          title: `${art.workshopOffered} with ${art.name}`,
          pricePerPerson: art.workshopPrice,
          startingPrice: art.workshopPrice
        })}
        onSelectShop={() => {}}
        onSelectEvent={(evt) => onOpenBookingModal(evt)}
      />
    </div>
  );
}
