import React from 'react';
import TravelerRating from './travelerRating.jsx';
import TimeOfYear from './timeOfYear.jsx';
import TravelerType from './travelerType.jsx';
import Language from './language.jsx';

const Selections = () => (
  <div className='reviews-selections'>
    <TravelerRating/>
    <TimeOfYear/>
    <TravelerType/>
    <Language/>
  </div>
);


export default Selections;