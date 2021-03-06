

const { BN, expectRevert, time, constants } = require('openzeppelin-test-helpers');
const { expect } = require('chai');
const { utils } = web3;
const BigNumber = require('bignumber.js');

const DefaultReserveInterestRateStrategy = artifacts.require("DefaultReserveInterestRateStrategy");
const MintableERC20 = artifacts.require('MintableERC20');
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
const CoreLibrary = artifacts.require('CoreLibrary');
const LendingPoolParametersProvider = artifacts.require("LendingPoolParametersProvider");
const LendingPoolLiquidationManager = artifacts.require("LendingPoolLiquidationManager");
const TokenDistributor = artifacts.require("TokenDistributor");       

//const {convertToCurrencyDecimals} = require('../utils/misc-utils');
//const {APPROVAL_AMOUNT_LENDING_POOL_CORE, ETHEREUM_ADDRESS, oneEther, RATEMODE_STABLE, NIL_ADDRESS, MAX_UINT_AMOUNT} = require('../utils/constants');

let APPROVAL_AMOUNT_LENDING_POOL_CORE, ETHEREUM_ADDRESS, oneEther, RATEMODE_STABLE, NIL_ADDRESS, MAX_UINT_AMOUNT;

// convertToCurrencyDecimals
const convertToCurrencyDecimals = async (token_address, amount) => {
  let _token = await Dai.at(token_address);
  let pDecimals = await _token.decimals();
  //console.log(Number(pDecimals.toString()), 'dai decimals');
  
  let converted = new BigNumber(10**Number(pDecimals.toString()) * amount); 
  return converted;
};

contract('PToken: Transfer', async ([deployer, ...users]) => {

  
  let _PDai;
  let _DAI;
  let _lendingPoolInstance;
  let _lendingPoolCoreInstance;
  let addressesProviderInstance;
  let getAddress, getLCAddress, getDPAddress, dp;
  let lro, fp, getFPAddress, getLROAddress, getCLinkAddress,
  getlmAddress,   getLPCAddress,  lpc, getLPLAddress,
  _coreLibrary, pm, getPMAddress, getTKAddress, 
  _tokenDistributorInstance, _lendingPoolLiquidationManager,
  _DefaultReserveInterestRateStrategy, lendingPoolInstance, _poolConfigInstance,
  _Core, _PDai_Address;


  before('Initializing test variables', async () => {
    // init lending addresses provider
    addressesProviderInstance = await LendingPoolAddressesProvider.new({from: deployer});

    //init pool manager
    await addressesProviderInstance.setLendingPoolManager(deployer, {from: deployer});
    getlmAddress = await addressesProviderInstance.getLendingPoolManager();

    //init fee provider - sets proxy contract
    fp = await FeeProvider.new();
    await addressesProviderInstance.setFeeProviderImpl(fp.address, {from: deployer});
    getFPAddress = await addressesProviderInstance.getFeeProvider();

    //init parameter provider
    pm = await LendingPoolParametersProvider.new();
    await addressesProviderInstance.setLendingPoolParametersProviderImpl(pm.address, {from: deployer});
    getPMAddress = await addressesProviderInstance.getLendingPoolParametersProvider();

    //init lendingpoolcore with core library - sets proxy contract
    _coreLibrary = await CoreLibrary.new();
    await LendingPoolCore.link("CoreLibrary", _coreLibrary.address);
    _lendingPoolCoreInstance = await LendingPoolCore.new();
    await addressesProviderInstance.setLendingPoolCoreImpl(_lendingPoolCoreInstance.address, {from: deployer});
    getLCAddress = await addressesProviderInstance.getLendingPoolCore();
    /* To link contract to library within tests 
    const myLib = await MyLib.new();
    await MyContract.link("MyLib", myLib.address);
    const mycontract = await MyContract.new(); */

    //init pool configurator - sets proxy contract
    lpc = await LendingPoolConfigurator.new();
    await addressesProviderInstance.setLendingPoolConfiguratorImpl(lpc.address, {from: deployer});
    getLPCAddress = await addressesProviderInstance.getLendingPoolConfigurator();

    //init data provider - sets proxy contract
    dp = await LendingPoolDataProvider.new();
    await addressesProviderInstance.setLendingPoolDataProviderImpl(dp.address, {from: deployer});
    getDPAddress = await addressesProviderInstance.getLendingPoolDataProvider();

    //init lending pool - sets proxy contract
    _lendingPoolInstance = await LendingPool.new();
    await addressesProviderInstance.setLendingPoolImpl(_lendingPoolInstance.address, {from: deployer});
    getAddress = await addressesProviderInstance.getLendingPool();

    //init chain link proxy price provider - sets proxy contract
    clink = await ChainlinkProxyPriceProvider.new([], [], users[8]);
    await addressesProviderInstance.setPriceOracle(clink.address, {from: deployer});
    getCLinkAddress = await addressesProviderInstance.getPriceOracle();

    //init lending rate oracle - sets proxy contract
    lro = await LendingRateOracle.new();
    await addressesProviderInstance.setLendingRateOracle(lro.address, {from: deployer});
    getLROAddress = await addressesProviderInstance.getLendingRateOracle();

    // init lending pool liquidation manager
    _lendingPoolLiquidationManager = await LendingPoolLiquidationManager.new();
    await addressesProviderInstance.setLendingPoolLiquidationManager(_lendingPoolLiquidationManager.address, {from: deployer});
    getLPLAddress = await addressesProviderInstance.getLendingPoolLiquidationManager();

    //init token distributor
    _tokenDistributorInstance = await TokenDistributor.new();
    await addressesProviderInstance.setTokenDistributor(_tokenDistributorInstance.address, {from: deployer});
    getTKAddress = await addressesProviderInstance.getTokenDistributor();
    
    //init erc20 Dai
    _DAI = await Dai.new({from: deployer});
    //console.log(await convertToCurrencyDecimals(_DAI.address, 1000), '1000 in DAI');
    //init PDai
    let daiName = await _DAI.name();
    let daiSymbol = await _DAI.symbol();
    let daiDecimals = await _DAI.decimals();
    //console.log(Number(daiDecimals.toString()), 'dai decimals');
    //console.log(daiName, 'dai name');
    //console.log(daiSymbol, 'dai symbol');
    //_PDai = await PToken.new(addressesProviderInstance.address, _DAI.address, Number(daiDecimals.toString()), daiName, daiSymbol, {from: deployer});
    
    //init DefaultReserveInterestRateStrategy
    let reserve_address = _DAI.address;
    //uint256 base variable borrow rate when Utilization rate = 0. Expressed in ray
    let _baseVariableBorrowRate = "5";
    //uint256 slope of the variable interest curve when utilization rate > 0 and <= OPTIMAL_UTILIZATION_RATE. Expressed in ray
    let _variableRateSlope1 = "5";
    //uint256 slope of the variable interest curve when utilization rate > OPTIMAL_UTILIZATION_RATE. Expressed in ray
    let _variableRateSlope2 = "5";
    //uint256 slope of the stable interest curve when utilization rate > 0 and <= OPTIMAL_UTILIZATION_RATE. Expressed in ray
    let _stableRateSlope1 = "5";
    //uint256 slope of the stable interest curve when utilization rate > OPTIMAL_UTILIZATION_RATE. Expressed in ray
    let _stableRateSlope2 = "5";
    
    _DefaultReserveInterestRateStrategy = await DefaultReserveInterestRateStrategy.new(reserve_address, addressesProviderInstance.address,
      _baseVariableBorrowRate, _variableRateSlope1, _variableRateSlope2, _stableRateSlope1, _stableRateSlope2, {from: deployer});
    
    //initialise a DAI/PDAI reserve via lending pool configurator (only pool manager can call)
    //this  will create associated PToken and deposit and redeem should work after this
    // address _reserve,
    //uint8 _underlyingAssetDecimals,
    //address _interestRateStrategyAddress
    _poolConfigInstance = await LendingPoolConfigurator.at(getLPCAddress); // targeting proxy
    await _poolConfigInstance.initReserve(_DAI.address, Number(daiDecimals.toString()), _DefaultReserveInterestRateStrategy.address, {from: deployer});
    
    // refresh lending pool stored address in lending pool core - deposits and others will fail if this is not done
    // this must be done upon new deployment 
    // onlyLendingPoolManager can call refreshLendingPoolCoreConfiguration in LendingPoolConfigurator
    await _poolConfigInstance.refreshLendingPoolCoreConfiguration({from: deployer});

    // get DAI/PDAI reserve data
    lendingPoolInstance = await LendingPool.at(getAddress); // targeting proxy
    let reserveData = await lendingPoolInstance.getReserveData(_DAI.address);
    //console.log(reserveData, "DAI reserve data");
    
    _Core = await LendingPoolCore.at(getLCAddress);
    //console.log(await _Core.getReservePTokenAddress(_DAI.address), 'core address');
    _PDai_Address = await _Core.getReservePTokenAddress(_DAI.address);
  });

  it('User 0 deposits 500 DAI, transfers generated 500 PDAI to user 1', async () => {
    await _DAI.mint(await convertToCurrencyDecimals(_DAI.address, 500), {
    //await _DAI.mint("500000000000000000000" , {
      from: users[0],
    });
    const initialBalance = await _DAI.balanceOf(users[0]);
    //console.log(initialBalance.toString()); //500000000000000000000
    //console.log(new BigNumber(initialBalance).shiftedBy(-18).toNumber()); //500
    expect(Number(initialBalance.toString())).to.be.equal(500000000000000000000, "Invalid balance after mint")
    expect(new BigNumber(initialBalance).shiftedBy(-18).toNumber()).to.be.equal(500, "Invalid balance after mint")
    
    await _DAI.approve(getLCAddress, await convertToCurrencyDecimals(_DAI.address, 500), {
      from: users[0],
    });
    /* 
    _allowances is a private mapping variable
    const approval = await _DAI._allowances().call(users[0], getLCAddress);
    expect(approval.toNumber()).to.be.equal(1000, "Approval for lending core contract failed") 
    */

    //user 0 deposits 500 DAI
    const amountDAItoDeposit = await convertToCurrencyDecimals(_DAI.address, 500);

    //before deposit:
    //ensure that onlyLendingPool in core does not lead to errors - see deployment and config sequence above
    //nonReentrant modifier in lendingPool is buggy and leading to 
    //revert ReentrancyGuard: reentrant call -- Reason given: ReentrancyGuard: reentrant call.
    await lendingPoolInstance.deposit(_DAI.address, amountDAItoDeposit, '1', {
      from: users[0],
    });

    
    _PDai = await PToken.at(_PDai_Address);
    await _PDai.transfer(users[1], amountDAItoDeposit, {from: users[0]});
    
    const fromBalance = await _PDai.balanceOf(users[0]);
    const toBalance = await _PDai.balanceOf(users[1]);

    expect(Number(fromBalance.toString())).to.be.equal(0, "Invalid from balance after transfer");
    expect(Number(toBalance.toString())).to.be.equal(amountDAItoDeposit.toNumber(), "Invalid to balance after transfer");
    //expect(fromBalance.toString()).to.be.equal("0", "Invalid from balance after transfer");
    //expect(toBalance.toString()).to.be.equal(amountDAItoDeposit.toString(), "Invalid to balance after transfer");
  });


  it('User 1 redirects interest to user 2, transfers 250 PDAI back to user 0', async () => {

    _PDai = await PToken.at(_PDai_Address);

    await _PDai.redirectInterestStream(users[2], {from: users[1]});

    const PDaiRedirected = await convertToCurrencyDecimals(_DAI.address, 500);
    const PDaitoTransfer = await convertToCurrencyDecimals(_DAI.address, 250);

    const user2RedirectedBalanceBefore = await _PDai.getRedirectedBalance(users[2])
    expect(Number(user2RedirectedBalanceBefore.toString())).to.be.equal(PDaiRedirected.toNumber(), "Invalid redirected balance for user 2 before transfer")

    await _PDai.transfer(users[0], PDaitoTransfer, {from: users[1]})


    const user2RedirectedBalanceAfter = await _PDai.getRedirectedBalance(users[2])
    const user1RedirectionAddress = await _PDai.getInterestRedirectionAddress(users[1])

    expect(Number(user2RedirectedBalanceAfter.toString())).to.be.equal(PDaitoTransfer.toNumber(), "Invalid redirected balance for user 2 after transfer")
    expect(user1RedirectionAddress.toString()).to.be.equal(users[2], "Invalid redirection address for user 1")

  });

  it('User 0 transfers 250 PDAI back to user 1', async () => {


    const PDaitoTransfer = await convertToCurrencyDecimals(_DAI.address, 250);


    await _PDai.transfer(users[1], PDaitoTransfer, {from: users[0]})


    const user2RedirectedBalanceAfter = await _PDai.getRedirectedBalance(users[2])

    const user1BalanceAfter = await _PDai.balanceOf(users[1])

    expect(Number(user2RedirectedBalanceAfter.toString())).to.be.equal(Number(user1BalanceAfter.toString()), "Invalid redirected balance for user 2 after transfer");

  });

/*
   it('User 0 deposits 1 ETH and user tries to borrow, but the PTokens received as a transfer are not available as collateral (revert expected)', async () => {
    let ETHEREUM_ADDRESS = "0x0";
    await lendingPoolInstance.deposit(ETHEREUM_ADDRESS, web3.utils.toWei("1", "ether"), '0', {
      from: users[0],
      value: web3.utils.toWei("1", "ether")
      //value: oneEther.toFixed(0)
    });

 
    await expectRevert(lendingPoolInstance.borrow(ETHEREUM_ADDRESS, await convertToCurrencyDecimals(ETHEREUM_ADDRESS,"0.1"), RATEMODE_STABLE, "0", {from: users[1]}), "The collateral balance is 0")
  });


   it('User 1 sets the DAI as collateral and borrows, tries to transfer everything back to user 0 (revert expected)', async () => {

    await lendingPoolInstance.setUserUseReserveAsCollateral(_DAI.address, true, {from: users[1]})

    const PDaitoTransfer = await convertToCurrencyDecimals(_DAI.address, 500);

    await lendingPoolInstance.borrow(ETHEREUM_ADDRESS, await convertToCurrencyDecimals(ETHEREUM_ADDRESS,"0.1"), RATEMODE_STABLE, "0", {from: users[1]})

    await expectRevert(_PDai.transfer(users[0], PDaitoTransfer, {from: users[1]}), "Transfer cannot be allowed.")
  });
 
  it('User 0 tries to transfer 0 balance (revert expected)', async () => {
    await expectRevert(_PDai.transfer(users[1], "0", {from: users[0]}), "Transferred amount needs to be greater than zero")
  });

  it('User 1 repays the borrow, transfers PDai back to user 0', async () => {

    await _lendingPoolInstance.repay(ETHEREUM_ADDRESS, MAX_UINT_AMOUNT, users[1], {from: users[1], value: oneEther.toFixed(0)})

    const PDaitoTransfer = await convertToCurrencyDecimals(_DAI.address, '1000');

    await _PDai.transfer(users[0], PDaitoTransfer, {from: users[1]})

    const user2RedirectedBalanceAfter = await _PDai.getRedirectedBalance(users[2])

    const user1RedirectionAddress = await _PDai.getInterestRedirectionAddress(users[1])

    expect(user2RedirectedBalanceAfter.toString()).to.be.equal("0", "Invalid redirected balance for user 2 after transfer")

    expect(user1RedirectionAddress.toString()).to.be.equal(NIL_ADDRESS, "Invalid redirected address for user 1")

  });

  it('User 0 redirects interest to user 2, transfers 500 PDai to user 1. User 1 redirects to user 3. User 0 transfers another 100 PDai', async () => {

   
    let PDaitoTransfer = await convertToCurrencyDecimals(_DAI.address, '500');

    await _PDai.redirectInterestStream(users[2], {from: users[0]})

    await _PDai.transfer(users[1], PDaitoTransfer, {from: users[0]})

    await _PDai.redirectInterestStream(users[3], {from: users[1]})

    PDaitoTransfer = await convertToCurrencyDecimals(_DAI.address, '100');

    await _PDai.transfer(users[1], PDaitoTransfer, {from: users[0]})


    const user2RedirectedBalanceAfter = await _PDai.getRedirectedBalance(users[2])
    const user3RedirectedBalanceAfter = await _PDai.getRedirectedBalance(users[3])

    const expectedUser2Redirected = await convertToCurrencyDecimals(_DAI.address, "400")
    const expectedUser3Redirected = await convertToCurrencyDecimals(_DAI.address, "600")

    expect(user2RedirectedBalanceAfter.toString()).to.be.equal(expectedUser2Redirected, "Invalid redirected balance for user 2 after transfer")
    expect(user3RedirectedBalanceAfter.toString()).to.be.equal(expectedUser3Redirected, "Invalid redirected balance for user 3 after transfer")


  });
 */

});
