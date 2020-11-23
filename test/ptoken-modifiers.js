
const { BN, expectRevert, time } = require('openzeppelin-test-helpers');
const { expect } = require('chai');
const { utils } = web3;

const Dai = artifacts.require('MockDAI');
const PToken = artifacts.require('PToken');
const LendingPool = artifacts.require('LendingPool');
const LendingPoolAddressesProvider = artifacts.require('LendingPoolAddressesProvider');
const LendingPoolCore = artifacts.require("LendingPoolCore")
const LendingPoolConfigurator = artifacts.require("LendingPoolConfigurator");
const LendingPoolDataProvider = artifacts.require("LendingPoolDataProvider");
const LendingRateOracle = artifacts.require("LendingRateOracle");
const FeeProvider = artifacts.require("FeeProvider");
const ChainlinkProxyPriceProvider = artifacts.require("ChainlinkProxyPriceProvider");


contract("PToken: Modifiers", async ([deployer, ...users]) => {

  let _PDai, _Dai, addressesProviderInstance ;

  before("Initializing test variables", async () => {
    // init lending addresses provider
    addressesProviderInstance = await LendingPoolAddressesProvider.new({from: deployer});
    //init lending pool - sets proxy contract
    let lp = await LendingPool.new();
    await addressesProviderInstance.setLendingPoolImpl(lp.address, {from: deployer});
    await addressesProviderInstance.getLendingPool();
    //init core - sets proxy contract
    let lc = await LendingPoolCore.new();
    await addressesProviderInstance.setLendingPoolCoreImpl(lc.address, {from: deployer});
    await addressesProviderInstance.getLendingPoolCore();
    //init data provider - sets proxy contract
    let dp = await LendingPoolDataProvider.new();
    await addressesProviderInstance.setLendingPoolDataProviderImpl(dp.address, {from: deployer});
    await addressesProviderInstance.getLendingPoolDataProvider();
    //init erc20 Dai
    _Dai = await Dai.new({from: deployer});
    //init PDai
    let daiName = await _Dai.name();
    let daiSymbol = await _Dai.symbol();
    let daiDecimals = await _Dai.decimals();
    //console.log(Number(daiDecimals.toString()), 'dai decimals');
    //console.log(daiName, 'dai name');
    //console.log(daiSymbol, 'dai symbol');
    _PDai = await PToken.new(addressesProviderInstance.address, _Dai.address, Number(daiDecimals.toString()), daiName, daiSymbol, {from: deployer});
  })

  it("Tries to invoke mintOnDeposit", async () => {
    await expectRevert(
      _PDai.mintOnDeposit(deployer, "1"),
      "The caller of this function must be a lending pool",
    )
  })

  it("Tries to invoke burnOnLiquidation", async () => {
    await expectRevert(
      _PDai.burnOnLiquidation(deployer, "1"),
      "The caller of this function must be a lending pool",
    )
  })

  it("Tries to invoke transferOnLiquidation", async () => {
    await expectRevert(
      _PDai.transferOnLiquidation(deployer, users[1], "1"),
      "The caller of this function must be a lending pool",
    )
  })
})
