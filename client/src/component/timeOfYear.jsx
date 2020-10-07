import React from 'react';
import styled from 'styled-components';

const ReviewsSelectionsMonthOptions = styled.label`
  cursor: pointer;
`;

const ReviewsSelectionsMonthOptionsInput = styled.input`
  cursor: pointer;
`;

const ReviewsSelectionsReviewMonth = styled.div`
  display: inline-block;
`;

const TimeOfYear= ({filterByMonth}) => (
  <div>
    <div><b>Time of year</b></div>
    <br></br>
    <ReviewsSelectionsMonthOptions>
      <ReviewsSelectionsMonthOptionsInput onClick={filterByMonth} type='checkbox'></ReviewsSelectionsMonthOptionsInput>
      <ReviewsSelectionsReviewMonth>Mar-May</ReviewsSelectionsReviewMonth>
    </ReviewsSelectionsMonthOptions>
    <br></br>
    <ReviewsSelectionsMonthOptions>
      <ReviewsSelectionsMonthOptionsInput onClick={filterByMonth} type='checkbox'></ReviewsSelectionsMonthOptionsInput>
      <ReviewsSelectionsReviewMonth>Jun-Aug</ReviewsSelectionsReviewMonth>
    </ReviewsSelectionsMonthOptions>
    <br></br>
    <ReviewsSelectionsMonthOptions>
      <ReviewsSelectionsMonthOptionsInput onClick={filterByMonth} type='checkbox'></ReviewsSelectionsMonthOptionsInput>
      <ReviewsSelectionsReviewMonth>Sep-Nov</ReviewsSelectionsReviewMonth>
    </ReviewsSelectionsMonthOptions>
    <br></br>
    <ReviewsSelectionsMonthOptions>
      <ReviewsSelectionsMonthOptionsInput onClick={filterByMonth} type='checkbox'></ReviewsSelectionsMonthOptionsInput>
      <ReviewsSelectionsReviewMonth>Dec-Feb</ReviewsSelectionsReviewMonth>
    </ReviewsSelectionsMonthOptions>
  </div>
);

export default TimeOfYear;