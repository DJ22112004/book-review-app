import React from 'react';

const ReviewList = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return <p style={{ color: '#4b5563', marginTop: '1rem' }}>No reviews yet. Be the first to review!</p>;
  }

  return (
    <div className="review-list">
      <h3>Reviews</h3>
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review._id} className="review-card">
            <p className="user-name">{review.user.name}</p>
            <div className="rating">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < review.rating ? 'rating-star' : 'rating-star-empty'}>
                  ★
                </span>
              ))}
            </div>
            <p>{review.reviewText}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;