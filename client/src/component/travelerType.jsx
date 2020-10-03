import React from 'react';

const TravelerType= ({filterByType}) => (
  <div className='reviews-selections-travelerType'>
    <div><b>Traveler type</b></div>
    <label className='reviews-selections-families'>
      <input type='checkbox' onClick={filterByType}></input>
      Families
    </label>
    <br></br>
    <label className='reviews-selections-couples'>
    <input type='checkbox' onClick={filterByType}></input>
      Couples
    </label>
    <br></br>
    <label className='reviews-selections-solo'>
      <input type='checkbox' onClick={filterByType}></input>
      Solo
    </label>
    <br></br>
    <label className='reviews-selections-business'>
      <input type='checkbox' onClick={filterByType}></input>
      Business
    </label>
    <br></br>
    <label className='reviews-selections-friends'>
      <input type='checkbox' onClick={filterByType}></input>
      Friends
    </label>
  </div>
);

export default TravelerType;