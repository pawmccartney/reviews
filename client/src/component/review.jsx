import React from 'react';
import moment from 'moment';

const Review = ({currHotelReview}) => (
  <div className='reviews-review'>
    <div className='reviews-header'>
      <img className='reviews-profile-picture' src="https://images.unsplash.com/photo-1534361960057-19889db9621e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"></img>
      <div className='reviews-reviewer-information'>
        <div>
          <b id='reviewer'>{currHotelReview.memberInfo.memberUserName}</b> wrote a review {moment(currHotelReview.responderInfo.responderDate).format('MMM Do')}
        </div>
        <div>
          {currHotelReview.memberInfo.memberLocation} • {currHotelReview.memberInfo.memberContributions} contributions • {currHotelReview.memberInfo.memberHelpful} helpful vote
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
        {currHotelReview.reviewInfo.reviewRatings}
        <span className='reviews-ratings-dot' id='color'></span>
        <span className='reviews-ratings-dot' id='color'></span>
        <span className='reviews-ratings-dot' id='color'></span>
        <span className='reviews-ratings-dot' id='color'></span>
        <span className='reviews-ratings-dot' id='empty'></span>
      </div>
      <br></br>
      <b>{currHotelReview.reviewInfo.reviewTitle}</b>
      <div>"{currHotelReview.reviewInfo.reviewText}"</div>
      <br></br>
      <div><b>Date of stay</b>: {moment(currHotelReview.reviewInfo.reviewDate).format('MMM Do')}</div>
      <br></br>
      <div><b>Trip type: </b>{currHotelReview.reviewInfo.reviewTripType}</div>
      <br></br>
      <div id='disclaimer'>
        <hr></hr>
        This review is the subjective opinion of a TripAdvisor member and not of TripAdvisor LLC.
        <br></br>
        <br></br>
      </div>
      <div className='reviews-body-helpful-share'><div>Helpful</div>   <div>Share</div></div>
    </div>
    <hr></hr>
    <div className='reviews-footer'>
      <div className='reviews-footer-response'>
        <img className='reviews-responder-profile-pic' src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'></img>
        <div className='reviews-response'>
          <div className='reviews-response-name'>{currHotelReview.responderInfo.responderOrg}</div>
          <div className='reviews-response-date'>Responded {moment(currHotelReview.responderInfo.responderDate).fromNow()}</div>
          <br></br>
          <div className='reviews-response-text'>
            <div>{currHotelReview.responderInfo.responderText}</div>
            <br></br>
            <div>{currHotelReview.responderInfo.responderClose},</div>
            <br></br>
            <div>{currHotelReview.responderInfo.responderName}</div>
            <div>{currHotelReview.responderInfo.responderPosition}</div>
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