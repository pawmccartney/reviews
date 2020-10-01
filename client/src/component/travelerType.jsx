import React from 'react';

const TravelerType= () => (
  <div className='reviews-selections-travelerType'>
    <div><b>Traveler type</b></div>
    <label className='reviews-selections-families'>
      <input type='checkbox'></input>
      Families
    </label>
    <br></br>
    <label className='reviews-selections-couples'>
      <input type='checkbox'></input>
      Couples
    </label>
    <br></br>
    <label className='reviews-selections-solo'>
      <input type='checkbox'></input>
      Solo
    </label>
    <br></br>
    <label className='reviews-selections-business'>
      <input type='checkbox'></input>
      Business
    </label>
    <br></br>
    <label className='reviews-selections-friends'>
      <input type='checkbox'></input>
      Friends
    </label>
  </div>
);

export default TravelerType;