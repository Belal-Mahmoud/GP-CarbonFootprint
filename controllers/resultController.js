const Result = require('../models/resultModel');
const Data = require('../models/dataModel');
const catchAsync = require('./../utils/catchAsync');
const APIFeatures = require('./../utils/apiFeatures');
const mongoose = require('mongoose');
const removeSelection =
  '-mobileDieselResults -mobileGasolineResults -mobileResults -ACsResults -stationaryResults -stationaryDieselResults -electricityResults -fertilizerUreaResults -fertilizerNitrateResults -waterResults -incinerationWasteResults -underGroungWasteResults -__v';

exports.getAllResults = catchAsync(async (req, res, next) => {
  // To allow for nested GET reviewson tour (hack)
  let filter = {};
  if (req.params.id) filter = { data: req.params.id };

  const features = new APIFeatures(Result.find(filter), req.query)
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

exports.getResult = catchAsync(async (req, res, next) => {
  Result.findOne({ data: req.params.id });
  const doc = await Result.aggregate([
    {
      $match: {
        data: new mongoose.Types.ObjectId(req.params.id),
      },
    },
    {
      $lookup: {
        from: 'datas', // same collection, hence 'data'
        localField: 'data',
        foreignField: '_id',
        as: 'joined_data',
      },
    },
    {
      $unwind: '$joined_data',
    },

    {
      $addFields: {
        year: '$joined_data.year',
      },
    },
    {
      $project: {
        joined_data: 0, // change 'year' to your actual field name
        _id: 0, // exclude the _id field from the output
      },
    },
  ]);

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
