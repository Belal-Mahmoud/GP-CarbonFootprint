const express = require('express');
const resultController = require('../controllers/resultController');
const authController = require('../controllers/authController');

const router = express.Router();

// router.use(authController.protect);

router.route('/').get(resultController.getAllResults);

router.route('/id/:id').get(resultController.getResult);

module.exports = router;
