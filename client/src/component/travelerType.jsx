import React from 'react';
import styled from 'styled-components';

const ReviewsSelectionsTravelerType = styled.div`
`;
const ReviewsSelectionsTravelerTypeOptions = styled.label`
  cursor: pointer;
`;
const ReviewsSelectionsTravelerTypeOptionsInput = styled.input`
  cursor: pointer;
`;
const ReviewsSelectionsType = styled.div`
  display: inline-block;
`;

const TravelerType= ({filterByType}) => (
  <ReviewsSelectionsTravelerType>
    <div><b>Traveler type</b></div>
    <br></br>
    <ReviewsSelectionsTravelerTypeOptions>
      <ReviewsSelectionsTravelerTypeOptionsInput type='checkbox' onClick={filterByType}></ReviewsSelectionsTravelerTypeOptionsInput>
      <ReviewsSelectionsType>Families</ReviewsSelectionsType>
    </ReviewsSelectionsTravelerTypeOptions>
    <br></br>
    <ReviewsSelectionsTravelerTypeOptions>
      <ReviewsSelectionsTravelerTypeOptionsInput type='checkbox' onClick={filterByType}></ReviewsSelectionsTravelerTypeOptionsInput>
      <ReviewsSelectionsType>Couples</ReviewsSelectionsType>
    </ReviewsSelectionsTravelerTypeOptions>
    <br></br>
    <ReviewsSelectionsTravelerTypeOptions>
      <ReviewsSelectionsTravelerTypeOptionsInput type='checkbox' onClick={filterByType}></ReviewsSelectionsTravelerTypeOptionsInput>
      <ReviewsSelectionsType>Solo</ReviewsSelectionsType>
    </ReviewsSelectionsTravelerTypeOptions>
    <br></br>
    <ReviewsSelectionsTravelerTypeOptions>
      <ReviewsSelectionsTravelerTypeOptionsInput  type='checkbox' onClick={filterByType}></ReviewsSelectionsTravelerTypeOptionsInput>
      <ReviewsSelectionsType>Business</ReviewsSelectionsType>
    </ReviewsSelectionsTravelerTypeOptions>
    <br></br>
    <ReviewsSelectionsTravelerTypeOptions>
      <ReviewsSelectionsTravelerTypeOptionsInput  type='checkbox' onClick={filterByType}></ReviewsSelectionsTravelerTypeOptionsInput>
      <ReviewsSelectionsType>Friends</ReviewsSelectionsType>
    </ReviewsSelectionsTravelerTypeOptions>
  </ReviewsSelectionsTravelerType>
);

export default TravelerType;