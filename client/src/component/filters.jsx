import React from 'react';
import Selections from './selections.jsx'
import Popular from './popular.jsx'
import styled from 'styled-components';

const ReviewsFilter = styled.div`
  background-color: white;
  /* max-width: 832px;
  min-width: 664px;
  width: calc(50% + 3em); */
  width: 700px;
  border: 1px solid lightgray;
  z-index: 1;
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

const ButtonContainer = styled.div`
`;

const ReviewButton = styled.button`
  background-color: black;
  border-radius: 8%;
  color: white;
  display: inline-block;
  font-size: 16px;
  font-weight: bold;
  margin-left: 2px;
  height: 30px;
  padding: 5px;
  vertical-align: middle;
  cursor: pointer;
`;

const Icon = styled.div`
  font-size: 30px;
`;

const Filters = ({count, filterByRatings, filterByMonth, filterByType}) => (
  <ReviewsFilter>
    <ReviewsFiltersNavbar>
      <ReviewsFiltersNavbarFirstOption><Icon>&#x1f4dd;</Icon><div>{count}</div>Reviews</ReviewsFiltersNavbarFirstOption>
      <ReviewsFiltersNavbarOption><Icon>&#128172;</Icon><div>3</div>Q+A</ReviewsFiltersNavbarOption>
      <ReviewsFiltersNavbarOption><Icon>&#x1F4A1;</Icon><div>2</div>Room tips
      {/* &#xF723; */}
      </ReviewsFiltersNavbarOption>
    </ReviewsFiltersNavbar>
    <ReviewsFiltersMain>
      <ReviewsFilterTitle>
        <ReviewsFilterTitleParts>Reviews</ReviewsFilterTitleParts>
        <ReviewsFilterTitleButtons>
          <ButtonContainer>
            <ReviewButton>Write a review</ReviewButton>
            <ReviewButton>{'\u2bc6'}</ReviewButton>
          </ButtonContainer>
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