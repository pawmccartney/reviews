import React from 'react';

const TimeOfYear= ({filterByMonth}) => (
  <div className='reviews-selections-month'>
    <div><b>Time of year</b></div>
    <br></br>
    <label className='reviews-selections-month-options'>
      <input onClick={filterByMonth} type='checkbox'></input>
      <div className='reviews-selections-review-month'>Mar-May</div>
    </label>
    <br></br>
    <label className='reviews-selections-month-options'>
      <input onClick={filterByMonth} type='checkbox'></input>
      <div className='reviews-selections-review-month'>Jun-Aug</div>
    </label>
    <br></br>
    <label className='reviews-selections-month-options'>
      <input onClick={filterByMonth} type='checkbox'></input>
      <div className='reviews-selections-review-month'>Sep-Nov</div>
    </label>
    <br></br>
    <label className='reviews-selections-month-options'>
      <input onClick={filterByMonth} type='checkbox'></input>
      <div className='reviews-selections-review-month'>Dec-Feb</div>
    </label>
  </div>
);

export default TimeOfYear;