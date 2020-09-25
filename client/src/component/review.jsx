import React from 'react';
import moment from 'moment';



const Review = (props) => (

  <div className='reviews-review'>
    <div className='reviews-header'>
      <div className='reviews-'>
        <div>
          <img className='reviews-profile-picture' src="https://images.unsplash.com/photo-1534361960057-19889db9621e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"></img>
        </div>
        <div>
          <b>Reivewer#1</b> wrote a review {moment('2020-09-22').format('MMM Do')}
        </div>
      </div>
      <div>
        Reviewer Loc • # of contributions • # of helpful vote
      </div>
      <br></br>
    </div>
    <div className='reviews-pictures'>
      <img src="https://www.w3schools.com/html/pic_trulli.jpg" alt="Sample_1" ></img>
      <img src="https://randomwordgenerator.com/img/picture-generator/54e3dd434a52a514f1dc8460962e33791c3ad6e04e50744172287ed29049cd_640.jpg" alt="Sample_2" ></img>
      <img src="https://randomwordgenerator.com/img/picture-generator/55e2d7464250ad14f1dc8460962e33791c3ad6e04e50744076297cd4944dc3_640.jpg" alt="Sample_3" ></img>
    </div>
    <br></br>
    <div className='reviews-body'>
      <b>Title</b>
      <div>" blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah "</div>
      <br></br>
      <div><b>Date of stay</b>: {moment('2020-09-22').format('MMM Do')}</div>
      <br></br>
      <div class='reviews-body-helpful-share'><div>Helpful</div>   <div>Share</div></div>
    </div>
    <hr></hr>
    <div className='reviews-footer'>
      <div>Hotel Representative name</div>
      <div>Responded {moment('2020-09-22', 'YYYY-MM-DD').fromNow()}</div>
      <br></br>
      <div>thank you thank you thank you thank you thank you thank you thank you thank you thank you thank you thank you thank you thank you thank you</div>
      <br></br>
      <div>Best regards,</div>
      <br></br>
      <div>Rep Name</div>
      <div>Rep Position</div>
    </div>
  </div>
);

export default Review;