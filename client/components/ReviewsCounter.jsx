import React from 'react';
import StarRatings from 'react-star-ratings';

const ReviewsCounter = (props) => {
  let { avgRating, totalReviews } = props;
  return (
    <div className='counter-header' id='scrollTop'>
      <h3 className='counter-header-rating'>{avgRating}</h3>
      <StarRatings
        rating={avgRating}
        numberOfStars={5}
        starDimension={'28px'}
        starSpacing={'1px'}
        starRatedColor={'#000000'}
        starEmptyColor={'#ffffff'}
        svgIconPath={'M 14.5 1.5 c -0.7 0 -1.4 0.5 -1.6 1.2 l -2 6 H 4.5 c -0.8 0 -1.4 0.5 -1.6 1.2 s 0 1.5 0.6 1.9 l 5.2 3.8 l -2 6 c -0.2 0.7 0 1.5 0.6 1.9 c 0.3 0.2 0.7 0.3 1 0.3 c 0.4 0 0.7 -0.1 1 -0.3 l 5.2 -3.8 l 5.1 3.7 c 0.3 0.2 0.7 0.3 1 0.3 c 0.4 0 0.7 -0.1 1 -0.3 c 0.6 -0.4 0.9 -1.2 0.6 -2 l -2 -6 l 5.1 -3.7 c 0.5 -0.3 0.8 -0.8 0.8 -1.4 c 0 -1 -0.8 -1.7 -1.7 -1.7 h -6.3 l -1.9 -6 c -0.3 -0.6 -0.9 -1.1 -1.7 -1.1 Z'}
        svgIconViewBox={'0 0 28.5 26'}
      />
      <p>{totalReviews} Reviews</p>
      <a href='#' className='button--block button--white'>Write a Review</a>
    </div>

  );
};
export default ReviewsCounter;