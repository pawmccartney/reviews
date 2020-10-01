import React from 'react';

const Language= () => (
  <div className='reviews-selections-language'>
    <div><b>Language</b></div>
    <label className='reviews-selections-allLanguages'>
      <input type='radio'></input>
      All languages
    </label>
    <br></br>
    <label className='reviews-selections-english'>
      <input type='radio'></input>
      English
    </label>
    <br></br>
    <label className='reviews-selections-spanish'>
      <input type='radio'></input>
      Spanish
    </label>
    <br></br>
    <label className='reviews-selections-portuguese'>
      <input type='radio'></input>
      Portuguese
    </label>
    <br></br>
    <div><b>More</b></div>
  </div>
);

export default Language;