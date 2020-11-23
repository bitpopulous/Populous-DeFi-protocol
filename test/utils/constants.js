const BigNumber = require('bignumber.js');
const {currencyUnitsToDecimals} = require("./calculationHelpers");
const {eContractid } = require("./types");


const ADDRESS_0x0 = "0x0000000000000000000000000000000000000000";
const ONE_ADDRESS = "0x0000000000000000000000000000000000000001";
const populousPropositionPowerName = "Aave Proposition Power";
const populousPropositionPowerSymbol = "APP";
const populousPropositionPowerDecimals = 18;
const initialPropositionPowerForDeployer = currencyUnitsToDecimals(
  new BigNumber(2),
  18
); // 2 XAAVE in wei
const initialAVotingAssetToVoter1 = currencyUnitsToDecimals(
  new BigNumber(10),
  18
); // 10 VOTA in wei
const initialAVotingAssetToVoter2 = currencyUnitsToDecimals(
  new BigNumber(6),
  18
); // 6 VOTA in wei
const testVotingAssetAName = "Test Voting Asset A";
const testVotingAssetASymbol = "VOTA";
const testVotingAssetADecimals = 18;

const testVotingAssetBName = "Test Voting Asset B";
const testVotingAssetBSymbol = "VOTB";
const testVotingAssetBDecimals = 18;

const testAssetWeights = {
  [eContractid.TestVotingAssetA]: 100,
  [eContractid.TestVotingAssetB]: 50
};


const ONE_ETHER = new BigNumber(10).pow(18);

const MOCK_IPFS_HASH = "QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o";

const thresholdDev = new BigNumber(
  currencyUnitsToDecimals(new BigNumber(5500000), 18)
)
  .multipliedBy(100)
  .toFixed(); // 5 500 000 * 100, simulating a LEND situation where 5 500 000 LEND are needed as threshold, and LEND has 100 weight

// Test address we want to register in the test LendingPoolAddressesProvider as LendingPool address once a proposal is resolved
const testPayloadProposalAddress =
  "0x3d83f9b51989C6eE72dD16A42ad8660b9CFBb09b";


const devVotingBlocksDuration = 1660;
const devValidatingBlocksDuration = 1660;
const devMaxMovesToVotingAllowed = 3;

const ropstenLENDTokenAddress =
  "0xB47F338EC1e3857BB188E63569aeBAB036EE67c6";
const ropstenLENDTokenAssetWeight = 1;

const ropstenALENDTokenAddress =
  "0xa56c4b678565C9F1Fd35178F94f8CeE043538247";
const ropstenALENDTokenAssetWeight = 1;

const kovanLendVoteStrategyToken = "0x8aca987620760408f116915a0138cbc8981fe32f"
const kovanLendVoteStrategyTokenWeight = 1

const mainLendVoteStrategyToken = "0x0671ca7e039af2cf2d2c5e7f1aa261ae78b3ffdf"
const mainLendVoteStrategyTokenWeight = 1




module.exports = {  ADDRESS_0x0, ONE_ADDRESS, populousPropositionPowerName, populousPropositionPowerSymbol, populousPropositionPowerName, initialAVotingAssetToVoter1, initialAVotingAssetToVoter2,
  testVotingAssetADecimals, testVotingAssetAName, testVotingAssetASymbol, testVotingAssetBDecimals, testVotingAssetBName, testVotingAssetBSymbol,
  testAssetWeights, ONE_ETHER, MOCK_IPFS_HASH, thresholdDev, testPayloadProposalAddress, devValidatingBlocksDuration,
devVotingBlocksDuration, devMaxMovesToVotingAllowed};