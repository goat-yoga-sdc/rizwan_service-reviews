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
          <div className='highlights--header'>
            <h3>{this.props.totalReviews} Reviews</h3>
            <button onClick={this.handleClick}>-</button>
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
    } else {
      return (
        <div className='highlights-wrapper'>
          <div className='highlights--header'>
            <h3>{this.props.totalReviews} Reviews</h3>
            <button onClick={this.handleClick}>+</button>
          </div>
        </div>
      );
    }

  }
}
export default HighlightsList;