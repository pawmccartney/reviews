import React from 'react';
import TravelerRating from './travelerRating.jsx';
import TimeOfYear from './timeOfYear.jsx';
import TravelerType from './travelerType.jsx';
import Language from './language.jsx';
import styled from 'styled-components';

const ReviewsSelections = styled.div`
  display: grid;
  grid-template-columns: 4fr 2fr 2fr 2fr;
`;

const Selections = ({filterByRatings, filterByMonth, filterByType}) => (
  <ReviewsSelections>
    <TravelerRating filterByRatings = {filterByRatings}/>
    <TimeOfYear filterByMonth={filterByMonth}/>
    <TravelerType filterByType={filterByType}/>
    <Language/>
  </ReviewsSelections>
);


export default Selections;