import React from 'react';

const TimeOfYear= () => (
  <div className='reviews-selections-date'>
    <div><b>Time of year</b></div>
    <label className='reviews-selections-mar_may'>
      <input type='checkbox'></input>
      Mar-May
    </label>
    <br></br>
    <label className='reviews-selections-jun_aug'>
      <input type='checkbox'></input>
      Jun-Aug
    </label>
    <br></br>
    <label className='reviews-selections-sep_nov'>
      <input type='checkbox'></input>
      Sep-Nov
    </label>
    <br></br>
    <label className='reviews-selections-dec_feb'>
      <input type='checkbox'></input>
      Dec-Feb
    </label>
  </div>
);

export default TimeOfYear;