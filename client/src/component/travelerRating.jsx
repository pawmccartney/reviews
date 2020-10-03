import React from 'react';

const TravelerRating = ({filterByRatings}) => (
  <div className='reviews-selections-rating'>
    <div><b>Traveler rating</b></div>
    <br></br>
    <div className='reviews-selections-container'>
      <div className='reviews-selections-checks'>
        <label className='reviews-selections-excellent'>
          <input onClick={filterByRatings} type='checkbox'></input>
          <div className='reviews-selections-rating-score '>Excellent</div>
        </label>
        <br></br>
        <label className='reviews-selections-veryGood'>
          <input onClick={filterByRatings} type='checkbox'></input>
          <div className='reviews-selections-rating-score '>Very Good</div>
        </label>
        <br></br>
        <label className='reviews-selections-average'>
          <input onClick={filterByRatings} type='checkbox'></input>
          <div className='reviews-selections-rating-score '>Average</div>
        </label>
        <br></br>
        <label className='reviews-selections-poor'>
          <input onClick={filterByRatings} type='checkbox'></input>
          <div className='reviews-selections-rating-score '>Poor</div>
        </label>
        <br></br>
        <label className='reviews-selections-terrible'>
          <input onClick={filterByRatings} type='checkbox'></input>
          <div className='reviews-selections-rating-score '>Terrible</div>
        </label>
      </div>
      <div className='reviews-slections-allBars'>
        <div className='reviews-selections-rating-bars' id='Excellent'>
          <div className='reviews-selections-rating-outerBar'>
            <div className='reviews-selections-rating-innerBar'></div>
          </div>
          <div className='reviews-selections-rating-count'>1234</div>
        </div>
        <div className='reviews-selections-rating-bars' id='Very Good'>
          <div className='reviews-selections-rating-outerBar'>
            <div className='reviews-selections-rating-innerBar'></div>
          </div>
          <div className='reviews-selections-rating-count'>1234</div>
        </div>
        <div className='reviews-selections-rating-bars' id='Average'>
          <div className='reviews-selections-rating-outerBar'>
            <div className='reviews-selections-rating-innerBar'></div>
          </div>
          <div className='reviews-selections-rating-count'>1234</div>
        </div>
        <div className='reviews-selections-rating-bars' id='Poor'>
          <div className='reviews-selections-rating-outerBar'>
            <div className='reviews-selections-rating-innerBar'></div>
          </div>
          <div className='reviews-selections-rating-count'>1234</div>
        </div>
        <div className='reviews-selections-rating-bars' id='Terrible'>
          <div className='reviews-selections-rating-outerBar'>
            <div className='reviews-selections-rating-innerBar'></div>
          </div>
          <div className='reviews-selections-rating-count'>1234</div>
        </div>
      </div>
    </div>
  </div>
);

export default TravelerRating;