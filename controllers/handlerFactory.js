const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    // To allow for nested GET reviewson tour (hack)
    let filter = {};
    if (req.params.id) filter = { _id: req.params.id };

    const features = new APIFeatures(Model.find(filter), req.query)
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

exports.getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findOne({ _id: req.params.id });

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

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'Success',
      data: {
        data: doc,
      },
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findOneAndUpdate({ _id: req.params.id }, req.body, {
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

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    {
      const doc = await Model.findOneAndDelete({ _id: req.params.id });

      if (!doc)
        return next(new AppError('No Document Found With That ID!', 404));

      res.status(204).json({
        status: 'Success',
        data: null,
      });
    }
  });
