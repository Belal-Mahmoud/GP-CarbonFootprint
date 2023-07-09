const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('./../utils/apiFeatures');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data.
  if (req.body.password || req.body.passwordConfirm)
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    );

  // 2) Filtered out unwanted fields names that are not allowed to be updated.
  const filterBody = filterObj(req.body, 'name', 'email');

  // 3) Update user document.
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filterBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'Success',
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'Success',
    data: null,
  });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  // To allow for nested GET reviewson tour (hack)
  let filter = {};
  if (req.params.id) filter = { _id: req.params.id };

  const features = new APIFeatures(User.find(filter), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const doc = await features.query;

  res.status(200).json({
    status: 'Success',
    requestedAt: req.requestTime,
    results: doc.length,
    data: {
      data: doc,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const doc = await User.findById(req.params.id);

  if (!doc) {
    return next(new AppError('No Document Found With That ID!', 404));
  }

  res.status(200).json({
    status: 'Success',
    data: {
      data: doc,
    },
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'This route is not defined! Please use /signup instead.',
  });
};

// Do NOT update password with this!
exports.updateUser = catchAsync(async (req, res, next) => {
  const doc = await User.findOneAndUpdate({ _id: req.params.id }, req.body, {
    // FindByIdAndUpdate dosn't run 'save' MW.
    new: true,
    runValidators: true, // To make sure that the updated data will be tested by our validators
  });

  if (!doc) {
    return next(new AppError('No Document Found With That ID!', 404));
  }

  res.status(200).json({
    status: 'Success',
    data: {
      data: doc,
    },
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  {
    const doc = await User.findOneAndDelete({ _id: req.params.id });

    if (!doc) return next(new AppError('No Document Found With That ID!', 404));

    res.status(204).json({
      status: 'Success',
      data: null,
    });
  }
});
