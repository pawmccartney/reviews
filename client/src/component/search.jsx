import React from 'react';
import styled from 'styled-components';

const ReviewsSearch = styled.div`
  background-color: white;
  max-width: 800px;
  min-width: 432px;
  width: 70%;
  padding-left: 1em;
  padding-right: 1em;
  display: flex;
`;

const ReviewsSearchIcon = styled.span`
  vertical-align: middle;
  line-height: 24px;
  margin-top: 1%;
  padding-right:1em;
`;

const ReviewsSearchBar = styled.input`
  border: none;
  width: 100%;
  height: 37px;
`;

const Search = () => (
  <ReviewsSearch>
    <ReviewsSearchIcon>
      <div>{'\ud83d\udd0e\ufe0e'}</div>
    </ReviewsSearchIcon>
    <ReviewsSearchBar placeholder='search reviews'></ReviewsSearchBar>
  </ReviewsSearch>
);

export default Search;