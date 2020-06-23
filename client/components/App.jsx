import React from 'react';
import axios from 'axios';
// import HighlightsList from '';
// import ReviewsCounter from '';
// import ReviewsSearch from '';
// import ReviewsList from '';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: 4,
      reviews: []
    };
    this.getReviews = this.getReviews.bind(this);
  }

  getReviews() {
    axios
      .get(`/reviews/${this.state.productId}`)
      .then((data)=>{
        this.setState({
          reviews: data.data
        });
      })
      .catch((err)=>{
        console.error(err);
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
        {/* <HighlightsList/>
        <div></div>
        <ReviewsCounter/>
        <ReviewsSearch/>
        <ReviewsList/> */}
      </div>
    );
  }
}
export default App;