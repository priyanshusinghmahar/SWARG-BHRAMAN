import React from 'react';
import ReviewsSection from '../components/ReviewsSection';

export default function ReviewsPage({ reviews, onAddNewReview }) {
  return (
    <div className="pt-4 pb-12">
      <ReviewsSection
        reviews={reviews}
        onAddNewReview={onAddNewReview}
      />
    </div>
  );
}
