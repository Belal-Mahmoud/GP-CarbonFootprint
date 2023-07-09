const mongoose = require('mongoose');
const validator = require('validator');
const clacFunctions = require('../utils/calcFunctions');
const result = require('./resultModel');

const dataSchema = new mongoose.Schema(
  {
    year: {
      type: Number,
      required: [true, 'Data must have a year.'],
      unique: true,
      trim: true,
      maxlength: [4, 'Data year must have 4 digits.'],
      minlength: [4, 'Data year must have 4 digits.'],
    },
    mobileDiesel: {
      type: [Number],
      required: [true, 'Data must have mobile fuel combustion value.'],
      trim: true,
      validate: {
        validator: function () {
          return 12 === this.mobileDiesel.length;
        },
        message: 'You have to enter 12 mobile diesel fuel combustion values.',
      },
    },
    mobileGasoline: {
      type: [Number],
      required: [true, 'Data must have mobile gasoline fuel combustion value.'],
      trim: true,
      validate: {
        validator: function () {
          return 12 === this.mobileGasoline.length;
        },
        message: 'You have to enter 12 mobile fuel combustion values.',
      },
    },
    stationary: {
      type: [Number],
      required: [true, 'Data must have stationary fuel combustion value.'],
      trim: true,
      validate: {
        validator: function () {
          return 12 === this.stationary.length;
        },
        message: 'You have to enter 12 stationary fuel combustion values.',
      },
    },
    stationaryDiesel: {
      type: [Number],
      required: [true, 'Data must have stationary fuel combustion value.'],
      trim: true,
      validate: {
        validator: function () {
          return 12 === this.stationaryDiesel.length;
        },
        message: 'You have to enter 12 stationary fuel combustion values.',
      },
    },
    ACs: {
      type: [Number],
      required: [true, 'Data must have refrigerator & ACs value.'],
      trim: true,
      validate: {
        validator: function () {
          return 12 === this.ACs.length;
        },
        message: 'You have to enter 12 refrigerator & ACs values.',
      },
    },
    fertilizerUrea: {
      type: [Number],
      required: [true, 'Data must have fertilizer value.'],
      trim: true,
      validate: {
        validator: function () {
          return 12 === this.fertilizerUrea.length;
        },
        message: 'You have to enter 12 fertilizer values.',
      },
    },
    fertilizerNitrate: {
      type: [Number],
      required: [true, 'Data must have fertilizer value.'],
      trim: true,
      validate: {
        validator: function () {
          return 12 === this.fertilizerNitrate.length;
        },
        message: 'You have to enter 12 fertilizer values.',
      },
    },
    electricity: {
      type: [Number],
      required: [true, 'Data must have electricity value.'],
      trim: true,
      validate: {
        validator: function () {
          return 12 === this.electricity.length;
        },
        message: 'You have to enter 12 electricity values.',
      },
    },
    water: {
      type: [Number],
      required: [true, 'Data must have water value.'],
      trim: true,
      validate: {
        validator: function () {
          return 12 === this.water.length;
        },
        message: 'You have to enter 12 water values.',
      },
    },
    incinerationWaste: {
      type: [Number],
      required: [true, 'Data must have waste value.'],
      trim: true,
      validate: {
        validator: function () {
          return 12 === this.incinerationWaste.length;
        },
        message: 'You have to enter 12 incineration waste values.',
      },
    },
    underGroungWaste: {
      type: [Number],
      required: [true, 'Data must have waste value.'],
      trim: true,
      validate: {
        validator: function () {
          return 12 === this.underGroungWaste.length;
        },
        message: 'You have to enter 12 underGroung waste values.',
      },
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual populate
dataSchema.virtual('results', {
  ref: 'Result',
  foreignField: 'data',
  localField: '_id',
});

const addArrays = (arr1, arr2) => {
  let result = [];
  for (let i = 0; i < 12; i++) {
    result[i] = arr1[i] + arr2[i];
  }
  return result;
};

dataSchema.post('save', function (next) {
  const electricity = clacFunctions.electricity(this.electricity),
    stationary = clacFunctions.stationary(this.stationary),
    stationaryDiesel = clacFunctions.stationaryDiesel(this.stationaryDiesel),
    mobileDiesel = clacFunctions.mobileDiesel(this.mobileDiesel),
    mobileGasoline = clacFunctions.mobileGasoline(this.mobileGasoline),
    ACs = clacFunctions.ACs(this.ACs),
    fertilizerUrea = clacFunctions.fertilizerUrea(this.fertilizerUrea),
    fertilizerNitrate = clacFunctions.fertilizerNitrate(this.fertilizerNitrate),
    water = clacFunctions.water(this.water),
    incinerationWaste = clacFunctions.incinerationWaste(this.incinerationWaste),
    underGroungWaste = clacFunctions.underGroungWaste(this.underGroungWaste);

  new result({
    electricityResults: electricity.results,
    electricityResult: electricity.sum,

    stationaryResults: stationary.results,
    stationaryResult: stationary.sum,

    stationaryDieselResults: stationaryDiesel.results,
    stationaryDieselResult: stationaryDiesel.sum,

    mobileDieselResults: mobileDiesel.results,
    mobileDieselResult: mobileDiesel.sum,

    mobileGasolineResults: mobileGasoline.results,
    mobileGasolineResult: mobileGasoline.sum,

    mobileResults: addArrays(mobileDiesel.results, mobileGasoline.results),
    mobileResult: mobileDiesel.sum + mobileGasoline.sum,

    ACsResults: ACs.results,
    ACsResult: ACs.sum,

    fertilizerUreaResults: fertilizerUrea.results,
    fertilizerUreaResult: fertilizerUrea.sum,

    fertilizerNitrateResults: fertilizerNitrate.results,
    fertilizerNitrateResult: fertilizerNitrate.sum,

    waterResults: water.results,
    waterResult: water.sum,

    incinerationWasteResults: incinerationWaste.results,
    incinerationWasteResult: incinerationWaste.sum,

    underGroungWasteResults: underGroungWaste.results,
    underGroungWasteResult: underGroungWaste.sum,

    data: this._id,
  }).save();
});

//  ({ electricity, stationary, mobileDiesel, mobileGasoline, ACs, fertilizer, water, waste }

// dataSchema.pre(/^findOneAndUpdate/, async function (next) {
//   this.data = await this.findOne();

//   const changedData = [...req.body];

//   await Result.findByIdAndUpdate(this.data._id, {
//     electricityResults: changedData.electricity !== undefined ? changedData.electricity.results,
//     electricityResult: electricity.sum,

//     stationaryResults: stationary.results,
//     stationaryResult: stationary.sum,

//     mobileDieselResults: mobileDiesel.results,
//     mobileDieselResult: mobileDiesel.sum,

//     mobileGasolineResults: mobileGasoline.results,
//     mobileGasolineResult: mobileGasoline.sum,

//     mobileResults: addArrays(mobileDiesel.results, mobileGasoline.results),
//     mobileResult: mobileDiesel.sum + mobileGasoline.sum,

//     ACsResults: ACs.results,
//     ACsResult: ACs.sum,

//     fertilizerResults: fertilizer.results,
//     fertilizerResult: fertilizer.sum,

//     waterResults: water.results,
//     waterResult: water.sum,

//     wasteResults: waste.results,
//     wasteResult: waste.sum,
//   });

//   next();
// });

// dataSchema.pre(/^findOneAndDelete/, async function (next) {
//   this.data = await this.findOne();
//   this.result = await Result.findByIdAndDelete(this.data._id);

//   next();
// });

const Data = mongoose.model('Data', dataSchema);

module.exports = Data;

// // Electricity.
//   const electricity = 0.00036758;

//   // Stationary Fuel.
//   const stationaryFuel = 47.3 * (1 / 1000000) * 1.9 * (1 / 1000);
//   const co2StationaryFuel = stationaryFuel * 63100;
//   const ch4StationaryFuel = stationaryFuel * 5 * 28;
//   const n2oStationaryFuel = stationaryFuel * 0.1 * 265;

//   // Mobile Fuel.
//   const mobileFuel = 847.31 * (1 / 1000000) * 1.9 * (1 / 1000);
//   //// 1) Diesel.
//   const co2MobileFuelDiesel = mobileFuel * 74100;
//   const ch4MobileFuelDiesel = mobileFuel * 3.9 * 28;
//   const n2oMobileFuelDiesel = mobileFuel * 3.9 * 265;
//   //// 2) Gasoline.
//   const co2MobileFuelGasoline = mobileFuel * 69300;
//   const ch4MobileFuelGasoline = mobileFuel * 3.8 * 28;
//   const n2oMobileFuelGasoline = mobileFuel * 5.7 * 265;

//   let sumElectricity = 0,
//     sumStationaryFuel = 0,
//     sumMobileFuelDiesel = 0,
//     sumMobileFuelGasoline = 0;

//   for (let i = 0; i < 12; i++) {
//     this.electricityResults[i] = this.electricity[i] * electricity;
//     sumElectricity += this.electricityResults[i];

//     this.stationaryFuelResults[i] =
//       this.stationaryFuel[i] * co2StationaryFuel +
//       this.stationaryFuel[i] * ch4StationaryFuel +
//       this.stationaryFuel[i] * n2oStationaryFuel;
//     sumStationaryFuel += this.stationaryFuelResults[i];

//     this.mobileFuelDieselResults[i] =
//       this.mobileFuelDiesel[i] * co2MobileFuelDiesel +
//       this.mobileFuelDiesel[i] * ch4MobileFuelDiesel +
//       this.mobileFuelDiesel[i] * n2oMobileFuelDiesel;
//     sumMobileFuelDiesel += this.mobileFuelDieselResults[i];

//     this.mobileFuelGasolineResults[i] =
//       this.mobileFuelGasoline[i] * co2MobileFuelGasoline +
//       this.mobileFuelGasoline[i] * ch4MobileFuelGasoline +
//       this.mobileFuelGasoline[i] * n2oMobileFuelGasoline;
//     sumMobileFuelGasoline += this.mobileFuelGasolineResults[i];

//     this.mobileFuelResults[i] =
//       this.mobileFuelDieselResults[i] + this.mobileFuelGasolineResults[i];
//   }
//   this.electricityResult = sumElectricity;

//   this.stationaryFuelResult = sumStationaryFuel;

//   this.mobileFuelDieselResult = sumMobileFuelDiesel;
//   this.mobileFuelGasolineResult = sumMobileFuelGasoline;
//   this.mobileFuelResult = sumMobileFuelDiesel + sumMobileFuelGasoline;
