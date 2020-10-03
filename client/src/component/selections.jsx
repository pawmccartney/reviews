import React from 'react';
import TravelerRating from './travelerRating.jsx';
import TimeOfYear from './timeOfYear.jsx';
import TravelerType from './travelerType.jsx';
import Language from './language.jsx';

const Selections = ({filterByRatings, filterByMonth, filterByType}) => (
  <div className='reviews-selections'>
    <TravelerRating filterByRatings = {filterByRatings}/>
    <TimeOfYear filterByMonth={filterByMonth}/>
    <TravelerType filterByType={filterByType}/>
    <Language/>
  </div>
);


export default Selections;