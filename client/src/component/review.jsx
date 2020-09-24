import React from 'react';



const Review = (props) => (

  <div className='reviews-review'>
    <div className='reviews-header'>
      <div>
        <b>Reivewer#1</b> wrote a review Sep 22
      </div>
      <div>
        Reviewer Loc • # of contributions • # of helpful vote
      </div>
      <br></br>
    </div>
    <div className='reviews-picture'>
      Picture Section
    </div>
    <br></br>
    <div className='reviews-body'>
      <b>Title</b>
      <div>blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah </div>
      <br></br>
      <div><b>Date of stay</b>: September 2020</div>
      <br></br>
      <div>Helpful Button  & Share Button</div>
    </div>
    <hr></hr>
    <div className='reviews-footer'>
      <div>Hotel Representative name</div>
      <div>Responded 2 days ago</div>
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