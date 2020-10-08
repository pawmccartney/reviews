import React from 'react';
import styled from 'styled-components';

const ReviewsSelectionsLanguage = styled.div`
`;
const ReviewsSelectionsLanguageOptions = styled.label`
`;
const ReviewsSelectionsLanguageMoreOptions = styled.div`
  font-weight: bold;
  cursor: pointer;
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
    <ReviewsSelectionsLanguageMoreOptions>More</ReviewsSelectionsLanguageMoreOptions>
  </ReviewsSelectionsLanguage>
);

export default Language;