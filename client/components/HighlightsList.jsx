import React from 'react';
import HighlightsEntry from './HighlightsEntry.jsx';

class HighlightsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accordionOpen: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      accordionOpen: !this.state.accordionOpen
    });
  }

  render() {
    if (!this.state.accordionOpen) {
      return (
        <div className='highlights-wrapper'>
          <div className='highlights--header' onClick={this.handleClick}>
            <h3>{this.props.totalReviews} Reviews</h3>
            <button>-</button>
          </div>
          <div id='reviews-accordion'>
            <h3>Review Highlights</h3>
            <ul>
              {this.props.highlights.map((review, index)=>(
                <HighlightsEntry
                  key={index}
                  review={review}
                />))}
            </ul>
            <button display="flex" width="100%" className='readAll' onClick={this.props.scrollToReviewsList}>
              <div>
                <span>Read All Reviews</span>
                <span display="inline-block" size="1">↓</span>
              </div>
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className='highlights-wrapper'>
          <div className='highlights--header' onClick={this.handleClick}>
            <h3>{this.props.totalReviews} Reviews</h3>
            <button>+</button>
          </div>
        </div>
      );
    }

  }
}
export default HighlightsList;