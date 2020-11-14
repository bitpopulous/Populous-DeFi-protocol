//import {convertToCurrencyDecimals} from '../../utils/misc-utils';
/* import {
  LendingPoolInstance,
  LendingPoolCoreInstance,
  PTokenContract,
  PTokenInstance,
  ERC20Instance,
  ERC20DetailedInstance,
  MintableERC20Instance,
} from '../../utils/typechain-types/truffle-contracts'; */

const lendingPoolInstance = artifacts.require('LendingPool');
 // const LendingPoolAddressesProviderInstance = artifacts.require('LendingPoolAddressesProvider');
  const lendingPoolCoreInstance = artifacts.require("LendingPoolCore")
  //const LendingPoolConfiguratorInstance = artifacts.require("LendingPoolConfigurator");
  const PTokenInstance = artifacts.require("PToken");
  const ERC20Instance = artifacts.require("ERC20");
  //const ERC20DetailedInstance = artifacts.require("ERC20DetailedInstance");
  //const MintableERC20Instance = artifacts.require("MintableERC20Instance");

  //const LendingPoolDataProviderInstance = artifacts.require("LendingPoolDataProvider");
  //const LendingRateOracleInstance = artifacts.require("LendingRateOracle");
  //const FeeProviderInstance = artifacts.require("FeeProvider");
  //const ChainlinkProxyPriceProviderInstance = artifacts.require("ChainlinkProxyPriceProvider");


const { BN, expectRevert, time } = require('openzeppelin-test-helpers');

//const {getTruffleContractInstance} = require("../../utils/truffle/truffle-core-utils");
//const {ContractId} = require('../../utils/types');

const {
  calcExpectedReserveDataAfterDeposit,
  calcExpectedReserveDataAfterRedeem,
  calcExpectedUserDataAfterDeposit,
  calcExpectedUserDataAfterRedeem,
  calcExpectedReserveDataAfterBorrow,
  calcExpectedUserDataAfterBorrow,
  calcExpectedReserveDataAfterRepay,
  calcExpectedUserDataAfterRepay,
  calcExpectedUserDataAfterSetUseAsCollateral,
  calcExpectedUserDataAfterSwapRateMode,
  calcExpectedReserveDataAfterSwapRateMode,
  calcExpectedReserveDataAfterStableRateRebalance,
  calcExpectedUserDataAfterStableRateRebalance,
  calcExpectedUsersDataAfterRedirectInterest,
} = require('../utils/calculations');
const {getReserveAddressFromSymbol, getReserveData, getUserData} = require('../utils/helpers');
const {UserReserveData, ReserveData} = require('../utils/interfaces');
const {ONE_YEAR, MAX_UINT_AMOUNT, NIL_ADDRESS} = require('../../utils/constants');
const {TransactionObject} = require('web3/eth/types');

//const {time, expectRevert} = require('@openzeppelin/test-helpers');

const truffleAssert = require('truffle-assertions');

const chai = require('chai');

const {expect} = chai;

const almostEqualOrEqual = function(
  thi,
  expected,
  actual
) {
  const keys = Object.keys(actual);

  keys.forEach(key => {
    if (
      key === 'lastUpdateTimestamp' ||
      key === 'marketStableRate' ||
      key === 'symbol' ||
      key === 'PTokenAddress' ||
      key === 'initialPTokenExchangeRate' ||
      key === 'decimals'
    ) {
      //skipping consistency check on accessory data
      return;
    }

    this.assert(actual[key] != undefined, `Property ${key} is undefined in the actual data`);
    expect(expected[key] != undefined, `Property ${key} is undefined in the expected data`);

    if (actual[key] instanceof BigNumber) {
      const actualValue = (actual[key]).decimalPlaces(0, BigNumber.ROUND_DOWN);
      const expectedValue = (expected[key]).decimalPlaces(0, BigNumber.ROUND_DOWN);

      this.assert(
        actualValue.eq(expectedValue) ||
          actualValue.plus(1).eq(expectedValue) ||
          actualValue.eq(expectedValue.plus(1)) ||
          actualValue.plus(2).eq(expectedValue) ||
          actualValue.eq(expectedValue.plus(2)),
        `expected #{act} to be almost equal or equal #{exp} for property ${key}`,
        `expected #{act} to be almost equal or equal #{exp} for property ${key}`,
        expectedValue.toFixed(0),
        actualValue.toFixed(0)
      );
    } else {
      this.assert(
        actual[key] !== null &&
          expected[key] !== null &&
          actual[key].toString() === expected[key].toString(),
        `expected #{act} to be equal #{exp} for property ${key}`,
        `expected #{act} to be equal #{exp} for property ${key}`,
        expected[key],
        actual[key]
      );
    }
  });
};

/* chai.use(function(chai, utils) {
  chai.Assertion.overwriteMethod('almostEqualOrEqual', function(original) {
    return function(this, expected) {
      const actual = (expected)
        ? this._obj
        : this._obj;

      almostEqualOrEqual.apply(this, [expected, actual]);
    };
  });
}); */

/* interface ActionsConfig {
  lendingPoolInstance: LendingPoolInstance;
  lendingPoolCoreInstance: LendingPoolCoreInstance;
  ethereumAddress;
  artifacts: Truffle.Artifacts;
  web3: Web3;
  skipIntegrityCheck: boolean;
}

const configuration: ActionsConfig = <ActionsConfig>{}; */

const mint = async (reserveSymbol, amount, user) => {
  const {ethereumAddress, artifacts} = configuration;

  const reserve = await getReserveAddressFromSymbol(reserveSymbol, artifacts);

  if (ethereumAddress === reserve.toLowerCase()) {
    throw 'Cannot mint ethereum. Mint action is most likely not needed in this story';
  }

  /* const tokenInstance = await getTruffleContractInstance(
    artifacts,
    ContractId.MintableERC20,
    reserve
  ); */

  const tokensToMint =  amount;

  const txOptions = {
    from: user,
  };
  await tokenInstance.mint(tokensToMint, txOptions);
};

const approve = async (reserveSymbol, user) => {
  const {ethereumAddress, artifacts} = configuration;

  const reserve = await getReserveAddressFromSymbol(reserveSymbol, artifacts);

  if (ethereumAddress === reserve) {
    throw 'Cannot mint ethereum. Mint action is most likely not needed in this story';
  }

  /* const tokenInstance = await getTruffleContractInstance(
    artifacts,
    ContractId.ERC20,
    reserve
  ); */

  const txOptions = {
    from: user,
  };
  await tokenInstance.approve(
    configuration.lendingPoolCoreInstance.address,
    '100000000000000000000000000000',
    txOptions
  );
};

const deposit = async (
  reserveSymbol,
  amount,
  user,
  sendValue,
  expectedResult,
  revertMessage
) => {
  const {ethereumAddress, lendingPoolInstance, artifacts} = configuration;

  const reserve = await getReserveAddressFromSymbol(reserveSymbol, artifacts);


  const amountToDeposit = await amount;

  const txOptions = {
    from: user,
  };

  const {reserveData: reserveDataBefore, userData: userDataBefore} = await getContractsData(
    reserve,
    user
  );

 
  if (ethereumAddress === reserve) {
    if (sendValue) {
      const valueToSend = await  sendValue;
      txOptions.value = valueToSend;
    } else {
      txOptions.value = amountToDeposit;
    }
  }
  if (expectedResult === 'success') {
    const txResult = await lendingPoolInstance.deposit(reserve, amountToDeposit, '0', txOptions);

    const {
      reserveData: reserveDataAfter,
      userData: userDataAfter,
      timestamp,
    } = await getContractsData(reserve, user);

    const {txCost, txTimestamp} = await getTxCostAndTimestamp(txResult);

    const expectedReserveData = calcExpectedReserveDataAfterDeposit(
      amountToDeposit,
      reserveDataBefore,
      txTimestamp
    );

    const expectedUserReserveData = calcExpectedUserDataAfterDeposit(
      amountToDeposit,
      reserveDataBefore,
      expectedReserveData,
      userDataBefore,
      txTimestamp,
      timestamp,
      txCost
    );

    expectEqual(reserveDataAfter, expectedReserveData);
    expectEqual(userDataAfter, expectedUserReserveData);

    truffleAssert.eventEmitted(txResult, 'Deposit', (ev) => {
      const {_reserve, _user, _amount} = ev;
      return (
        _reserve === reserve &&
        _user === user &&
        new BigNumber(_amount).isEqualTo(new BigNumber(amountToDeposit))
      );
    });
  } else if (expectedResult === 'revert') {
    await expectRevert(
      lendingPoolInstance.deposit(reserve, amountToDeposit, '0', txOptions),
      revertMessage
    );
  }
};

const redeem = async (
  reserveSymbol,
  amount,
  user,
  expectedResult,
  revertMessage
) => {

  const {
    PTokenInstance,
    reserve,
    txOptions,
    userData: userDataBefore,
    reserveData: reserveDataBefore,
  } = await getDataBeforeAction(reserveSymbol, user);

  let amountToRedeem = '0';

  if (amount !== '-1') {
    amountToRedeem = await amount;
  } else {
    amountToRedeem = MAX_UINT_AMOUNT;
  }  

  if (expectedResult === 'success') {
    const txResult = await PTokenInstance.redeem(amountToRedeem, txOptions);

    const {
      reserveData: reserveDataAfter,
      userData: userDataAfter,
      timestamp,
    } = await getContractsData(reserve, user);

    const {txCost, txTimestamp} = await getTxCostAndTimestamp(txResult);

    const expectedReserveData = calcExpectedReserveDataAfterRedeem(
      amountToRedeem,
      reserveDataBefore,
      userDataBefore,
      txTimestamp
    );

    const expectedUserData = calcExpectedUserDataAfterRedeem(
      amountToRedeem,
      reserveDataBefore,
      expectedReserveData,
      userDataBefore,
      txTimestamp,
      timestamp,
      txCost
    );

    const actualAmountRedeemed = userDataBefore.currentPTokenBalance.minus(
      expectedUserData.currentPTokenBalance
    );

    expectEqual(reserveDataAfter, expectedReserveData);
    expectEqual(userDataAfter, expectedUserData);

    truffleAssert.eventEmitted(txResult, 'Redeem', (ev) => {
      const {_from, _value} = ev;
      return _from === user && new BigNumber(_value).isEqualTo(actualAmountRedeemed);
    });
  } else if (expectedResult === 'revert') {
    await expectRevert(PTokenInstance.redeem(amountToRedeem, txOptions), revertMessage);
  }
};

const borrow = async (
  reserveSymbol,
  amount,
  interestRateMode,
  user,
  timeTravel,
  expectedResult,
  revertMessage
) => {
  const {lendingPoolInstance, artifacts} = configuration;

  const reserve = await getReserveAddressFromSymbol(reserveSymbol, artifacts);

  const {reserveData: reserveDataBefore, userData: userDataBefore} = await getContractsData(
    reserve,
    user
  );

  const amountToBorrow = await amount;

  const txOptions = {
    from: user,
  };

  if (expectedResult === 'success') {
    const txResult = await lendingPoolInstance.borrow(
      reserve,
      amountToBorrow,
      interestRateMode,
      '0',
      txOptions
    );

    const {txCost, txTimestamp} = await getTxCostAndTimestamp(txResult);

    if (timeTravel) {
      const secondsToTravel = new BigNumber(timeTravel)
        .multipliedBy(ONE_YEAR)
        .div(365)
        .toNumber();

      await time.increase(secondsToTravel);
    }

    const {
      reserveData: reserveDataAfter,
      userData: userDataAfter,
      timestamp,
    } = await getContractsData(reserve, user);

    const expectedReserveData = calcExpectedReserveDataAfterBorrow(
      amountToBorrow,
      interestRateMode,
      reserveDataBefore,
      userDataBefore,
      txTimestamp,
      timestamp
    );

    const expectedUserData = calcExpectedUserDataAfterBorrow(
      amountToBorrow,
      interestRateMode,
      reserveDataBefore,
      expectedReserveData,
      userDataBefore,
      txTimestamp,
      timestamp,
      txCost
    );
    expectEqual(reserveDataAfter, expectedReserveData);
    expectEqual(userDataAfter, expectedUserData);

    truffleAssert.eventEmitted(txResult, 'Borrow', (ev) => {
      const {_reserve, _user, _amount, _borrowRateMode, _borrowRate, _originationFee} = ev;
      return (
        _reserve.toLowerCase() === reserve.toLowerCase() &&
        _user.toLowerCase() === user.toLowerCase() &&
        new BigNumber(_amount).eq(amountToBorrow) &&
        new BigNumber(_borrowRateMode).eq(expectedUserData.borrowRateMode) &&
        new BigNumber(_borrowRate).eq(expectedUserData.borrowRate) &&
        new BigNumber(_originationFee).eq(
          expectedUserData.originationFee.minus(userDataBefore.originationFee)
        )
      );
    });
  } else if (expectedResult === 'revert') {
    await expectRevert(
      lendingPoolInstance.borrow(reserve, amountToBorrow, interestRateMode, '0', txOptions),
      revertMessage
    );
  }
};

const repay = async (
  reserveSymbol,
  amount,
  user,
  onBehalfOf,
  sendValue,
  expectedResult,
  revertMessage
) => {
  const {lendingPoolInstance, artifacts, ethereumAddress} = configuration;

  const reserve = await getReserveAddressFromSymbol(reserveSymbol, artifacts);

  const {reserveData: reserveDataBefore, userData: userDataBefore} = await getContractsData(
    reserve,
    onBehalfOf
  );

  let amountToRepay = '0';

  if (amount !== '-1') {
    amountToRepay = await  amount;
  } else {
    amountToRepay = MAX_UINT_AMOUNT;
  }

  const txOptions = {
    from: user,
  };

  if (ethereumAddress === reserve) {
    if (sendValue) {
      if (sendValue !== '-1') {
        const valueToSend = await sendValue;
        txOptions.value = valueToSend;
      } else {
        txOptions.value = userDataBefore.currentBorrowBalance
          .plus(await '0.1')
          .toFixed(0); //add 0.1 ETH to the repayment amount to cover for accrued interest during tx execution
      }
    } else {
      txOptions.value = amountToRepay;
    }
  }

  if (expectedResult === 'success') {
    const txResult = await lendingPoolInstance.repay(reserve, amountToRepay, onBehalfOf, txOptions);

    const {txCost, txTimestamp} = await getTxCostAndTimestamp(txResult);

    const {
      reserveData: reserveDataAfter,
      userData: userDataAfter,
      timestamp,
    } = await getContractsData(reserve, onBehalfOf);

    const expectedReserveData = calcExpectedReserveDataAfterRepay(
      amountToRepay,
      reserveDataBefore,
      userDataBefore,
      txTimestamp,
      timestamp
    );

    const expectedUserData = calcExpectedUserDataAfterRepay(
      amountToRepay,
      reserveDataBefore,
      expectedReserveData,
      userDataBefore,
      user,
      onBehalfOf,
      txTimestamp,
      timestamp,
      txCost
    );

    expectEqual(reserveDataAfter, expectedReserveData);
    expectEqual(userDataAfter, expectedUserData);

    truffleAssert.eventEmitted(txResult, 'Repay', (ev) => {
      const {_reserve, _user, _repayer} = ev;

      return (
        _reserve.toLowerCase() === reserve.toLowerCase() &&
        _user.toLowerCase() === onBehalfOf.toLowerCase() &&
        _repayer.toLowerCase() === user.toLowerCase()
      );
    });
  } else if (expectedResult === 'revert') {
    await expectRevert(
      lendingPoolInstance.repay(reserve, amountToRepay, onBehalfOf, txOptions),
      revertMessage
    );
  }
};

const setUseAsCollateral = async (
  reserveSymbol,
  user,
  useAsCollateral,
  expectedResult,
  revertMessage
) => {
  const {lendingPoolInstance, artifacts} = configuration;

  const reserve = await getReserveAddressFromSymbol(reserveSymbol, artifacts);

  const {reserveData: reserveDataBefore, userData: userDataBefore} = await getContractsData(
    reserve,
    user
  );

  const txOptions = {
    from: user,
  };

  const useAsCollateralBool = useAsCollateral.toLowerCase() === 'true';

  if (expectedResult === 'success') {
    const txResult = await lendingPoolInstance.setUserUseReserveAsCollateral(
      reserve,
      useAsCollateralBool,
      txOptions
    );

    const {txCost} = await getTxCostAndTimestamp(txResult);

    const {userData: userDataAfter} = await getContractsData(reserve, user);

    const expectedUserData = calcExpectedUserDataAfterSetUseAsCollateral(
      useAsCollateral.toLocaleLowerCase() === 'true',
      reserveDataBefore,
      userDataBefore,
      txCost
    );

    expectEqual(userDataAfter, expectedUserData);
    if (useAsCollateralBool) {
      truffleAssert.eventEmitted(txResult, 'ReserveUsedAsCollateralEnabled', (ev) => {
        const {_reserve, _user} = ev;
        return _reserve === reserve && _user === user;
      });
    } else {
      truffleAssert.eventEmitted(txResult, 'ReserveUsedAsCollateralDisabled', (ev) => {
        const {_reserve, _user} = ev;
        return _reserve === reserve && _user === user;
      });
    }
  } else if (expectedResult === 'revert') {
    await expectRevert(
      lendingPoolInstance.setUserUseReserveAsCollateral(reserve, useAsCollateralBool, txOptions),
      revertMessage
    );
  }
};

const swapBorrowRateMode = async (
  reserveSymbol,
  user,
  expectedResult,
  revertMessage
) => {
  const {lendingPoolInstance, artifacts} = configuration;

  const reserve = await getReserveAddressFromSymbol(reserveSymbol, artifacts);

  const {reserveData: reserveDataBefore, userData: userDataBefore} = await getContractsData(
    reserve,
    user
  );

  const txOptions = {
    from: user,
  };

  if (expectedResult === 'success') {
    const txResult = await lendingPoolInstance.swapBorrowRateMode(reserve, txOptions);

    const {txCost, txTimestamp} = await getTxCostAndTimestamp(txResult);

    const {reserveData: reserveDataAfter, userData: userDataAfter} = await getContractsData(
      reserve,
      user
    );

    const expectedReserveData = calcExpectedReserveDataAfterSwapRateMode(
      reserveDataBefore,
      userDataBefore,
      txTimestamp
    );

    const expectedUserData = calcExpectedUserDataAfterSwapRateMode(
      reserveDataBefore,
      expectedReserveData,
      userDataBefore,
      txCost,
      txTimestamp
    );

    expectEqual(reserveDataAfter, expectedReserveData);
    expectEqual(userDataAfter, expectedUserData);

    truffleAssert.eventEmitted(txResult, 'Swap', (ev) => {
      const {_user, _reserve, _newRateMode, _newRate} = ev;
      return (
        _user === user &&
        _reserve == reserve &&
        new BigNumber(_newRateMode).eq(expectedUserData.borrowRateMode) &&
        new BigNumber(_newRate).eq(expectedUserData.borrowRate)
      );
    });
  } else if (expectedResult === 'revert') {
    await expectRevert(lendingPoolInstance.swapBorrowRateMode(reserve, txOptions), revertMessage);
  }
};

const rebalanceStableBorrowRate = async (
  reserveSymbol,
  user,
  target,
  expectedResult,
  revertMessage
) => {
  const {lendingPoolInstance, artifacts} = configuration;

  const reserve = await getReserveAddressFromSymbol(reserveSymbol, artifacts);

  const {reserveData: reserveDataBefore, userData: userDataBefore} = await getContractsData(
    reserve,
    target
  );

  const txOptions = {
    from: user,
  };

  if (expectedResult === 'success') {
    const txResult = await lendingPoolInstance.rebalanceStableBorrowRate(
      reserve,
      target,
      txOptions
    );

    const {txCost, txTimestamp} = await getTxCostAndTimestamp(txResult);

    const {reserveData: reserveDataAfter, userData: userDataAfter} = await getContractsData(
      reserve,
      target
    );

    const expectedReserveData = calcExpectedReserveDataAfterStableRateRebalance(
      reserveDataBefore,
      userDataBefore,
      txTimestamp
    );

    const expectedUserData = calcExpectedUserDataAfterStableRateRebalance(
      reserveDataBefore,
      expectedReserveData,
      userDataBefore,
      txCost,
      txTimestamp
    );

    expectEqual(reserveDataAfter, expectedReserveData);
    expectEqual(userDataAfter, expectedUserData);

    truffleAssert.eventEmitted(txResult, 'RebalanceStableBorrowRate', (ev) => {
      const {_user, _reserve, _newStableRate} = ev;
      return (
        _user.toLowerCase() === target.toLowerCase() &&
        _reserve.toLowerCase() === reserve.toLowerCase() &&
        new BigNumber(_newStableRate).eq(expectedUserData.borrowRate)
      );
    });
  } else if (expectedResult === 'revert') {
    await expectRevert(
      lendingPoolInstance.rebalanceStableBorrowRate(reserve, target, txOptions),
      revertMessage
    );
  }
};

const redirectInterestStream = async (
  reserveSymbol,
  user,
  to,
  expectedResult,
  revertMessage
) => {
  const {
    PTokenInstance,
    reserve,
    txOptions,
    userData: fromDataBefore,
    reserveData: reserveDataBefore,
  } = await getDataBeforeAction(reserveSymbol, user);

  const {userData: toDataBefore} = await getContractsData(reserve, to);

  if (expectedResult === 'success') {
    const txResult = await PTokenInstance.redirectInterestStream(to, txOptions);

    const {txCost, txTimestamp} = await getTxCostAndTimestamp(txResult);

    const {userData: fromDataAfter} = await getContractsData(reserve, user);

    const {userData: toDataAfter} = await getContractsData(reserve, to);

    const [expectedFromData, expectedToData] = calcExpectedUsersDataAfterRedirectInterest(
      reserveDataBefore,
      fromDataBefore,
      toDataBefore,
      user,
      to,
      true,
      txCost,
      txTimestamp
    );
 
    expectEqual(fromDataAfter, expectedFromData);
    expectEqual(toDataAfter, expectedToData);

    truffleAssert.eventEmitted(txResult, 'InterestStreamRedirected', (ev) => {
      const {_from, _to} = ev;
      return _from === user 
      && _to === (to === user ? NIL_ADDRESS : to);
    });
  } else if (expectedResult === 'revert') {
    await expectRevert(PTokenInstance.redirectInterestStream(to, txOptions), revertMessage);
  }
};



const redirectInterestStreamOf = async (
  reserveSymbol,
  user,
  from,
  to,
  expectedResult,
  revertMessage
) => {
  const {
    PTokenInstance,
    reserve,
    txOptions,
    userData: fromDataBefore,
    reserveData: reserveDataBefore,
  } = await getDataBeforeAction(reserveSymbol, from);

  const {userData: toDataBefore} = await getContractsData(reserve, user);

  if (expectedResult === 'success') {
    const txResult = await PTokenInstance.redirectInterestStreamOf(from, to, txOptions);

    const {txCost, txTimestamp} = await getTxCostAndTimestamp(txResult);

    const {userData: fromDataAfter} = await getContractsData(reserve, from);

    const {userData: toDataAfter} = await getContractsData(reserve, to);

    const [expectedFromData, exptectedToData] = calcExpectedUsersDataAfterRedirectInterest(
      reserveDataBefore,
      fromDataBefore,
      toDataBefore,
      from,
      to,
      from === user,
      txCost,
      txTimestamp
    );

    expectEqual(fromDataAfter, expectedFromData);
    expectEqual(toDataAfter, exptectedToData);

    truffleAssert.eventEmitted(txResult, 'InterestStreamRedirected', (ev) => {
      const {_from, _to} = ev;
      return _from.toLowerCase() === from.toLowerCase() && _to.toLowerCase() === to.toLowerCase();
    });
  } else if (expectedResult === 'revert') {
    await expectRevert(PTokenInstance.redirectInterestStreamOf(from, to, txOptions), revertMessage);
  }
};

const allowInterestRedirectionTo = async (
  reserveSymbol,
  user,
  to,
  expectedResult,
  revertMessage
) => {
  const {PTokenInstance, txOptions} = await getDataBeforeAction(reserveSymbol, user);

  if (expectedResult === 'success') {
    const txResult = await PTokenInstance.allowInterestRedirectionTo(to, txOptions);

    truffleAssert.eventEmitted(txResult, 'InterestRedirectionAllowanceChanged', (ev) => {
      const {_from, _to} = ev;
      return _from.toLowerCase() === user.toLowerCase() && _to.toLowerCase() === to.toLowerCase();
    });
  } else if (expectedResult === 'revert') {
    await expectRevert(PTokenInstance.allowInterestRedirectionTo(to, txOptions), revertMessage);
  }
};

const expectEqual = (
  actual,
  expected
) => {
  if (!configuration.skipIntegrityCheck) {
    expect(actual).to.be.almostEqualOrEqual(expected);
  }
};

/* interface ActionData {
  reserve;
  reserveData: ReserveData;
  userData: UserReserveData;
  PTokenInstance: PTokenInstance;
  txOptions;
} */

const getDataBeforeAction = async (reserveSymbol, user) => {
  const {artifacts} = configuration;

  const reserve = await getReserveAddressFromSymbol(reserveSymbol, artifacts);

  const {reserveData, userData} = await getContractsData(reserve, user);

  const {PTokenAddress} = reserveData;

  /* const PTokenInstance = await getTruffleContractInstance(
    artifacts,
    ContractId.PToken,
    PTokenAddress
  ); */

  const txOptions = {
    from: user,
  };

  return {
    reserve,
    reserveData,
    userData,
    PTokenInstance,
    txOptions,
  };
};



const getTxCostAndTimestamp = async (tx) => {
  const txTimestamp = new BigNumber((await web3.eth.getBlock(tx.receipt.blockNumber)).timestamp);

  const txCost = new BigNumber(tx.receipt.gasUsed).multipliedBy(1000000000);

  return {txCost, txTimestamp};
};

const getContractsData = async (reserve, user) => {
  const [reserveData, userData, timestamp] = await Promise.all([
    getReserveData(configuration.lendingPoolInstance, reserve, artifacts),
    getUserData(
      configuration.lendingPoolInstance,
      configuration.lendingPoolCoreInstance,
      reserve,
      user,
      artifacts
    ),
    time.latest(),
  ]);

  return {
    reserveData,
    userData,
    timestamp,
  };
};


module.exports = { mint, getContractsData,  getTxCostAndTimestamp, approve,
                  deposit, redeem, borrow, repay, setUseAsCollateral,
                  swapBorrowRateMode, rebalanceStableBorrowRate, redirectInterestStream,
                  redirectInterestStreamOf, allowInterestRedirectionTo, getDataBeforeAction,
                  };