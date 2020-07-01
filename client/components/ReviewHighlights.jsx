import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import HighlightsList from './HighlightsList.jsx';

class ReviewHighlights extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: 6,
      totalReviews: 0,
      highlights: [],
    };
    this.getHighlights = this.getHighlights.bind(this);
    this.calculateTotalReviews = this.calculateTotalReviews.bind(this);
    this.scrollToReviewsList = this.scrollToReviewsList.bind(this);
  }

  getHighlights() {
    axios
      .get(`/reviews/${this.props.productId}/sort/5`)
      .then((data)=>{
        this.setState({
          highlights: data.data
        });
      })
      .then(()=>{
        this.calculateTotalReviews();
      })
      .catch((err)=>{
        console.error(err);
      });
  }

  calculateTotalReviews() {
    this.setState((state, props)=>({
      totalReviews: this.state.highlights.length
    }));
  }

  scrollToReviewsList() {
    let position = $('#scrollTop').offset();
    $('html, body').animate({ scrollTop: (position.top - 130)}, 1000);
  }

  componentDidMount() {
    this.getHighlights();
  }

  render() {
    return (
      <HighlightsList totalReviews={this.state.totalReviews} highlights={this.state.highlights.slice(0, 3)} scrollToReviewsList={this.scrollToReviewsList}/>
    );
  }
}
export default ReviewHighlights;