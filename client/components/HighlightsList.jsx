import React from 'react';
import HighlightsEntry from './HighlightsEntry.jsx';

class HighlightsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      top3: this.props.reviews.slice(0, 4)
    };
  }

  render() {
    return (
      <div className='highlights-wrapper'>
        <div className='highlights--header'>
          <h3>{this.props.totalReviews} Reviews</h3>
          <button></button>
        </div>
        <div id='reviews-accordion'>
          <h3>Review Highlights</h3>
          <ul>
            {this.props.reviews.map((review, index)=>(
              <HighlightsEntry
                key={index}
                review={review}
              />))}
          </ul>
        </div>
      </div>
    );
  }
}
export default HighlightsList;