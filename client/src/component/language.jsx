import React from 'react';

const Language= () => (
  <div className='reviews-selections-language'>
    <div><b>Language</b></div>
    <br></br>
    <label className='reviews-selections-allLanguages'>
      <input type='radio' name='lang' defaultChecked></input>
      All languages
    </label>
    <br></br>
    <label className='reviews-selections-english'>
      <input type='radio' name='lang'></input>
      English
    </label>
    <br></br>
    <label className='reviews-selections-spanish'>
      <input type='radio' name='lang'></input>
      Spanish
    </label>
    <br></br>
    <label className='reviews-selections-portuguese'>
      <input type='radio' name='lang'></input>
      Portuguese
    </label>
    <br></br>
    <div><b>More</b></div>
  </div>
);

export default Language;