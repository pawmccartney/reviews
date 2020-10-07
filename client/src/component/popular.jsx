import React from 'react';
import styled from 'styled-components';

const ReviewsFilterPopularWords = styled.button`
  display: inline-block;
  border-color: black ;
  border-radius: 8%;
  background-color: white;
  margin: 2px 2px;
  height: 30px;
  cursor: pointer;
`;

const ReviewsFilterPopularWordsAllReviews = styled.button`
  display: inline-block;
  border-color: black ;
  border-radius: 8%;
  background-color: black;
  color: white;
  margin: 2px 2px;
  height: 30px;
  cursor: pointer;
`;

const PopularMentions = () => (
  <div>
    <b>Popular mentions</b>
    <br></br>
    <br></br>
    <div>
      <ReviewsFilterPopularWordsAllReviews>All reviews</ReviewsFilterPopularWordsAllReviews>
      <ReviewsFilterPopularWords>fish tacos</ReviewsFilterPopularWords>
      <ReviewsFilterPopularWords>san telmo</ReviewsFilterPopularWords>
      <ReviewsFilterPopularWords>el mexicano</ReviewsFilterPopularWords>
      <ReviewsFilterPopularWords>moon tower</ReviewsFilterPopularWords>
      <ReviewsFilterPopularWords>kambu restaurant</ReviewsFilterPopularWords>
      <ReviewsFilterPopularWords>chef josue</ReviewsFilterPopularWords>
      <ReviewsFilterPopularWords>juan jose</ReviewsFilterPopularWords>
      <ReviewsFilterPopularWords>tuna tower</ReviewsFilterPopularWords>
      <ReviewsFilterPopularWords>swim up bar</ReviewsFilterPopularWords>
      <ReviewsFilterPopularWords>upper pool</ReviewsFilterPopularWords>
      <ReviewsFilterPopularWords>ocean front</ReviewsFilterPopularWords>
      <ReviewsFilterPopularWords>master suite</ReviewsFilterPopularWords>
      <ReviewsFilterPopularWords>garden view</ReviewsFilterPopularWords>
      <ReviewsFilterPopularWords>sushi</ReviewsFilterPopularWords>
      <ReviewsFilterPopularWords>michael jackson show</ReviewsFilterPopularWords>
      <ReviewsFilterPopularWords>fire show</ReviewsFilterPopularWords>
      <ReviewsFilterPopularWords>our waiter</ReviewsFilterPopularWords>
      <ReviewsFilterPopularWords>other resorts</ReviewsFilterPopularWords>
      <ReviewsFilterPopularWords>dress code</ReviewsFilterPopularWords>
      <ReviewsFilterPopularWords>great resort</ReviewsFilterPopularWords>
    </div>
    <br></br>
    <br></br>
  </div>
);

export default PopularMentions;