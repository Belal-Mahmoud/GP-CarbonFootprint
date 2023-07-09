const express = require('express');
const userController = require('../controllers/userController'); // We're able to use DES here.
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/').post(userController.createUser);
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// router.use(authController.protect); // Protect all routes after this MW.

router.patch('/updateMyPassword', authController.updatePassword);

router.get('/me', userController.getMe, userController.getUser);

router.patch('/updateMe', userController.updateMe);
router.delete('/deleteMe', userController.deleteMe);

// Those endpoints 100% fit that 'REST' philosophy, and adminstrator is going to use them.

// router.use(authController.restrictTo('admin'));
router.route('/').get(userController.getAllUsers);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
