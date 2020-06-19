const router = require('express').Router();
const controller = require('./controller.js');

//Will have just one router/controller to handle both product id or name. The distinction will be made in the model, where the param will be analyzed based on data type.
router
  .route('/:userId')
  .get(controller.getUser);

router
  .route('/auth')
  .post(controller.postAuth);

module.exports = router;