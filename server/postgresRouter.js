const router = require('express').Router();
const postgresController = require('./postgresController.js');

/* Will have just one router/controller to handle both product id or name.
The distinction will be made in the model, where the param will be analyzed based on data type. */
router
  .route('/:productId')
  .get(postgresController.getByProdId);

router
  .route('/:productId/sort/:sortBy')
  .get(postgresController.getByProdIdSort);

router
  .route('/:productId/:queryStr')
  .get(postgresController.searchReviews);

router
  .route('/:productId/skinType/:skinType')
  .get(postgresController.getBySkinType);

router
  .route('/:productId/skinShade/:skinShade')
  .get(postgresController.getBySkinShade);

router
  .route('/:productId/ageRange/:ageRange')
  .get(postgresController.getByAgeRange);

router
  .route('/:reviewId/upVote')
  .put(postgresController.postUpVote);

router
  .route('/:reviewId/downVote')
  .put(postgresController.postDownVote);

router
  .route('/:productId/newPost')
  .post(postgresController.postNewReview);

router
  .route('/:reviewId/delete')
  .delete(postgresController.deleteReviewById);

module.exports = router;
