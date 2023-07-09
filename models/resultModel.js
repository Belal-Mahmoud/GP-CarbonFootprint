const mongoose = require('mongoose');
// const Dataa = require('./dataModel');

const resultSchema = new mongoose.Schema(
  {
    mobileDieselResults: [Number],
    mobileDieselResult: Number,

    mobileGasolineResults: [Number],
    mobileGasolineResult: Number,

    mobileResults: [Number],
    mobileResult: Number,

    ACsResults: [Number],
    ACsResult: Number,

    stationaryResults: [Number],
    stationaryResult: Number,

    stationaryDieselResults: [Number],
    stationaryDieselResult: Number,

    electricityResults: [Number],
    electricityResult: Number,

    fertilizerUreaResults: [Number],
    fertilizerUreaResult: Number,

    fertilizerNitrateResults: [Number],
    fertilizerNitrateResult: Number,

    waterResults: [Number],
    waterResult: Number,

    incinerationWasteResults: [Number],
    incinerationWasteResult: Number,

    underGroungWasteResults: [Number],
    underGroungWasteResult: Number,

    year: Number,
    data: {
      type: mongoose.Schema.ObjectId,
      ref: 'Data',
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// resultSchema.post('save', async function (doc, next) {
//   doc.year = await Dataa.findById(doc.data).year;
//   next();
// });

const Result = mongoose.model('Result', resultSchema);

module.exports = Result;
