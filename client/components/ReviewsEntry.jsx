import React from 'react';

class ReviewsEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    return (
      <article className='review-article'>
        <section>
          <div className='review-user-info'>
            <p className='review-display-name'>{this.props.review.firstName}</p>
            <time>{this.props.review.reviewTime}</time>
            <p class="review-display-location">{this.props.review.place}</p>
            <ul class="review-user">
              <li><b>Skin Type</b> {this.props.review.skinType}</li>
              <li><b>Skin Shade</b> {this.props.review.skinShade}</li>
              <li><b>Age Range</b> {this.props.review.ageRange}</li>
            </ul>
          </div>
        </section>
        <section className='review-content'>
          <div className='review-text-container'>
            <div className='review-content-header'>
              <h3 className='review-title'>{this.props.review.reviewTitle}</h3>
            </div>
            <p className='review-body'>{this.props.review.reviewText}</p>
          </div>
          <footer>
            <p className='review-bottom-line'>
              <b>Bottom Line</b>
              {this.props.review.bottomLine}
            </p>
          </footer>

        </section>
      </article>
    );
  }
}
export default ReviewsEntry;