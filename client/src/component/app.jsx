import React from 'react';
import ReactDOM from 'react-dom';
import Review from './review.jsx'
import axios from 'axios';


class ReviewApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hotelReviews: []
    };
  }

  componentDidMount() {
    axios.get('/reviews')
      .then(result => {
        this.setState({hotelReviews: result.data});
      });
  }

  readMore(event) {
    let prev = event.target.parentElement.children[0]
    let moreText = event.target.parentElement.children[1];
    let readMore = event.target;
    console.log(event.target);
    // console.log('prev.style.display: ', prev.style.display);
    if (prev.style.display === "none") {
      prev.style.display = "inline";
      readMore.innerHTML = "Read more";
      moreText.style.display = "none";
    } else {
      prev.style.display = "none";
      readMore.innerHTML = "Read less";
      moreText.style.display = "inline";
    }
  }

  render() {
    let hotelReviews = this.state.hotelReviews;
    return (
      <div className='reviews-container'>
        <section className='reviews-filter'>Reviews / Filter Section</section>
        <br></br>
        <section className='reviews-search'> Search Section</section>
        <br></br>
        <div className='reviews-table'>
          {hotelReviews.map(review => <div><Review key={review._id} currHotelReview={review} readMore={this.readMore.bind(this)}/><br></br></div>)}
        </div>
      </div>
    )
  }
}

export default ReviewApp;