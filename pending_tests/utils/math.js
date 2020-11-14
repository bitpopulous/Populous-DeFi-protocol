const {RAY, WAD, HALF_RAY, HALF_WAD, WAD_RAY_RATIO} = require("../../utils/constants")
const {BigNumber} = require("bignumber.js")


/* declare module "bignumber.js" {
  interface BigNumber {
    ray: () => BigNumber
    wad: () => BigNumber
    halfRay: () => BigNumber
    halfWad: () => BigNumber
    wadMul: (a: BigNumber) => BigNumber
    wadDiv: (a: BigNumber) => BigNumber
    rayMul: (a: BigNumber) => BigNumber
    rayDiv: (a: BigNumber) => BigNumber
    rayToWad: () => BigNumber
    wadToRay: () => BigNumber
    rayPow: (n: BigNumber) => BigNumber
  }
} */

BigNumber.prototype.ray = () => {
  return new BigNumber(RAY).decimalPlaces(0)
}
BigNumber.prototype.wad = () => {
  return new BigNumber(WAD).decimalPlaces(0)
}

BigNumber.prototype.halfRay = () => {
  return new BigNumber(HALF_RAY).decimalPlaces(0, BigNumber.ROUND_DOWN)
}

BigNumber.prototype.halfWad = () => {
  return new BigNumber(HALF_WAD).decimalPlaces(0, BigNumber.ROUND_DOWN)
}

BigNumber.prototype.wadMul = function(b) {
  return this.halfWad().plus(this.multipliedBy(b)).div(WAD).decimalPlaces(0,BigNumber.ROUND_DOWN)
}

BigNumber.prototype.wadDiv = function(a)  {
  const halfA = a.div(2).decimalPlaces(0,BigNumber.ROUND_DOWN)

  return halfA.plus(this.multipliedBy(WAD)).div(a).decimalPlaces(0, BigNumber.ROUND_DOWN)
}

BigNumber.prototype.rayMul = function(a) {
  return this.halfRay().plus(this.multipliedBy(a)).div(RAY).decimalPlaces(0, BigNumber.ROUND_DOWN)
}

BigNumber.prototype.rayDiv = function(a) {
  const halfA = a.div(2).decimalPlaces(0,BigNumber.ROUND_DOWN)

  return halfA.plus(this.multipliedBy(RAY)).decimalPlaces(0,BigNumber.ROUND_DOWN).div(a).decimalPlaces(0,BigNumber.ROUND_DOWN)
}

BigNumber.prototype.rayToWad = function(){
  const halfRatio = new BigNumber(WAD_RAY_RATIO).div(2);

  return halfRatio.plus(this).div(WAD_RAY_RATIO).decimalPlaces(0, BigNumber.ROUND_DOWN)
}

BigNumber.prototype.wadToRay = function() {
  return this.multipliedBy(WAD_RAY_RATIO).decimalPlaces(0, BigNumber.ROUND_DOWN)
}


BigNumber.prototype.rayPow = function(n) {

    let z = !n.modulo(2).eq(0) ? this : new BigNumber(RAY);
    let x = new BigNumber(this)
    
    for (n = n.div(2); !n.eq(0); n = n.div(2)) {
        x = x.rayMul(x);

        if (!n.modulo(2).eq(0)) {
            z = z.rayMul(x);
        }
    }
    return z;
  }