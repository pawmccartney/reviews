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
      monthFilter: [],
      typeFilter: [],
      ratingsCount: 0,
      monthCount: 0,
      typeCount: 0,
    };
  }

  componentDidMount() {
    axios.get('/reviews')
      .then(result => {
        this.setState({hotelReviews: result.data, view: result.data, ratingsFilter: result.data, monthFilter: result.data, typeFilter: result.data});
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


  duplicates(arr, ratingsCount, monthCount, typeCount) {
    console.log('totalFilters', arr);

    if (ratingsCount === 0 && monthCount === 0 && typeCount === 0) {
      console.log('zero zero');
      return [this.state.hotelReviews, false];
    }

    let newArr = [];
    let dict = {};
    let restored = [];
    let doubles = [];

    for (let i = 0; i < arr.length; i++) {
        newArr.push(JSON.stringify(arr[i]));
    }

    newArr.forEach((element) => {
      if (dict[element]) {
        if(dict[element] === 'one') {
          doubles.push(element);
          dict[element] = 'more';
        }
      } else {
        dict[element] = 'one';
      }
    });

    doubles.forEach((double) => {
        restored.push(JSON.parse(double));
    });
    return [restored, true];
  }

  filterByRatings(event) {
    let currFilter = this.state.ratingsFilter;
    let monthCount = this.state.monthCount;
    let ratingsCount = this.state.ratingsCount;
    let typeCount = this.state.typeCount;
    let allReviews = this.state.hotelReviews;
    let scoreboard = ['Terrible', 'Poor', 'Average', 'Very Good', 'Excellent'];
    let score = scoreboard.indexOf(event.target.nextSibling.innerHTML) + 1;

    function reducer(total, num) {
      return total + num;
    };

    //if click checked the box
    if(event.target.checked) {
      ratingsCount++;

      if (ratingsCount === 1) {
        currFilter = [];
      }

      let newlyFiltered = [];
      allReviews.map((post) => {
        let ratings = (post.reviewInfo.reviewRatings).reduce(reducer);
        //if the ratings equals the score
        if (ratings === score) {
          newlyFiltered.push(post);
        }
      });
      let filtered = newlyFiltered.concat(currFilter);
      let totalFilters = (this.state.monthFilter).concat(filtered);
      this.setState({ratingsCount: ratingsCount});
      let restored = this.duplicates(totalFilters, ratingsCount, monthCount, typeCount);
      this.setState({view: restored[0], ratingsFilter: filtered});

      console.log('ratingsFilter', filtered);
      console.log('MonthFilter', this.state.monthFilter);

    } else { //if click unchecked the box
      ratingsCount--;
      let newView = [];
      currFilter.map((post) => {
        let ratings = (post.reviewInfo.reviewRatings).reduce(reducer);
        //if the ratings equals the score
        if (ratings !== score) {
          newView.push(post);
        }
      });

      this.setState({ratingsCount: ratingsCount});
      let totalFilters = (this.state.monthFilter).concat(newView);
      let restored = this.duplicates(totalFilters, ratingsCount, monthCount, typeCount);

      if (newView.length === 0 && ratingsCount === 0 && restored[1]) {
        this.setState({view: allReviews, ratingsFilter: allReviews});
        console.log('ratingsFilter', allReviews);
        console.log('MonthFilter', this.state.monthFilter);
      } else {
        this.setState({view: restored[0], ratingsFilter: newView});
        console.log('ratingsFilter', newView);
        console.log('MonthFilter', this.state.monthFilter);
      }
    }
  }

  filterByMonth(event) {
    let month = event.target.nextSibling.innerHTML;

    let currFilter = this.state.monthFilter;
    let monthCount = this.state.monthCount;
    let ratingsCount = this.state.ratingsCount;
    let typeCount = this.state.typeCount;
    let allReviews = this.state.hotelReviews;
    let scoreboard = ['Jan','Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let range = month.split('-');
    range = [scoreboard.indexOf(range[0]) + 1, scoreboard.indexOf(range[1]) + 1];

    function reducer(total, num) {
      return total + num;
    };

    //if click checked the box
    if(event.target.checked) {
      monthCount++;

      if (monthCount === 1) {
        currFilter = [];
      }

      let newlyFiltered = [];
      allReviews.map((post) => {
        //get the date
        let d = new Date(post.reviewInfo.reviewDate);
        d = d.getMonth();
        //if the date is within range
        if (range[0] <= d && range[1] >= d) {
          // add it to the currView
          newlyFiltered.push(post);
        }
      });
      let filtered = newlyFiltered.concat(currFilter);
      let totalFilters = (this.state.ratingsFilter).concat(filtered);
      this.setState({monthCount: monthCount});
      let restored = this.duplicates(totalFilters, ratingsCount, monthCount, typeCount);
      this.setState({view: restored[0], monthFilter: filtered});

      console.log('ratingsFilter', this.state.ratingsFilter);
      console.log('MonthFilter', filtered);

    } else { //if click unchecked the box
      monthCount--;
      let newView = [];
      currFilter.map((post) => {
        //get the date
        let d = new Date(post.reviewInfo.reviewDate);
        d = d.getMonth();
        //if the date is within range
        if (!(range[0] <= d && range[1] >= d)) {
          // add it to the currView
          newView.push(post);
        }
      });

      this.setState({monthCount: monthCount});
      let totalFilters = (this.state.ratingsFilter).concat(newView);
      let restored = this.duplicates(totalFilters, ratingsCount, monthCount, typeCount);

      if (newView.length === 0 && monthCount === 0 && !restored[1]) {
        this.setState({view: allReviews, monthFilter: allReviews});
        console.log('ratingsFilter', this.state.ratingsFilter);
        console.log('MonthFilter', allReviews);
      } else {
        this.setState({view: restored[0], monthFilter: newView});
        console.log('ratingsFilter', this.state.ratingsFilter);
        console.log('MonthFilter', newView);
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