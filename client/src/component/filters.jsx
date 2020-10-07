import React from 'react';
import Selections from './selections.jsx'
import Popular from './popular.jsx'
import styled from 'styled-components';

const ReviewsFilter = styled.div`
  background-color: white;
  max-width: 832px;
  min-width: 464px;
  width: calc(50% + 3em);
  border: 1px solid lightgray;
`;

const ReviewsFiltersNavbar = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  text-align: center;
  padding-left: 0;
`;

const ReviewsFiltersNavbarOption = styled.div`
  padding-top: 2em;
  text-align: center;
  font-weight: bold;
  border: 1px solid lightgray;
  cursor: pointer;
`;
const ReviewsFiltersNavbarFirstOption = styled.div`
  border-style: solid;
  border-left-width: 0px;
  border-right-width: 0px;
  border-bottom-width: 0px;
  padding-top: 2em;
  text-align: center;
  font-weight: bold;
  cursor: pointer;
`;

const ReviewsFiltersMain = styled.div`
  padding: 0em 1em;
`;

const ReviewsFilterTitle = styled.div`
  height: 16px;
  padding: 2em 0;
`;

const ReviewsFilterTitleParts = styled.div`
  float: left;
  font-size: 30px;
  font-weight: bold;
`;

const ReviewsFilterTitleButtons = styled.div`
  float: right;
  display:flex;
`;

const ReviewButton = styled.div`
  background-color: black;
  border-radius: 5%;
  color: white;
  display: inline-block;
  font-size: 16px;
  font-weight: bold;
  height: 20px;
  margin: none;
  margin-left: 2px;
  padding: 1em;
  position: relative;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
`;

const Filters = ({count, filterByRatings, filterByMonth, filterByType}) => (
  <ReviewsFilter>
    <ReviewsFiltersNavbar>
      <ReviewsFiltersNavbarFirstOption><div>Reviews Icon</div><div>{count}</div>Reviews</ReviewsFiltersNavbarFirstOption>
      <ReviewsFiltersNavbarOption><div>Chat Icon</div><div>1,234</div>Q+A</ReviewsFiltersNavbarOption>
      <ReviewsFiltersNavbarOption><div>LightBulb Icon</div><div>123</div>Room tips</ReviewsFiltersNavbarOption>
    </ReviewsFiltersNavbar>
    <ReviewsFiltersMain>
      <ReviewsFilterTitle>
        <ReviewsFilterTitleParts>Reviews</ReviewsFilterTitleParts>
        <ReviewsFilterTitleButtons>
          <div>
            <ReviewButton>Write a review</ReviewButton>
            <ReviewButton>{'\u2bc6'}</ReviewButton>
          </div>
        </ReviewsFilterTitleButtons>
      </ReviewsFilterTitle>
      <hr></hr>
      <Selections filterByRatings={filterByRatings} filterByMonth={filterByMonth} filterByType={filterByType}/>
      <br></br>
      <Popular/>
    </ReviewsFiltersMain>
  </ReviewsFilter>
);

export default Filters;