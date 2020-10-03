import React from 'react';

const TravelerType= ({filterByType}) => (
  <div className='reviews-selections-travelerType'>
    <div><b>Traveler type</b></div>
    <br></br>
    <label className='reviews-selections-families'>
      <input type='checkbox' onClick={filterByType}></input>
      <div className='reviews-selections-type'>Families</div>
    </label>
    <br></br>
    <label className='reviews-selections-couples'>
      <input type='checkbox' onClick={filterByType}></input>
      <div className='reviews-selections-type'>Couples</div>
    </label>
    <br></br>
    <label className='reviews-selections-solo'>
      <input type='checkbox' onClick={filterByType}></input>
      <div className='reviews-selections-type'>Solo</div>
    </label>
    <br></br>
    <label className='reviews-selections-business'>
      <input type='checkbox' onClick={filterByType}></input>
      <div className='reviews-selections-type'>Business</div>
    </label>
    <br></br>
    <label className='reviews-selections-friends'>
      <input type='checkbox' onClick={filterByType}></input>
      <div className='reviews-selections-type'>Friends</div>
    </label>
  </div>
);

export default TravelerType;