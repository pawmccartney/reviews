import React from 'react';

const Search = () => (
  <div className='reviews-search'>
    <span className='reviews-search-icon'>
      <div id='search icon'>{'\ud83d\udd0e\ufe0e'}</div>
    </span>
    <input className='reviews-search-bar' placeholder='search reviews'></input>
  </div>
);

export default Search;