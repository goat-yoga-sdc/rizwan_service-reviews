import React from 'react';
import axios from 'axios';
import Pagination from 'react-js-pagination';
import ReviewsEntry from './ReviewsEntry.jsx';

class ReviewsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    const offset = (pageNumber - 1) * 10;
    // const currentPageOfReviews = this.props.reviewsToPaginate.slice(offset, offset + 10);
    this.props.setAppState('activePage', pageNumber);
    this.props.setAppState('currentPageOfReviews', (!this.props.searchPerformed ? this.props.reviews.slice(offset, offset + 10) : this.props.searchResults.slice(offset, offset + 10)));
    // this.props.setAppState({
    //   activePage: pageNumber,
    //   currentPageOfReviews: !this.props.searchPerformed ? this.props.reviews.slice(offset, offset + 10) : this.props.searchResults.slice(offset, offset + 10)
    // });
  }

  render() {
    return (
      <div className='review-list'>
        {this.props.currentPageOfReviews.length ?
          <aside>
            {this.props.currentPageOfReviews.map((review, index) => (
              <ReviewsEntry
                key={index}
                review={review}
              />))}
            <p className="displaying-reviews-text">Displaying Reviews
            <b> {(this.props.activePage - 1) * 10 + 1} - {this.props.currentPageOfReviews.length >= 10 ? this.props.activePage * 10 : (this.props.activePage - 1) * 10 + this.props.currentPageOfReviews.length}</b>
            </p>
            <button className="reviews-scroll-to-top" onClick={this.props.scrollToReviewsList}>
              <b>Back to Top</b>
            </button>
          </aside>
          : <h3 className='noResults'>Sorry, no results were found</h3>}
        <Pagination
          hideDisabled
          activePage={this.props.activePage}
          itemsCountPerPage={10}
          totalItemsCount={!this.props.searchPerformed ? this.props.reviews.length : this.props.searchResults.length}
          prevPageText={'<< Previous'}
          nextPageText={'Next >>'}
          hideFirstLastPages={true}
          pageRangeDisplayed={1}
          onChange={this.handlePageChange}
        />
      </div>
    );
  }
}
export default ReviewsList;