import React from 'react';
import AITripPlanner from '../components/AITripPlanner';

export default function AITripPlannerPage({ onBookGeneratedPlan }) {
  return (
    <div className="pt-4 pb-12">
      <AITripPlanner
        onBookGeneratedPlan={onBookGeneratedPlan}
        initialBudget={25000}
      />
    </div>
  );
}
