import React from 'react';
import styled from 'styled-components';

const ReviewsSelectionsLanguage = styled.div`
`;
const ReviewsSelectionsLanguageOptions = styled.label`
`;


const Language= () => (
  <ReviewsSelectionsLanguage>
    <div><b>Language</b></div>
    <br></br>
    <ReviewsSelectionsLanguageOptions>
      <input type='radio' name='lang' defaultChecked></input>
      All languages
    </ReviewsSelectionsLanguageOptions>
    <br></br>
    <ReviewsSelectionsLanguageOptions>
      <input type='radio' name='lang'></input>
      English
    </ReviewsSelectionsLanguageOptions>
    <br></br>
    <ReviewsSelectionsLanguageOptions>
      <input type='radio' name='lang'></input>
      Spanish
    </ReviewsSelectionsLanguageOptions>
    <br></br>
    <ReviewsSelectionsLanguageOptions>
      <input type='radio' name='lang'></input>
      Portuguese
    </ReviewsSelectionsLanguageOptions>
    <br></br>
    <div><b>More</b></div>
  </ReviewsSelectionsLanguage>
);

export default Language;