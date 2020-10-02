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
      hotelReviews: [],
      view: [],
      first: true
    };
  }

  componentDidMount() {
    axios.get('/reviews')
      .then(result => {
        this.setState({hotelReviews: result.data});
        this.setState({view: result.data});
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

  sort(arr, comparator = (post1, post2) => { return Number(post2) - Number(post1); }) {
    if (arr.length === 0) {
      return arr;
    }
    let dateNumber = function(date) {
      let e = new Date(date);
      let month = e.getMonth().toString();
      let day = e.getDate().toString();
      let year = e.getFullYear().toString();

      if (month.length < 2) {
        month = '0' + month;
      }
      if (day.length < 2) {
        day = '0' + day;
      }

      return [year, month, day].join('');
    };

    for (var i = 1; i < arr.length; i++) {
      let hole = i;
      let replace = arr[i]
      let post1 = arr[i].props.children[0].props.currHotelReview.reviewInfo.reviewDate;
      let post2 = arr[i - 1].props.children[0].props.currHotelReview.reviewInfo.reviewDate;
      while (hole && comparator(dateNumber(post1), dateNumber(post2)) < 0) {
        arr[hole] = arr[hole-1];
        hole--;
      }
      arr[hole] = replace;
    }
    return arr;
  }

  filterByRatings(event) {
    //test
    let parent = event.target.parentElement.parentElement;
    let labels = parent.getElementsByTagName('label');
    let allReviews = this.state.hotelReviews;
    let count = 0;
    for (let i = 0; i < labels.length; i++) {
      if (labels[i].children[0].checked) {
        count++;
      }
    }

    // if (count === 0) {
    //   // this.setState({view: allReviews});
    // } else {
      let currView = this.state.view;
      let scoreboard = ['Terrible', 'Poor', 'Average', 'Very Good', 'Excellent'];
      let score = scoreboard.indexOf(event.target.nextSibling.innerHTML) + 1;

      function reducer(total, num) {
        return total + num;
      };

      //if click checked the box
      if(event.target.checked) {
        if (this.state.first) {
          currView = [];
          this.setState({first: false});
        }
        allReviews.map((post) => {
          let ratings = (post.reviewInfo.reviewRatings).reduce(reducer);
          //if the ratings equals the score
          if (ratings === score) {
            currView.push(post);
          }
        });
        this.setState({view: currView});
      } else { //if click unchecked the box
        let newView = [];
        currView.map((post) => {
          let ratings = (post.reviewInfo.reviewRatings).reduce(reducer);

          //if the ratings equals the score
          if (ratings !== score) {
            newView.push(post);
          }
        });
        if (newView.length === 0) {
          this.setState({view: allReviews});
          this.setState({first: true});
        } else {
          this.setState({view: newView});
        }
      }
    // }
  }


  render() {
    let view = this.state.view;
    return (
      <div>
        <Filters count={this.state.hotelReviews.length} filterByRatings={this.filterByRatings.bind(this)}/>
        <br></br>
        <Search/>
        <br></br>
        <div className='reviews-table'>
          {this.sort(view.map(review => <div><Review key={review._id} currHotelReview={review} readMore={this.readMore.bind(this)}/><br></br></div>))}
        </div>
      </div>
    )
  }
}

export default ReviewApp;