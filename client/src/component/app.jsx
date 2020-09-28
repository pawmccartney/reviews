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
        console.log(this.state.hotelReviews);
      });
  }

  render() {
    let hotelReviews = this.state.hotelReviews;
    return (
      <div className='reviews-container'>
        <section className='reviews-filter'>Reviews / Filter Section</section>
        <hr></hr>
        <section className='reviews-search'> Search Section</section>
        <hr></hr>
        <div className='reviews-table'>
          {hotelReviews.map(review => <div><Review key={review._id} currHotelReview={review}/><br></br></div>)}
        </div>
      </div>
    )
  }
}

export default ReviewApp;