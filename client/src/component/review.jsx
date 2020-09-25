import React from 'react';
import moment from 'moment';



const Review = (props) => (

  <div className='reviews-review'>
    <div className='reviews-header'>
      <img className='reviews-profile-picture' src="https://images.unsplash.com/photo-1534361960057-19889db9621e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"></img>
      <div className='reviews-reviewer-information'>
        <div>
          <b id='reviewer'>Reivewer#1</b> wrote a review {moment('2020-09-22').format('MMM Do')}
        </div>
        <div>
          Reviewer Loc • # of contributions • # of helpful vote
        </div>
      </div>
    </div>
    <br></br>
    <div className='reviews-pictures'>
      <img src="https://www.w3schools.com/html/pic_trulli.jpg" alt="Sample_1" ></img>
      <img src="https://randomwordgenerator.com/img/picture-generator/54e3dd434a52a514f1dc8460962e33791c3ad6e04e50744172287ed29049cd_640.jpg" alt="Sample_2" ></img>
      <img src="https://randomwordgenerator.com/img/picture-generator/55e2d7464250ad14f1dc8460962e33791c3ad6e04e50744076297cd4944dc3_640.jpg" alt="Sample_3" ></img>
    </div>
    <br></br>
    <div className='reviews-body'>
      <div className='reviews-ratings'>
        <span className='reviews-ratings-dot' id='color'></span>
        <span className='reviews-ratings-dot' id='color'></span>
        <span className='reviews-ratings-dot' id='color'></span>
        <span className='reviews-ratings-dot' id='color'></span>
        <span className='reviews-ratings-dot' id='empty'></span>
      </div>
      <br></br>
      <b>Title</b>
      <div>" blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah "</div>
      <br></br>
      <div><b>Date of stay</b>: {moment('2020-09-22').format('MMM Do')}</div>
      <br></br>
      <div><b>Trip type:</b> Traveled with family</div>
      <br></br>
      <div id='disclaimer'>
        <hr></hr>
        This review is the subjective opinion of a TripAdvisor member and not of TripAdvisor LLC.
        <br></br>
        <br></br>
      </div>
      <div class='reviews-body-helpful-share'><div>Helpful</div>   <div>Share</div></div>
    </div>
    <hr></hr>
    <div className='reviews-footer'>
      <div className='reviews-footer-response'>
        <img className='reviews-responder-profile-pic' src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'></img>
        <div className='reviews-response'>
          <div className='reviews-response-name'>Hotel Representative name</div>
          <div className='reviews-response-date'>Responded {moment('2020-09-22', 'YYYY-MM-DD').fromNow()}</div>
          <br></br>
          <div className='reviews-response-text'>
            <div>thank you thank you thank you thank you thank you thank you thank you thank you thank you thank you thank you thank you thank you thank you</div>
            <br></br>
            <div>Best regards,</div>
            <br></br>
            <div>Rep Name</div>
            <div>Rep Position</div>
          </div>
        </div>
      </div>
      <div id='disclaimer'>
        <hr></hr>
        This response is the subjective opinion of the management representative and not of TripAdvisor LLC.
        <br></br>
        <br></br>
      </div>
    </div>
  </div>
);

export default Review;