const BigNumber = require("bignumber.js")

// Note: Extracted from: https://github.com/OpenZeppelin/openzeppelin-solidity/blob/8545c99fb106636c194da739bd0ede43a9595580/test/helpers/sign.js#L12
const fixSignature = signature => {
  // in geth its always 27/28, in ganache its 0/1. Change to 27/28 to prevent
  // signature malleability if version is 0/1
  // see https://github.com/ethereum/go-ethereum/blob/v1.8.23/internal/ethapi/api.go#L465
  let v = parseInt(signature.slice(130, 132), 16);
  if (v < 27) {
    v += 27;
  }
  const vHex = v.toString(16);
  return signature.slice(0, 130) + vHex;
};

const expectEvent = (tx, eventName, expectedArgs = {}) => {
  const { logs } = tx;
  const log = logs.find(l => l.event === eventName);
  // eslint-disable-next-line no-unused-expressions
  expect(log, `Event '${eventName}' not found`).to.be.ok;
  const { args } = log;
  expect(args).to.include(expectedArgs);
};

const sign = async (data, signerAddress) => {
  const signature = await web3.eth.sign(data, signerAddress);
  const fixedSignature = fixSignature(signature);
  return fixedSignature;
};

const writeObjectToFile = async (path, obj) =>
  await promises.writeFile(path, JSON.stringify(obj));

const bnToBigNumber = (amount) =>
  new BigNumber(amount);
const stringToBigNumber = (amount)=>
  new BigNumber(amount);


const range = (size) => Array.from(Array(size).keys());

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};

/* const getKovanCouncil = async () => [
  "0xD2CC1DDbb5dCd639BDE79438aae7C1ac41e1a446"
];

const getRopstenCouncil = async () => [
  "0x7DE38FdD3E36F960e5aa65E275856f865324c39d"
];

const getMainCouncil = async () => [
  "0xB9062896ec3A615a4e4444DF183F0531a77218AE",
  "0xf7692C7920c174Bdcc3387E8ec1FB2A6BD3ed906"
]; */

module.exports = { expectEvent, sign , writeObjectToFile, bnToBigNumber, stringToBigNumber, range, sleep};