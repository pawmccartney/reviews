import React from 'react';

const TimeOfYear= ({filterByMonth}) => (
  <div className='reviews-selections-date'>
    <div><b>Time of year</b></div>
    <label className='reviews-selections-mar_may'>
      <input onClick={filterByMonth} type='checkbox'></input>
      <div className='reviews-selections-review-month'>Mar-May</div>
    </label>
    <br></br>
    <label className='reviews-selections-jun_aug'>
      <input onClick={filterByMonth} type='checkbox'></input>
      <div className='reviews-selections-review-month'>Jun-Aug</div>
    </label>
    <br></br>
    <label className='reviews-selections-sep_nov'>
      <input onClick={filterByMonth} type='checkbox'></input>
      <div className='reviews-selections-review-month'>Sep-Nov</div>
    </label>
    <br></br>
    <label className='reviews-selections-dec_feb'>
      <input onClick={filterByMonth} type='checkbox'></input>
      <div className='reviews-selections-review-month'>Dec-Feb</div>
    </label>
  </div>
);

export default TimeOfYear;