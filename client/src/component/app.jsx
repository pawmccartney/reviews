import React from 'react';
import ReactDOM from 'react-dom';
import Review from './review.jsx'


class reviewApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className='reviews-container'>
        <section className='reviews-filter'>Reviews / Filter Section</section>
        <hr></hr>
        <section className='reviews-search'> Search Section</section>
        <hr></hr>
        <div className='reviews-table'>
          <Review/>
        </div>
      </div>
    )
  }
}

export default reviewApp;