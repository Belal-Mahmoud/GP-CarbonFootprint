const calcFunctionsFactory = require('./calcFunctionsFactory');

// calcFunctionsFactory(data, CO2EmissionFactor, CH4EmissionFactor, N2OEmissionFactor, changeUnits, NCV, PropanFactor)
exports.electricity = function (data) {
  return calcFunctionsFactory(data, 0.00036758, 0, 0, 1, 1, 1);
};

exports.stationary = function (data) {
  return calcFunctionsFactory(
    data,
    63100,
    5,
    0.1,
    1 / 1000,
    47.3 * (1 / 1000000),
    1.9
  );
};

// calcFunctionsFactory(data, CO2EmissionFactor, CH4EmissionFactor, N2OEmissionFactor, changeUnits, NCV, PropanFactor)
exports.stationaryDiesel = function (data) {
  return calcFunctionsFactory(
    data,
    74100,
    3,
    0.6,
    1 / 1000,
    847.31 * (1 / 1000000),
    43
  );
};

// calcFunctionsFactory(data, CO2EmissionFactor, CH4EmissionFactor, N2OEmissionFactor, changeUnits, NCV, PropanFactor)
exports.mobileDiesel = function (data) {
  return calcFunctionsFactory(
    data,
    74100,
    10,
    0.6,
    1 / 1000,
    847.31 * (1 / 1000000),
    43
  );
};

// calcFunctionsFactory(data, CO2EmissionFactor, CH4EmissionFactor, N2OEmissionFactor, changeUnits, NCV, PropanFactor)
exports.mobileGasoline = function (data) {
  return calcFunctionsFactory(
    data,
    69300,
    10,
    0.6,
    1 / 1000,
    847.31 * (1 / 1000000),
    43
  );
};

// calcFunctionsFactory(data, CO2EmissionFactor, CH4EmissionFactor, N2OEmissionFactor, changeUnits, NCV, PropanFactor)
exports.ACs = function (data) {
  // REVIEW IT.....
  return calcFunctionsFactory(data, 0, 0, 0, 1, 1, 1);
};

// calcFunctionsFactory(data, CO2EmissionFactor, CH4EmissionFactor, N2OEmissionFactor, changeUnits, NCV, PropanFactor)
exports.fertilizerUrea = function (data) {
  return calcFunctionsFactory(data, 0.2, 0, 0, 11 / 3, 1, 1);
};

// calcFunctionsFactory(data, CO2EmissionFactor, CH4EmissionFactor, N2OEmissionFactor, changeUnits, NCV, PropanFactor)
exports.fertilizerNitrate = function (data) {
  return calcFunctionsFactory(data, 0.33, 0, 0, 11 / 7, 2.65, 0.01); // Here its NOT contain NCS, but we have to converte the result from the gas emmited to CO2e, so we have used (2.65).
};

// calcFunctionsFactory(data, CO2EmissionFactor, CH4EmissionFactor, N2OEmissionFactor, changeUnits, NCV, PropanFactor)
exports.water = function (data) {
  return calcFunctionsFactory(data, 0.55, 0, 0, 1000000000, 1, 1);
};

// calcFunctionsFactory(data, CO2EmissionFactor, CH4EmissionFactor, N2OEmissionFactor, changeUnits, NCV, PropanFactor)
exports.incinerationWaste = function (data) {
  return calcFunctionsFactory(data, 2.77, 0, 0, 1, 1, 1);
};

// calcFunctionsFactory(data, CO2EmissionFactor, CH4EmissionFactor, N2OEmissionFactor, changeUnits, NCV, PropanFactor)
exports.underGroungWaste = function (data) {
  return calcFunctionsFactory(data, 0.25, 0, 0, 1, 1, 1);
};
