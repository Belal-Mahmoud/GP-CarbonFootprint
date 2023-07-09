module.exports = function (
  data,
  CO2EmissionFactor,
  CH4EmissionFactor,
  N2OEmissionFactor,
  changeUnits,
  NCV,
  PropanFactor
) {
  let sum = 0,
    results = [];

  data.forEach((el) => {
    let CO2 = el * CO2EmissionFactor * changeUnits * NCV * PropanFactor,
      CH4 = el * CH4EmissionFactor * changeUnits * NCV * PropanFactor,
      N2O = el * N2OEmissionFactor * changeUnits * NCV * PropanFactor,
      CO2Equivalent = CO2 + CH4 * 28 + N2O * 265;

    results.push(CO2Equivalent);
    sum += CO2Equivalent;
  });

  return { results, sum };
};
