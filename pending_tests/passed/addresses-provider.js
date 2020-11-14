const LendingPool = artifacts.require('LendingPool');
const LendingPoolAddressesProvider = artifacts.require('LendingPoolAddressesProvider');
const LendingPoolCore = artifacts.require("LendingPoolCore")
const LendingPoolConfigurator = artifacts.require("LendingPoolConfigurator");
const LendingPoolDataProvider = artifacts.require("LendingPoolDataProvider");
const LendingRateOracle = artifacts.require("LendingRateOracle");
const FeeProvider = artifacts.require("FeeProvider");
const ChainlinkProxyPriceProvider = artifacts.require("ChainlinkProxyPriceProvider");

const Dai = artifacts.require('Dai');

const { BN, expectRevert, time } = require('openzeppelin-test-helpers');
const { expect } = require('chai');
const { utils } = web3;
//const { toWei, keccak256 } = utils;

contract("LendingPoolAddressesProvider", async accounts => {

  let addressesProviderInstance;

  const [root, alice, bob, carl] = accounts;
  const oneDayPeriod = time.duration.days(1);

  const instantiateContracts = async () => {
    addressesProviderInstance = await LendingPoolAddressesProvider.new();

  }

  /*
  before() is run once before all the tests in a describe
after()   is run once after all the tests in a describe
beforeEach() is run before each test in a describe
afterEach()   is run after each test in a describe
*/

  before(async () => {
    await instantiateContracts();
  });
 
  it("Tests the Lending Pool address consistency in the LendingPoolAddressesProvider", async () => {
    let _addressmanager = await LendingPoolAddressesProvider.new({from: root});
    let lp = await LendingPool.new();
    let proxyAddress;
    // console.log(lp.address, 'lending pool address');
    let lpSet = await _addressmanager.setLendingPoolImpl(lp.address, {from: root});
    for (i in lpSet.logs) {
      if (lpSet.logs[i].event == 'ProxyCreated') {
        proxyAddress = lpSet.logs[i].args.newAddress; 
      }
    }
    //console.log(lpSet.logs, "lp setting tx logs");
    //console.log(lpSet.logs[0], lpSet.logs[0].args.newAddress, "proxy address creation");
    let getAddress = await _addressmanager.getLendingPool();
    expect(proxyAddress).to.be.equal(getAddress);
  })

  it("Tests the Lending Pool Core address consistency in the LendingPoolAddressesProvider", async () => {
    let _addressmanager = await LendingPoolAddressesProvider.new({from: root});
    let lp = await LendingPoolCore.new();
    let proxyAddress;
    // console.log(lp.address, 'lending pool core address');
    let lpSet = await _addressmanager.setLendingPoolCoreImpl(lp.address, {from: root});
    for (i in lpSet.logs) {
      if (lpSet.logs[i].event == 'ProxyCreated') {
        proxyAddress = lpSet.logs[i].args.newAddress; 
      }
    }
    //console.log(lpSet.logs, "lp core setting tx logs");
    //console.log(lpSet.logs[0], lpSet.logs[0].args.newAddress, "proxy address creation");
    let getAddress = await _addressmanager.getLendingPoolCore();
    expect(proxyAddress).to.be.equal(getAddress);
  })

  it("Tests the Lending Pool Configurator address consistency in the LendingPoolAddressesProvider", async () => {
    let _addressmanager = await LendingPoolAddressesProvider.new({from: root});
    let lp = await LendingPoolConfigurator.new();
    let proxyAddress;
    // console.log(lp.address, 'lending pool core address');
    let lpSet = await _addressmanager.setLendingPoolConfiguratorImpl(lp.address, {from: root});
    for (i in lpSet.logs) {
      if (lpSet.logs[i].event == 'ProxyCreated') {
        proxyAddress = lpSet.logs[i].args.newAddress; 
      }
    }
    //console.log(lpSet.logs, "lp core setting tx logs");
    //console.log(lpSet.logs[0], lpSet.logs[0].args.newAddress, "proxy address creation");
    let getAddress = await _addressmanager.getLendingPoolConfigurator();
    expect(proxyAddress).to.be.equal(getAddress);
  })

  it("Tests the Lending Pool Manager address consistency in the LendingPoolAddressesProvider", async () => {
    let _addressmanager = await LendingPoolAddressesProvider.new({from: root});
    let lmSet = await _addressmanager.setLendingPoolManager(root, {from: root});
    let getAddress = await _addressmanager.getLendingPoolManager();
    expect(root).to.be.equal(getAddress);
  })


  it("Tests the Lending Pool Data Provider address consistency in the LendingPoolAddressesProvider", async () => {
    let _addressmanager = await LendingPoolAddressesProvider.new({from: root});
    let lp = await LendingPoolDataProvider.new();
    let proxyAddress;
    // console.log(lp.address, 'lending pool core address');
    let lpSet = await _addressmanager.setLendingPoolDataProviderImpl(lp.address, {from: root});
    for (i in lpSet.logs) {
      if (lpSet.logs[i].event == 'ProxyCreated') {
        proxyAddress = lpSet.logs[i].args.newAddress; 
      }
    }
    //console.log(lpSet.logs, "lp core setting tx logs");
    //console.log(lpSet.logs[0], lpSet.logs[0].args.newAddress, "proxy address creation");
    let getAddress = await _addressmanager.getLendingPoolDataProvider();
    expect(proxyAddress).to.be.equal(getAddress);
  })

  it("Tests the ChainlinkProxyPriceProvider address consistency in the LendingPoolAddressesProvider", async () => {
    let _addressmanager = await LendingPoolAddressesProvider.new({from: root});
    let lp = await ChainlinkProxyPriceProvider.new([], [], alice);
    let lpSet = await _addressmanager.setPriceOracle(lp.address, {from: root});
    //console.log(lpSet.logs, "lp core setting tx logs");
    //console.log(lpSet.logs[0], lpSet.logs[0].args.newAddress, "proxy address creation");
    let getAddress = await _addressmanager.getPriceOracle();
    expect(lp.address).to.be.equal(getAddress);
  })

  it("Tests the Lending Rate Oracle address consistency in the LendingPoolAddressesProvider", async () => {
    let _addressmanager = await LendingPoolAddressesProvider.new({from: root});
    let lp = await LendingRateOracle.new();
    let lpSet = await _addressmanager.setLendingRateOracle(lp.address, {from: root});
    //console.log(lpSet.logs, "lp core setting tx logs");
    //console.log(lpSet.logs[0], lpSet.logs[0].args.newAddress, "proxy address creation");
    let getAddress = await _addressmanager.getLendingRateOracle();
    expect(lp.address).to.be.equal(getAddress);
  })

  it("Tests the Fee Provider address consistency in the LendingPoolAddressesProvider", async () => {
    let _addressmanager = await LendingPoolAddressesProvider.new({from: root});
    let lp = await FeeProvider.new();
    let proxyAddress;
    let lpSet = await _addressmanager.setFeeProviderImpl(lp.address, {from: root});
    for (i in lpSet.logs) {
      if (lpSet.logs[i].event == 'ProxyCreated') {
        proxyAddress = lpSet.logs[i].args.newAddress; 
      }
    }
    //console.log(lpSet.logs, "lp core setting tx logs");
    //console.log(lpSet.logs[0], lpSet.logs[0].args.newAddress, "proxy address creation");
    let getAddress = await _addressmanager.getFeeProvider();
    expect(proxyAddress).to.be.equal(getAddress);
  })

  it("Test the accessibility of the LendingPoolAddressesProvider", async () => {
    //transfers ownership to another account
    await addressesProviderInstance.transferOwnership(accounts[2])

    //checks execution of the setters on LendingPoolAddressesProvider

    await expectRevert(
      addressesProviderInstance.setFeeProviderImpl(accounts[0]),
      "Ownable: caller is not the owner",
    )
    await expectRevert(
      addressesProviderInstance.setLendingPoolImpl(accounts[0]),
      "Ownable: caller is not the owner",
    )
    await expectRevert(
      addressesProviderInstance.setLendingPoolConfiguratorImpl(accounts[0]),
      "Ownable: caller is not the owner",
    )
    await expectRevert(
      addressesProviderInstance.setLendingPoolCoreImpl(accounts[0]),
      "Ownable: caller is not the owner",
    )
    await expectRevert(
      addressesProviderInstance.setLendingPoolDataProviderImpl(accounts[0]),
      "Ownable: caller is not the owner",
    )
    await expectRevert(
      addressesProviderInstance.setLendingPoolLiquidationManager(accounts[0]),
      "Ownable: caller is not the owner",
    )
    await expectRevert(
      addressesProviderInstance.setLendingPoolManager(accounts[0]),
      "Ownable: caller is not the owner",
    )
    await expectRevert(
      addressesProviderInstance.setLendingPoolParametersProviderImpl(accounts[0]),
      "Ownable: caller is not the owner",
    )
    await expectRevert(
      addressesProviderInstance.setLendingRateOracle(accounts[0]),
      "Ownable: caller is not the owner",
    )

    await expectRevert(
      addressesProviderInstance.setPriceOracle(accounts[0]),
      "Ownable: caller is not the owner",
    )
  })
})
