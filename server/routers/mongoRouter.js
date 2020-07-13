const router = require('express').Router();
const mongoController = require('./mongoController.js')

/* Will have just one router/controller to handle both product id or name.
The distinction will be made in the model, where the param will be analyzed based on data type. */
router
  .route('/:productId')
  .get(mongoController.getByProdId);

router
  .route('/:productId/sort/:sortBy')
  .get(mongoController.getByProdIdSort);

router
  .route('/:productId/:queryStr')
  .get(mongoController.searchReviews);

router
  .route('/:productId/skinType/:skinType')
  .get(mongoController.getBySkinType);

router
  .route('/:productId/skinShade/:skinShade')
  .get(mongoController.getBySkinShade);

router
  .route('/:productId/ageRange/:ageRange')
  .get(mongoController.getByAgeRange);

// vote control are update operations
// even though it has post in it's name
router
  .route('/:reviewId/upVote')
  .put(mongoController.postUpVote);

router
  .route('/:reviewId/downVote')
  .put(mongoController.postDownVote);

router
  .route('/:productId/newPost')
  .post(mongoController.postNewReview);

router
  .route('/:reviewId/delete')
  .delete(mongoController.deleteReviewById);

module.exports = router;
