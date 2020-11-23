const BigNumber = require('bignumber.js');


async function currencyUnitsToDecimals(
  value,
  decimals
) {
  return new BigNumber(value).multipliedBy(new BigNumber(10).pow(decimals)).toFixed();
}

async function decimalsToCurrencyUnits (
  value,
  decimals
) {
  return new BigNumber(value).div(new BigNumber(10).pow(decimals)).toFixed();
}

module.exports = {currencyUnitsToDecimals, decimalsToCurrencyUnits};