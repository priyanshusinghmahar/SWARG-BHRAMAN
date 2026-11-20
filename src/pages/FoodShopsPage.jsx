import React from 'react';
import { useNavigate } from 'react-router-dom';
import FamousFoodAndShops from '../components/FamousFoodAndShops';

export default function FoodShopsPage({ foodShops }) {
  const navigate = useNavigate();

  return (
    <div className="pt-4 pb-12">
      <FamousFoodAndShops
        foodShops={foodShops}
        onLocateOnMap={() => navigate('/map')}
      />
    </div>
  );
}
