import React from 'react';

const TravelerRating = ({filterByRatings}) => (
  <div className='reviews-selections-rating'>
    <div><b>Traveler rating</b></div>
    <label className='reviews-selections-excellent'>
      <input onClick={filterByRatings} type='checkbox'></input>
      Excellent
      <div className='reviews-selections-rating-bars'>
        <div className='reviews-selections-rating-outerBar'>
          <div className='reviews-selections-rating-innerBar'></div>
        </div>
      </div>
      <div className='reviews-selections-rating-count'>1234</div>
    </label>
    <br></br>
    <label className='reviews-selections-veryGood'>
      <input type='checkbox'></input>
      Very Good
      <div className='reviews-selections-rating-bars'>
        <div className='reviews-selections-rating-outerBar'>
          <div className='reviews-selections-rating-innerBar'></div>
        </div>
      </div>
      <div className='reviews-selections-rating-count'>1234</div>
    </label>
    <br></br>
    <label className='reviews-selections-average'>
      <input type='checkbox'></input>
      Avegage
      <div className='reviews-selections-rating-bars'>
        <div className='reviews-selections-rating-outerBar'>
          <div className='reviews-selections-rating-innerBar'></div>
        </div>
      </div>
      <div className='reviews-selections-rating-count'>1234</div>
    </label>
    <br></br>
    <label className='reviews-selections-poor'>
      <input type='checkbox'></input>
      Poor
      <div className='reviews-selections-rating-bars'>
        <div className='reviews-selections-rating-outerBar'>
          <div className='reviews-selections-rating-innerBar'></div>
        </div>
      </div>
      <div className='reviews-selections-rating-count'>1234</div>
    </label>
    <br></br>
    <label className='reviews-selections-terrible'>
      <input type='checkbox'></input>
      Terrible
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