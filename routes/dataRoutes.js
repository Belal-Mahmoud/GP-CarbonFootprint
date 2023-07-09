const express = require('express');
const dataController = require('../controllers/dataController');
const authController = require('../controllers/authController');

const router = express.Router();

// router.use(authController.protect, authController.restrictTo('admin'));

router
  .route('/')
  .get(dataController.getAllDatas)
  .post(dataController.createData);

router
  .route('/year/:year')
  .get(dataController.getData)
  .patch(dataController.updateData)
  .delete(dataController.deleteData);

module.exports = router;
