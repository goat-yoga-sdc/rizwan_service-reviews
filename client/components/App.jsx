import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import ReviewsCounter from './ReviewsCounter.jsx';
import ReviewsSearch from './ReviewsSearch.jsx';
import ReviewsList from './ReviewsList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: Math.floor(Math.random() * 9000000),
      avgRating: 0,
      totalReviews: 0,
      reviews: [],
      searchPerformed: false,
      searchResults: [],
      currentPageOfReviews: [],
      activePage: 1,
    };
    this.setAppState = this.setAppState.bind(this);
    this.getReviews = this.getReviews.bind(this);
    this.setSearchPerformed = this.setSearchPerformed.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
    this.calculateTotalReviews = this.calculateTotalReviews.bind(this);
    this.calculateAvgRating = this.calculateAvgRating.bind(this);
    this.scrollToReviewsList = this.scrollToReviewsList.bind(this);
    // this.getProductId = this.getProductId.bind(this);
  }

  componentDidMount() {
    this.getReviews();
  }

  setAppState(property, data) {
    this.setState({ [property]: data });
  }

  setSearchPerformed() {
    if (this.state.searchPerformed === false) {
      this.setState({ searchPerformed: true });
    }
  }

  getProductId() {
    axios
      .get('/productId')
      .then((data) => {
        this.setState({ productId: data.data.productId });
      })
      .then(() => { this.getReviews() });
  }

  getReviews() {
    axios
      .get(`/reviews/${this.state.productId}`)
      .then((data) => {
        this.setState({
          reviews: data.data,
          currentPageOfReviews: data.data.slice(0, 10),
          activePage: 1,
        });
      })
      .then(() => {
        this.calculateTotalReviews();
        this.calculateAvgRating();
      })
      .catch((err) => { console.error(err) });
  }

  clearFilters() { this.setState({ searchPerformed: false }) }

  calculateTotalReviews() {
    this.setState({ totalReviews: this.state.reviews.length });
  }

  calculateAvgRating() {
    // iterate over each review and extract the rating value, add them together, then divide by the totalReviews
    const total = this.state.reviews.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue.rating, 0), 0);

    const avgRating = (total / this.state.reviews.length).toPrecision(2);

    this.setState({ avgRating: parseFloat(avgRating) });
  }

  scrollToReviewsList() {
    const position = $('#scrollTop').offset();
    $('html, body').animate({ scrollTop: (position.top - 130) }, 1000);
  }

  render() {
    let { totalReviews, avgRating, productId, reviews, reviews, searchResults, searchPerformed, currentPageOfReviews, activePage } = this.state
    return (
      <div>
        <div className="reviews-wrapper">
          <ReviewsCounter
            totalReviews={totalReviews}
            avgRating={avgRating}
          />
          <ReviewsSearch
            productId={productId}
            reviews={reviews}
            setAppState={this.setAppState}
            setSearchPerformed={this.setSearchPerformed}
            calculateTotalReviews={this.calculateTotalReviews}
            calculateAvgRating={this.calculateAvgRating}
          />
          <ReviewsList
            reviews={reviews}
            searchResults={searchResults}
            searchPerformed={searchPerformed}
            currentPageOfReviews={currentPageOfReviews}
            activePage={activePage}
            setAppState={this.setAppState}
            scrollToReviewsList={this.scrollToReviewsList}
          />
        </div>
      </div>
    );
  }
}
export default App;
