import {
  ERC20DetailedInstance,
  LendingPoolInstance,
  LendingRateOracleInstance,
  PTokenInstance,
  LendingPoolCoreInstance,
} from '../../utils/typechain-types/truffle-contracts';
import {getTruffleContractInstance} from '../../utils/truffle/truffle-core-utils';
import {ContractId} from '../../utils/types';
import {ReserveData, UserReserveData} from './interfaces';
import BigNumber from 'bignumber.js';
import {configuration} from '../actions';
import {NIL_ADDRESS, ETHEREUM_ADDRESS} from '../../utils/constants';

export const getReserveData = async (
  poolInstance,
  reserve,
  artifacts
) => {
  const data = await poolInstance.getReserveData(reserve);
  const rateOracle = await getTruffleContractInstance(
    artifacts,
    ContractId.LendingRateOracle
  );

  const rate = await rateOracle.getMarketBorrowRate(reserve);

  const isEthReserve = reserve === ETHEREUM_ADDRESS;
  let symbol = 'ETH';
  let decimals = new BigNumber(18);
  if (!isEthReserve) {
    const contractInstance = await getTruffleContractInstance(
      artifacts,
      ContractId.ERC20Detailed,
      reserve
    );
    symbol = await contractInstance.symbol();
    decimals = new BigNumber(await contractInstance.decimals());
  }

  return {
    totalLiquidity: new BigNumber(data.totalLiquidity),
    availableLiquidity: new BigNumber(data.availableLiquidity),
    totalBorrowsStable: new BigNumber(data.totalBorrowsStable),
    totalBorrowsVariable: new BigNumber(data.totalBorrowsVariable),
    liquidityRate: new BigNumber(data.liquidityRate),
    variableBorrowRate: new BigNumber(data.variableBorrowRate),
    stableBorrowRate: new BigNumber(data.stableBorrowRate),
    averageStableBorrowRate: new BigNumber(data.averageStableBorrowRate),
    utilizationRate: new BigNumber(data.utilizationRate),
    liquidityIndex: new BigNumber(data.liquidityIndex),
    variableBorrowIndex: new BigNumber(data.variableBorrowIndex),
    lastUpdateTimestamp: new BigNumber(data.lastUpdateTimestamp),
    address: reserve,
    PTokenAddress: data.PTokenAddress,
    symbol,
    decimals,
    marketStableRate: new BigNumber(rate),
  };
};

export const getUserData = async (
  poolInstance,
  coreInstance,
  reserve,
  user,
  artifacts
) => {
  const {web3} = configuration;

  const [data, PTokenData] = await Promise.all([
    poolInstance.getUserReserveData(reserve, user),
    getPTokenUserData(reserve, user, coreInstance),
  ]);

  const [
    userIndex,
    redirectedBalance,
    principalPTokenBalance,
    redirectionAddressRedirectedBalance,
    interestRedirectionAddress,
  ] = PTokenData;

  let walletBalance;

  if (reserve === ETHEREUM_ADDRESS) {
    walletBalance = new BigNumber(await web3.eth.getBalance(user));
  } else {
    const reserveInstance = await getTruffleContractInstance(
      artifacts,
      ContractId.ERC20Detailed,
      reserve
    );
    walletBalance = new BigNumber(await reserveInstance.balanceOf(user));
  }

  const userData = data
  
  return {
    principalPTokenBalance: new BigNumber(principalPTokenBalance),
    interestRedirectionAddress,
    redirectionAddressRedirectedBalance: new BigNumber(redirectionAddressRedirectedBalance),
    redirectedBalance: new BigNumber(redirectedBalance),
    currentPTokenUserIndex: new BigNumber(userIndex),
    currentPTokenBalance: new BigNumber(userData.currentPTokenBalance),
    currentBorrowBalance: new BigNumber(userData.currentBorrowBalance),
    principalBorrowBalance: new BigNumber(userData.principalBorrowBalance),
    borrowRateMode: userData.borrowRateMode.toString(),
    borrowRate: new BigNumber(userData.borrowRate),
    liquidityRate: new BigNumber(userData.liquidityRate),
    originationFee: new BigNumber(userData.originationFee),
    variableBorrowIndex: new BigNumber(userData.variableBorrowIndex),
    lastUpdateTimestamp: new BigNumber(userData.lastUpdateTimestamp),
    usageAsCollateralEnabled: userData.usageAsCollateralEnabled,
    walletBalance,
  };
};

export const getReserveAddressFromSymbol = async (symbol, artifacts) => {
  if (symbol.toUpperCase() === 'ETH') {
    return ETHEREUM_ADDRESS;
  }

  const contractName = 'Mock' + symbol.toUpperCase();

  const contractInstance = await getTruffleContractInstance(artifacts,contractName);

  if (!contractInstance) {
    throw `Could not find instance for contract ${contractName}`;
  }
  return contractInstance.address;
};

const getPTokenUserData = async (
  reserve,
  user,
  coreInstance
) => {
  const PTokenAddress = await coreInstance.getReservePTokenAddress(reserve);

  const PTokenInstance = await getTruffleContractInstance(
    artifacts,
    ContractId.PToken,
    PTokenAddress
  );
  const [
    userIndex,
    interestRedirectionAddress,
    redirectedBalance,
    principalTokenBalance,
  ] = await Promise.all([
    PTokenInstance.getUserIndex(user),
    PTokenInstance.getInterestRedirectionAddress(user),
    PTokenInstance.getRedirectedBalance(user),
    PTokenInstance.principalBalanceOf(user),
  ]);

  const redirectionAddressRedirectedBalance =
    interestRedirectionAddress !== NIL_ADDRESS
      ? new BigNumber(await PTokenInstance.getRedirectedBalance(interestRedirectionAddress))
      : new BigNumber('0');

  return [
    userIndex.toString(),
    redirectedBalance.toString(),
    principalTokenBalance.toString(),
    redirectionAddressRedirectedBalance.toString(),
    interestRedirectionAddress,
  ];
};
