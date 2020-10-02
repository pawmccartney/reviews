import React from 'react';

const TravelerRating = ({filterByRatings}) => (
  <div className='reviews-selections-rating'>
    <div><b>Traveler rating</b></div>
    <label className='reviews-selections-excellent'>
      <input onClick={filterByRatings} type='checkbox'></input>
      <div className='reviews-selections-rating-score '>Excellent</div>
      <div className='reviews-selections-rating-bars'>
        <div className='reviews-selections-rating-outerBar'>
          <div className='reviews-selections-rating-innerBar'></div>
        </div>
      </div>
      <div className='reviews-selections-rating-count'>1234</div>
    </label>
    <br></br>
    <label className='reviews-selections-veryGood'>
      <input onClick={filterByRatings} type='checkbox'></input>
      <div className='reviews-selections-rating-score '>Very Googid</div>
      <div className='reviews-selections-rating-bars'>
        <div className='reviews-selections-rating-outerBar'>
          <div className='reviews-selections-rating-innerBar'></div>
        </div>
      </div>
      <div className='reviews-selections-rating-count'>1234</div>
    </label>
    <br></br>
    <label className='reviews-selections-average'>
      <input onClick={filterByRatings} type='checkbox'></input>
      <div className='reviews-selections-rating-score '>Average</div>
      <div className='reviews-selections-rating-bars'>
        <div className='reviews-selections-rating-outerBar'>
          <div className='reviews-selections-rating-innerBar'></div>
        </div>
      </div>
      <div className='reviews-selections-rating-count'>1234</div>
    </label>
    <br></br>
    <label className='reviews-selections-poor'>
      <input onClick={filterByRatings} type='checkbox'></input>
      <div className='reviews-selections-rating-score '>Poor</div>
      <div className='reviews-selections-rating-bars'>
        <div className='reviews-selections-rating-outerBar'>
          <div className='reviews-selections-rating-innerBar'></div>
        </div>
      </div>
      <div className='reviews-selections-rating-count'>1234</div>
    </label>
    <br></br>
    <label className='reviews-selections-terrible'>
      <input onClick={filterByRatings} type='checkbox'></input>
      <div className='reviews-selections-rating-score '>Terrible</div>
      <div className='reviews-selections-rating-bars'>
        <div className='reviews-selections-rating-outerBar'>
          <div className='reviews-selections-rating-innerBar'></div>
        </div>
      </div>
      <div className='reviews-selections-rating-count'>1234</div>
    </label>
  </div>
);

export default TravelerRating;