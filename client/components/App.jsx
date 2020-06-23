import React from 'react';
import axios from 'axios';
// import HighlightsList from '';
import ReviewsCounter from './ReviewsCounter.jsx';
// import ReviewsSearch from '';
// import ReviewsList from '';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: 4,
      avgRating: 0,
      totalReviews: 0,
      reviews: []
    };
    this.getReviews = this.getReviews.bind(this);
    this.calculateTotalReviews = this.calculateTotalReviews.bind(this);
    this.calculateAvgRating = this.calculateAvgRating.bind(this);
  }

  getReviews() {
    axios
      .get(`/reviews/${this.state.productId}`)
      .then((data)=>{
        this.setState({
          reviews: data.data
        });
      })
      .then(()=>{
        this.calculateTotalReviews();
        this.calculateAvgRating();
      })
      .catch((err)=>{
        console.error(err);
      });
  }

  calculateTotalReviews() {
    this.setState((state, props)=>({
      totalReviews: this.state.reviews.length
    }));
  }

  calculateAvgRating() {
    //iterate over each review and extract the rating value, add them together, then divide by the totalReviews
    let total = this.state.reviews.reduce((accumulator, currentValue) => accumulator + currentValue.rating, 0);
    console.log(total);
    let avgRating = (total / this.state.reviews.length).toPrecision(2);
    console.log(avgRating);
    this.setState({
      avgRating: parseFloat(avgRating)
    });
  }

  componentDidMount() {
    this.getReviews();
    // setInterval(this.getMessages, 20000);
  }

  render() {
    return (
      <div>
        Hello From React
        {/* <HighlightsList/> */}
        <div></div>
        <ReviewsCounter totalReviews={this.state.totalReviews} avgRating={this.state.avgRating}/>
        {/* <ReviewsSearch/>
        <ReviewsList/> */}
      </div>
    );
  }
}
export default App;