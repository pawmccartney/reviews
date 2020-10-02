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
      ratingsFilter: [],
      ratingsCount: 0,
      monthFilter: false,
      monthCount: 0
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


  unique(arr) {
    let newArr = [];
    let dict = {};
    let restored = [];
    for (let i = 0; i < arr.length; i++) {
        newArr.push(JSON.stringify(arr[i]));
    }

    newArr.forEach((element) => {
        if (!dict[element]) {
            dict[element] = true;
        }
    })

    let keys= Object.keys(dict);

    keys.forEach((key) => {
        restored.push(JSON.parse(key));
    });

    return restored;
  }

  filterByRatings(event) {
    let totalFilters = [].concat(this.state.ratingsFilter); //change later to concat through every filters
    let currFilter = this.state.ratingsFilter;
    let count = this.state.ratingsCount;
    let parent = event.target.parentElement.parentElement;
    let allReviews = this.state.hotelReviews;
    let currView = this.state.view;
    let scoreboard = ['Terrible', 'Poor', 'Average', 'Very Good', 'Excellent'];
    let score = scoreboard.indexOf(event.target.nextSibling.innerHTML) + 1;

    function reducer(total, num) {
      return total + num;
    };

    //if click checked the box
    if(event.target.checked) {
      count++;
      // if (totalFilters.length === 0) {
      //   currView = [];
      //   // this.setState({ratingsFilter: true});
      // }
      let newlyFiltered = [];
      allReviews.map((post) => {
        let ratings = (post.reviewInfo.reviewRatings).reduce(reducer);
        //if the ratings equals the score
        if (ratings === score) {
          newlyFiltered.push(post);
        }
      });
      let filtered = newlyFiltered.concat(currFilter);
      totalFilters = [].concat(filtered);
      let restored = this.unique(totalFilters);
      this.setState({view: restored, ratingsFilter: filtered, ratingsCount: count});

    } else { //if click unchecked the box
      count--;
      let newView = [];
      currFilter.map((post) => {
        let ratings = (post.reviewInfo.reviewRatings).reduce(reducer);

        //if the ratings equals the score
        if (ratings !== score) {
          newView.push(post);
        }
      });
      this.setState({ratingsFilter: newView, ratingsCount: count});
      totalFilters = [].concat(newView);

      if (totalFilters.length === 0 && count === 0) {
        this.setState({view: allReviews});
        // this.setState({ratingsFilter: false});
      } else {
        let restored = this.unique(totalFilters);
        this.setState({view: restored});
      }
    }
  }

  filterByMonth(event) {
    let month = event.target.nextSibling.innerHTML;

    let allReviews = this.state.hotelReviews;
    let currView = this.state.view;
    let scoreboard = ['Jan','Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let checkCount = this.state.monthCount;
    let range = month.split('-');
    range = [scoreboard.indexOf(range[0]) + 1, scoreboard.indexOf(range[1]) + 1];

    function reducer(total, num) {
      return total + num;
    };

    //if click checked the box
    if(event.target.checked) {
      checkCount++;

      if (!this.state.monthFilter) {
        currView = [];
        this.setState({monthFilter: true});
      }
      allReviews.map((post) => {
        //get the date
        let d = new Date(post.reviewInfo.reviewDate);
        d = d.getMonth();
        //if the date is within range
        if (range[0] <= d && range[1] >= d) {
          // add it to the currView
          currView.push(post);
        }
        console.log(currView);
      });
      this.setState({view: currView});
      this.setState({monthCount: checkCount});
    } else { //if click unchecked the box
      checkCount--;
      let newView = [];
      currView.map((post) => {
        //get the date
        let d = new Date(post.reviewInfo.reviewDate);
        d = d.getMonth();
        //if the date is within range
        if (!(range[0] <= d && range[1] >= d)) {
          // add it to the currView
          newView.push(post);
        }
      });
      this.setState({monthCount: checkCount});
      console.log('checkCount', checkCount);
      if (newView.length === 0 && checkCount === 0) {
        console.log('length is zero');
        this.setState({view: allReviews});
        this.setState({monthFilter: false});
      } else {
        this.setState({view: newView});
      }
    }
  }

  render() {
    let view = this.state.view;
    return (
      <div>
        <Filters count={this.state.hotelReviews.length} filterByRatings={this.filterByRatings.bind(this)} filterByMonth={this.filterByMonth.bind(this)}/>
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