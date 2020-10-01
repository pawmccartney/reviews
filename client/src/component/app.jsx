import React from 'react';
import ReactDOM from 'react-dom';
import Review from './review.jsx';
import Filters from './filters.jsx';
import Search from './search.jsx';
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

  sort(array) {
    //each element has element.reviewInfo.reviewDate
    //use that to compare, greater one ends up front.

    return array
  }

  render() {
    let hotelReviews = this.state.hotelReviews;
    return (
      <div>
        <Filters/>
        <br></br>
        <Search/>
        <br></br>
        <div className='reviews-table'>
        {hotelReviews.map(review =>
          <div>
            hi
            <br></br>
          </div>
        )}
        </div>
      </div>
    )
  }
}

export default ReviewApp;