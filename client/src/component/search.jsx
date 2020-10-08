import React from 'react';
import styled from 'styled-components';

const ReviewsSearch = styled.div`
  background-color: white;
  /* max-width: 800px;
  min-width: 632px;
  width: calc(50% + 1em); */
  width: calc(700px - 2em);
  padding-left: 1em;
  padding-right: 1em;
  display: flex;
`;

const ReviewsSearchIcon = styled.span`
  vertical-align: middle;
  line-height: 24px;
  margin-top: 1%;
  padding-right:1em;
  &:before {
    font-size:20px;
    content: "\ud83d\udd0d\ufe0e"
  }
`;

const ReviewsSearchBar = styled.input`
  width: 100%;
  height: 37px;
  border: none;
`;



const Search = () => (
  <ReviewsSearch>
    <ReviewsSearchIcon></ReviewsSearchIcon>
    <ReviewsSearchBar placeholder='search reviews'></ReviewsSearchBar>
  </ReviewsSearch>
);

export default Search;