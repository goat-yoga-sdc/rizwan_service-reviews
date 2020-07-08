const router = require('express').Router();
const controller = require('./reviewsController.js');

/* Will have just one router/controller to handle both product id or name.
The distinction will be made in the model, where the param will be analyzed based on data type. */
router
  .route('/:productId')
  .get(controller.getByProdId);

router
  .route('/:productId/sort/:sortBy')
  .get(controller.getByProdIdSort);

router
  .route('/:productId/:queryStr')
  .get(controller.searchReviews);

router
  .route('/:productId/skinType/:skinType')
  .get(controller.getBySkinType);

router
  .route('/:productId/skinShade/:skinShade')
  .get(controller.getBySkinShade);

router
  .route('/:productId/ageRange/:ageRange')
  .get(controller.getByAgeRange);

// vote control are update operations
// even though it has post in it's name
router
  .route('/:reviewId/upVote')
  .put(controller.postUpVote);

router
  .route('/:reviewId/downVote')
  .put(controller.postDownVote);

router
  .route('/newPost/:productId')
  .post(controller.postNewReview);

router
  .route('/:reviewId/delete')
  .delete(controller.deleteReviewById);

module.exports = router;
