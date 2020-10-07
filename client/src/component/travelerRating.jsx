import React from 'react';
import styled from 'styled-components';

const ReviewsSelectionsContainer = styled.div`
display:flex;
`;

const ReviewsSelectionsRatingOptions = styled.label`
cursor: pointer;
`;

const ReviewsSelectionsRatingOptionsInput = styled.input`
cursor: pointer;
`;

const ReviewsSelectionsRatingScore = styled.div`
  display: inline-block;
`;

const ReviewsSelectionsRatingOuterBar = styled.div`
  display: inline-block;
  margin-left: 10px;
  position: relative;
  left:0;
  width: 100px;
  background-color: lightgray;
`;

const ReviewsSelectionsRatingInnerBar = styled.div`
  display: block;
  width: 20%;
  height: 10px;
  background-color: black;
`;

const ReviewsSelectionsRatingCount = styled.div`
  display: inline-block;
  margin-left: 10px;
`;

const TravelerRating = ({filterByRatings}) => (
  <div>
    <div><b>Traveler rating</b></div>
    <br></br>
    <ReviewsSelectionsContainer>
      <div>
        <ReviewsSelectionsRatingOptions>
          <ReviewsSelectionsRatingOptionsInput onClick={filterByRatings} type='checkbox'></ReviewsSelectionsRatingOptionsInput>
          <ReviewsSelectionsRatingScore>Excellent</ReviewsSelectionsRatingScore>
        </ReviewsSelectionsRatingOptions>
        <br></br>
        <ReviewsSelectionsRatingOptions>
          <ReviewsSelectionsRatingOptionsInput onClick={filterByRatings} type='checkbox'></ReviewsSelectionsRatingOptionsInput>
          <ReviewsSelectionsRatingScore>Very Good</ReviewsSelectionsRatingScore>
        </ReviewsSelectionsRatingOptions>
        <br></br>
        <ReviewsSelectionsRatingOptions>
          <ReviewsSelectionsRatingOptionsInput onClick={filterByRatings} type='checkbox'></ReviewsSelectionsRatingOptionsInput>
          <ReviewsSelectionsRatingScore>Average</ReviewsSelectionsRatingScore>
        </ReviewsSelectionsRatingOptions>
        <br></br>
        <ReviewsSelectionsRatingOptions>
          <ReviewsSelectionsRatingOptionsInput onClick={filterByRatings} type='checkbox'></ReviewsSelectionsRatingOptionsInput>
          <ReviewsSelectionsRatingScore>Poor</ReviewsSelectionsRatingScore>
        </ReviewsSelectionsRatingOptions>
        <br></br>
        <ReviewsSelectionsRatingOptions>
          <ReviewsSelectionsRatingOptionsInput onClick={filterByRatings} type='checkbox'></ReviewsSelectionsRatingOptionsInput>
          <ReviewsSelectionsRatingScore>Terrible</ReviewsSelectionsRatingScore>
        </ReviewsSelectionsRatingOptions>
      </div>
      <div>
        <div>
          <ReviewsSelectionsRatingOuterBar>
            <ReviewsSelectionsRatingInnerBar></ReviewsSelectionsRatingInnerBar>
          </ReviewsSelectionsRatingOuterBar>
          <ReviewsSelectionsRatingCount>1234</ReviewsSelectionsRatingCount>
        </div>
        <div>
          <ReviewsSelectionsRatingOuterBar>
            <ReviewsSelectionsRatingInnerBar></ReviewsSelectionsRatingInnerBar>
          </ReviewsSelectionsRatingOuterBar>
          <ReviewsSelectionsRatingCount>1234</ReviewsSelectionsRatingCount>
        </div>
        <div>
          <ReviewsSelectionsRatingOuterBar>
            <ReviewsSelectionsRatingInnerBar></ReviewsSelectionsRatingInnerBar>
          </ReviewsSelectionsRatingOuterBar>
          <ReviewsSelectionsRatingCount>1234</ReviewsSelectionsRatingCount>
        </div>
        <div>
          <ReviewsSelectionsRatingOuterBar>
            <ReviewsSelectionsRatingInnerBar></ReviewsSelectionsRatingInnerBar>
          </ReviewsSelectionsRatingOuterBar>
          <ReviewsSelectionsRatingCount>1234</ReviewsSelectionsRatingCount>
        </div>
        <div>
          <ReviewsSelectionsRatingOuterBar>
            <ReviewsSelectionsRatingInnerBar></ReviewsSelectionsRatingInnerBar>
          </ReviewsSelectionsRatingOuterBar>
          <ReviewsSelectionsRatingCount>1234</ReviewsSelectionsRatingCount>
        </div>
      </div>
    </ReviewsSelectionsContainer>
  </div>
);

export default TravelerRating;