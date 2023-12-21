import React from 'react';

const StarIcon = ({ filled }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path fill={filled ? 'gold' : 'gray'} d="M12 2L9.9 8l-6.6.6 5 4.9-1.5 6.3 6.2-3.7 6.3 3.8L17 13l5-4.8-6.6-.7L12 2zm0 9l-3.5 3.4.8 4.2L12 15V11z"/>
  </svg>
);

const Rating = ({ value }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      // If the current star is less than or equal to the rating value, fill it
      const filled = i <= value;

      stars.push(
        <StarIcon key={i} filled={filled} />
      );
    }
    return stars;
  };

  return (
    <div>
      {renderStars()}
    </div>
  );
};

export default Rating;