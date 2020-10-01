import React from 'react';
import moment from 'moment';

const Review = ({currHotelReview, readMore}) => (
  <div className='reviews-review'>
    <div className='reviews-header'>
      <img className='reviews-profile-picture' src={currHotelReview.memberInfo.memberImg}></img>
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
      <img  src={currHotelReview.reviewInfo.reviewPictures.picture1} alt="Sample_1" ></img>
      <img src={currHotelReview.reviewInfo.reviewPictures.picture2} alt="Sample_2" ></img>
      <img src={currHotelReview.reviewInfo.reviewPictures.picture3} alt="Sample_3" ></img>
    </div>
    <br></br>
    <div className='reviews-body'>
      <div className='reviews-ratings'>
        {currHotelReview.reviewInfo.reviewRatings.map((rating) => {
          if (rating === 1) {
            return <span className='reviews-ratings-dot' id='color'></span>
          } else {
            return <span className='reviews-ratings-dot' id='empty'></span>
          }
        })}
      </div>
      <br></br>
      <b>{currHotelReview.reviewInfo.reviewTitle}</b>
      <div>"
        <span id="prev">
          {currHotelReview.reviewInfo.reviewText.slice(0, 100)}
        </span>
        <span id="more">
          {currHotelReview.reviewInfo.reviewText}
        </span>
        "
        <button onClick={readMore} id="readMore">Read more</button>
      </div>
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
    <hr id='footer'></hr>
    <div className='reviews-footer'>
      <div className='reviews-footer-response'>
        <img className='reviews-responder-profile-pic' src={currHotelReview.responderInfo.responderPicture}></img>
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
    </div>
    <hr></hr>
    <div id='disclaimer'>
      This response is the subjective opinion of the management representative and not of TripAdvisor LLC.
      <br></br>
      <br></br>
    </div>
  </div>
);

export default Review;