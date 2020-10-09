import React from 'react';
import moment from 'moment';
import styled from 'styled-components';

const ReviewsReview = styled.div`
  background-color: white;
  /* max-width: 832px;
  min-width: 664px;
  width: calc(50% + 3em); */
  border: 1px solid lightgray;
  width: calc(700px + 3em);
  z-index: 1;
`;

const ReviewsHeader = styled.div`
  background-color: white;
  max-width: 800px;
  min-width: 432px;
  width: calc(100% - 2em);
  padding-left: 1em;
  padding-right: 1em;
  display: flex;
  padding-top: 1em;
`;

const ReviewsBody = styled.div`
  background-color: white;
  max-width: 800px;
  min-width: 432px;
  width: calc(100% - 2em);
  padding-left: 1em;
  padding-right: 1em;
`;

const ReviewsFooter = styled.div`
  background-color: white;
  max-width: 800px;
  min-width: 432px;
  width: calc(100% - 2em);
  padding-left: 1em;
  padding-right: 1em;
`;

const ReviewsProfilePicture = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  object-fit: cover;
`;

const ReviewsReviewerInformation = styled.div`
  width:100%;
  padding-left: 1em;
`;

const ReviewsReviewerInformationDiv = styled.div`
  color: gray;
`;

const ReviewsReviewerMore = styled.div`
  /* &:before {
    content: "&#8230;";
  } */
`;

const ReviewsPictures = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  width: 100%;
  height: 130px;
  overflow:hidden;
`;

const ReviewsPicturesImg = styled.img`
  display: block;
  max-width: 100%;
  width: auto;

`;

const ReviewsRatings = styled.div`
  display: flex;
  width: 100%;
  height: auto;
`;

const ReviewsRatingsDotColored = styled.span`
  margin-right: 4px;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: solid 2px green;
  display: block;
  background-color: green;
`;

const ReviewsRatingsDotEmpty = styled.span`
  margin-right: 4px;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: solid 2px green;
  display: block;
  background-color: white;
`;

const More = styled.div`
  display:none;
`;

const ReadMore = styled.button`
  border:none;
  color:gray;
  text-decoration: underline;
  background-color:inherit;
  cursor:pointer;
`;

const Disclaimer = styled.div`
  color: gray;
  font-size: 14px;
  padding-left: 2em;
`;

const ReviewsBodyHelpfulShare = styled.div`
  display:flex;
  width: 30%;
  justify-content: space-between;
`;

const ReviewsFooterResponse = styled.div`
  display:flex;
  width: 100%;
`;

const ReviewsResponderProfilePic = styled.img`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  object-fit: cover;
`;

const ReviewsResponse = styled.div`
  padding-left: 1em;
`;

const ReviewsResponseDate = styled.div`
  padding-top: 5px;
  font-size: 15px;
  opacity: 90%;
`;

const ReviewsResponseText = styled.div`
  font-size: 15px;
  opacity: 90%;
`;

const Footer = styled.hr`
  border-top: 1px dashed gray;
`;

const Reviwer = styled.b`
  color: black;
`;

const Review = ({currHotelReview, readMore}) => (
  <ReviewsReview>
    <ReviewsHeader>
      <ReviewsProfilePicture src={currHotelReview.memberInfo.memberImg}></ReviewsProfilePicture>
      <ReviewsReviewerInformation>
        <ReviewsReviewerInformationDiv>
          <Reviwer>{currHotelReview.memberInfo.memberUserName}</Reviwer> wrote a review {moment(currHotelReview.responderInfo.responderDate).format('MMM Do')}
        </ReviewsReviewerInformationDiv>
        <ReviewsReviewerInformationDiv>
          {currHotelReview.memberInfo.memberLocation} • {currHotelReview.memberInfo.memberContributions} contributions • {currHotelReview.memberInfo.memberHelpful} helpful vote
        </ReviewsReviewerInformationDiv>
      </ReviewsReviewerInformation>
      <ReviewsReviewerMore><b>&#8230;</b></ReviewsReviewerMore>
    </ReviewsHeader>
    <br></br>
    <ReviewsPictures>
      <ReviewsPicturesImg  src={currHotelReview.reviewInfo.reviewPictures.picture1} alt="Sample_1" ></ReviewsPicturesImg>
      <ReviewsPicturesImg src={currHotelReview.reviewInfo.reviewPictures.picture2} alt="Sample_2" ></ReviewsPicturesImg>
      <ReviewsPicturesImg src={currHotelReview.reviewInfo.reviewPictures.picture3} alt="Sample_3" ></ReviewsPicturesImg>
    </ReviewsPictures>
    <br></br>
    <ReviewsBody>
      <ReviewsRatings>
        {currHotelReview.reviewInfo.reviewRatings.map((rating) => {
          if (rating === 1) {
            return <ReviewsRatingsDotColored></ReviewsRatingsDotColored>
          } else {
            return <ReviewsRatingsDotEmpty></ReviewsRatingsDotEmpty>
          }
        })}
      </ReviewsRatings>
      <br></br>
      <b>{currHotelReview.reviewInfo.reviewTitle}</b>
      <div>"
        <span id="prev">
          {currHotelReview.reviewInfo.reviewText.slice(0, 100)}
        </span>
        <More id="more">
          {currHotelReview.reviewInfo.reviewText}
        </More>
        "
        <br></br>
        <ReadMore onClick={readMore} id="readMore">Read more{'\u2bc6'}</ReadMore>
      </div>
      <br></br>
      <br></br>
      <div><b>Date of stay</b>: {moment(currHotelReview.reviewInfo.reviewDate).format('MMM Do')}</div>
      <br></br>
      <div><b>Trip type: </b>{currHotelReview.reviewInfo.reviewTripType}</div>
      <br></br>
      <hr></hr>
      <Disclaimer>
        This review is the subjective opinion of a TripAdCoba member and not of TripAdCoba LLC.
        <br></br>
        <br></br>
      </Disclaimer>
      <ReviewsBodyHelpfulShare><div>{'\ud83d\udd92'} Helpful</div>   <div>{'\uE800'} Share</div></ReviewsBodyHelpfulShare>
    </ReviewsBody>
    <Footer></Footer>
    <ReviewsFooter>
      <ReviewsFooterResponse>
        <ReviewsResponderProfilePic src={currHotelReview.responderInfo.responderPicture}></ReviewsResponderProfilePic>
        <ReviewsResponse>
          <div>{currHotelReview.responderInfo.responderOrg}</div>
          <ReviewsResponseDate>Responded {moment(currHotelReview.responderInfo.responderDate).fromNow()}</ReviewsResponseDate>
          <br></br>
          <ReviewsResponseText>
            <div>{currHotelReview.responderInfo.responderText}</div>
            <br></br>
            <div>{currHotelReview.responderInfo.responderClose},</div>
            <br></br>
            <div>{currHotelReview.responderInfo.responderName}</div>
            <div>{currHotelReview.responderInfo.responderPosition}</div>
          </ReviewsResponseText>
        </ReviewsResponse>
      </ReviewsFooterResponse>
    </ReviewsFooter>
    <hr></hr>
    <Disclaimer>
      This response is the subjective opinion of the management representative and not of TripAdCoba HRR.
      <br></br>
      <br></br>
    </Disclaimer>
  </ReviewsReview>
);

export default Review;