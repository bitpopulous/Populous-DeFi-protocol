var truffle_contracts_1 = require("../utils/typechain-types/truffle-contracts");
var types_1 = require("../utils/types");
var bignumber_js_1 = require("bignumber.js");
var constants_1 = require("../utils/constants");
var misc_utils_1 = require("../utils/misc-utils");
var truffleAssert = require("truffle-assertions");
var expectRevert = require("@openzeppelin/test-helpers").expectRevert;
var expect = require("chai").expect;
contract("LendingPool FlashLoan function", async([deployer].concat(users)), {
    let: _testEnvProvider, ITestEnv: let, _lendingPoolInstance: truffle_contracts_1.LendingPoolInstance,
    let: _lendingPoolCoreInstance, LendingPoolCoreInstance: let, _mockFlasLoanReceiverInstance: truffle_contracts_1.MockFlashLoanReceiverInstance,
    let: _priceOracleInstance, IPriceOracleInstance: let, _PTokenInstances: types_1.IPTokenInstances,
    let: _tokenInstances, ITokenInstances: let, _tokenDistributor: truffle_contracts_1.TokenDistributorInstance,
    let: _daiAddress, string: let, _depositorAddress: string,
    let: _web3, Web3: let, _initialDepositorETHBalance: string,
    const: halfEther = (0.5 * Math.pow(10, 18)).toString(),
    before: function () { }, "Initializing LendingPool test variables": , async: function () { } }, {
    _testEnvProvider:  = await, testEnvProvider: function (artifacts, _a, ContractsInstancesOrigin, TruffleArtifacts) { },
    const: (_a = _testEnvProvider.deployedInstances, lendingPoolInstance = _a.lendingPoolInstance, lendingPoolCoreInstance = _a.lendingPoolCoreInstance, PTokenInstances = _a.PTokenInstances, priceOracleInstance = _a.priceOracleInstance, mockFlashLoanReceiverInstance = _a.mockFlashLoanReceiverInstance, tokenDistributorInstance = _a.tokenDistributorInstance, getTokenAddresses = _testEnvProvider.getTokenAddresses, getWeb3 = _testEnvProvider.getWeb3, getAllTokenInstances = _testEnvProvider.getAllTokenInstances, getFirstDepositorAddressOnTests = _testEnvProvider.getFirstDepositorAddressOnTests, _testEnvProvider),
    _lendingPoolInstance:  = lendingPoolInstance,
    _lendingPoolCoreInstance:  = lendingPoolCoreInstance,
    _priceOracleInstance:  = priceOracleInstance,
    _PTokenInstances:  = PTokenInstances,
    _mockFlasLoanReceiverInstance:  = mockFlashLoanReceiverInstance, as: truffle_contracts_1.MockFlashLoanReceiverInstance,
    _tokenInstances:  = await, getAllTokenInstances: function () { },
    _daiAddress:  = (await), getTokenAddresses: function () { } }).DAI;
_depositorAddress = await;
getFirstDepositorAddressOnTests();
_tokenDistributor = tokenDistributorInstance;
_web3 = await;
getWeb3();
_initialDepositorETHBalance = await;
_web3.eth.getBalance(_depositorAddress);
it("Deposits ETH into the reserve", async(), {
    const: amountToDeposit = await, convertToCurrencyDecimals: function (ETHEREUM_ADDRESS) { }, "1":  });
await;
_lendingPoolInstance.deposit(constants_1.ETHEREUM_ADDRESS, amountToDeposit, "0", {
    from: _depositorAddress,
    value: amountToDeposit
});
it("Takes ETH flashloan, returns the funds correctly", async(), {
    //move funds to the MockFlashLoanReceiver contract
    let: send = web3.eth.sendTransaction({
        from: deployer,
        to: _mockFlasLoanReceiverInstance.address,
        value: web3.utils.toWei("0.5", "ether")
    }),
    const: txResult = await, _lendingPoolInstance: .flashLoan(_mockFlasLoanReceiverInstance.address, constants_1.ETHEREUM_ADDRESS, new bignumber_js_1["default"](0.8).multipliedBy(constants_1.oneEther), "0x10"),
    const: reserveData, any:  = await, _lendingPoolInstance: .getReserveData(constants_1.ETHEREUM_ADDRESS),
    const: tokenDistributorBalance = await, _web3: .eth.getBalance(_tokenDistributor.address),
    const: currentLiqudityRate = reserveData.liquidityRate,
    const: currentLiquidityIndex = reserveData.liquidityIndex,
    expect: function (reserveData, totalLiquidity, toString) {
        if (toString === void 0) { toString = (); }
    }, to: .be.equal("1001960000000000000"),
    expect: function (currentLiqudityRate, toString) {
        if (toString === void 0) { toString = (); }
    }, to: .be.equal("0"),
    expect: function (currentLiquidityIndex, toString) {
        if (toString === void 0) { toString = (); }
    }, to: .be.equal("1001960000000000000000000000"),
    expect: function (tokenDistributorBalance, toString) {
        if (toString === void 0) { toString = (); }
    }, to: .be.equal("840000000000000")
});
it("Takes an ETH flashloan as big as the available liquidity", async(), {
    //move funds to the MockFlashLoanReceiver contract
    let: send = web3.eth.sendTransaction({
        from: deployer,
        to: _mockFlasLoanReceiverInstance.address,
        value: web3.utils.toWei("0.5", "ether")
    }),
    const: txResult = await, _lendingPoolInstance: .flashLoan(_mockFlasLoanReceiverInstance.address, constants_1.ETHEREUM_ADDRESS, "1001960000000000000", "0x10"),
    const: reserveData, any:  = await, _lendingPoolInstance: .getReserveData(constants_1.ETHEREUM_ADDRESS),
    const: tokenDistributorBalance = await, _web3: .eth.getBalance(_tokenDistributor.address),
    const: currentLiqudityRate = reserveData.liquidityRate,
    const: currentLiquidityIndex = reserveData.liquidityIndex,
    expect: function (reserveData, totalLiquidity, toString) {
        if (toString === void 0) { toString = (); }
    }, to: .be.equal("1004414802000000000"),
    expect: function (currentLiqudityRate, toString) {
        if (toString === void 0) { toString = (); }
    }, to: .be.equal("0"),
    expect: function (currentLiquidityIndex, toString) {
        if (toString === void 0) { toString = (); }
    }, to: .be.equal("1004414802000000000000000000"),
    expect: function (tokenDistributorBalance, toString) {
        if (toString === void 0) { toString = (); }
    }, to: .be.equal("1892058000000000")
});
it("Takes ETH flashloan, does not return the funds (revert expected)", async(), {
    //move funds to the MockFlashLoanReceiver contract
    let: send = web3.eth.sendTransaction({
        from: deployer,
        to: _mockFlasLoanReceiverInstance.address,
        value: web3.utils.toWei("0.5", "ether")
    }),
    await: _mockFlasLoanReceiverInstance.setFailExecutionTransfer(true),
    await: expectRevert(_lendingPoolInstance.flashLoan(_mockFlasLoanReceiverInstance.address, constants_1.ETHEREUM_ADDRESS, new bignumber_js_1["default"](0.8).multipliedBy(constants_1.oneEther), "0x10"), "The actual balance of the protocol is inconsistent")
});
it("tries to take a very small flashloan, which would result in 0 fees (revert expected)", async(), {
    //move funds to the MockFlashLoanReceiver contract
    await: expectRevert(_lendingPoolInstance.flashLoan(_mockFlasLoanReceiverInstance.address, constants_1.ETHEREUM_ADDRESS, "1", "0x10"), "The requested amount is too small for a flashLoan.")
});
it("tries to take a flashloan that is bigger than the available liquidity (revert expected)", async(), {
    //move funds to the MockFlashLoanReceiver contract
    await: expectRevert(_lendingPoolInstance.flashLoan(_mockFlasLoanReceiverInstance.address, constants_1.ETHEREUM_ADDRESS, "1004415000000000000", "0x10"), "There is not enough liquidity available to borrow")
});
it("tries to take a flashloan using a non contract address as receiver (revert expected)", async(), {
    //move funds to the MockFlashLoanReceiver contract
    await: expectRevert(_lendingPoolInstance.flashLoan(deployer, constants_1.ETHEREUM_ADDRESS, "1000000000000000000", "0x10"), "revert")
});
it("Deposits DAI into the reserve", async(), {
    const: (daiInstance = _tokenInstances.DAI, _tokenInstances),
    //mints DAI to depositor
    await: daiInstance.mint(await, misc_utils_1.convertToCurrencyDecimals(daiInstance.address, "1000"), {
        from: _depositorAddress
    }),
    //approve protocol to access depositor wallet
    await: daiInstance.approve(_lendingPoolCoreInstance.address, constants_1.APPROVAL_AMOUNT_LENDING_POOL_CORE, {
        from: _depositorAddress
    }),
    const: amountToDeposit = await, convertToCurrencyDecimals: function (_daiAddress) { }, "1000":  });
await;
_lendingPoolInstance.deposit(daiInstance.address, amountToDeposit, "0", {
    from: _depositorAddress
});
it("Takes out a 500 DAI flashloan, returns the funds correctly", async(), {
    const: (daiInstance = _tokenInstances.DAI, _tokenInstances),
    await: _mockFlasLoanReceiverInstance.setFailExecutionTransfer(false),
    await: _lendingPoolInstance.flashLoan(_mockFlasLoanReceiverInstance.address, _daiAddress, new bignumber_js_1["default"](500).multipliedBy(constants_1.oneEther), "0x10"),
    const: reserveData, any:  = await, _lendingPoolInstance: .getReserveData(_daiAddress),
    const: userData, any:  = await, _lendingPoolInstance: .getUserReserveData(_daiAddress, deployer),
    const: totalLiquidity = reserveData.totalLiquidity.toString(),
    const: currentLiqudityRate = reserveData.liquidityRate.toString(),
    const: currentLiquidityIndex = reserveData.liquidityIndex.toString(),
    const: currentUserBalance = userData.currentPTokenBalance.toString(),
    const: expectedLiquidity = new bignumber_js_1["default"]("1001.225").multipliedBy(constants_1.oneEther).toFixed(),
    const: tokenDistributorBalance = await, daiInstance: .balanceOf(_tokenDistributor.address),
    expect: function (totalLiquidity) { }, to: .be.equal(expectedLiquidity, "Invalid total liquidity"),
    expect: function (currentLiqudityRate) { }, to: .be.equal("0", "Invalid liquidity rate"),
    expect: function (currentLiquidityIndex) { }, to: .be.equal(new bignumber_js_1["default"]("1.001225").multipliedBy(constants_1.oneRay).toFixed(), "Invalid liquidity index"),
    expect: function (currentUserBalance, toString) {
        if (toString === void 0) { toString = (); }
    }, to: .be.equal(expectedLiquidity, "Invalid user balance"),
    expect: function (tokenDistributorBalance, toString) {
        if (toString === void 0) { toString = (); }
    }, to: .be.equal(new bignumber_js_1["default"]("0.525").multipliedBy(constants_1.oneEther).toFixed(), "Invalid token distributor balance")
});
it("Takes out a 500 DAI flashloan, does not return the funds (revert expected)", async(), {
    //move funds to the MockFlashLoanReceiver contract
    await: _mockFlasLoanReceiverInstance.setFailExecutionTransfer(true),
    await: expectRevert(_lendingPoolInstance.flashLoan(_mockFlasLoanReceiverInstance.address, _daiAddress, new bignumber_js_1["default"](500).multipliedBy(constants_1.oneEther), "0x10"), "The actual balance of the protocol is inconsistent")
});
var _a;
