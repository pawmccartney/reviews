import React from 'react';
import Selections from './selections.jsx'
import Popular from './popular.jsx'

const Filters = ({count}) => (
  <div className='reviews-filter'>
    <div className='reviews-filters-navbar'>
      <div className='reviews-filters-navbar-option' id='left'><div>Reviews Icon</div><div>{count}</div>Reviews</div>
      <div className='reviews-filters-navbar-option'><div>Chat Icon</div><div>1,234</div>Q+A</div>
      <div className='reviews-filters-navbar-option' id='right'><div>LightBulb Icon</div><div>123</div>Room tips</div>
    </div>
    <div className='reviews-filters-main'>
      <div className='reviews-filter-title'>
        <h1 className='reviews-filter-title-parts'>Reviews</h1>
        <div className='reviews-filter-title-buttons'>
          <button id='reviewButton'>Write a review</button>
          <button id='reviewButton'>arrow</button>
        </div>
      </div>
      <hr></hr>
      <Selections/>
      <br></br>
      <Popular/>
    </div>
  </div>
);

export default Filters;