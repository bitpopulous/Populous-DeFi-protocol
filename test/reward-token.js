
const {
    BN,           // Big Number support
    constants,    // Common constants, like the zero address and largest integers
    expectEvent,  // Assertions for emitted events
    expectRevert, // Assertions for transactions that should fail
    time,
  } = require('openzeppelin-test-helpers');
const { expect } = require('chai');
const { utils } = web3;
const BigNumber = require('bignumber.js');

const PopulousReward = artifacts.require("PopulousReward");
const DefaultReserveInterestRateStrategy = artifacts.require("DefaultReserveInterestRateStrategy");
const MintableERC20 = artifacts.require('MintableERC20');
const Dai = artifacts.require('MockDAI');
const USDC = artifacts.require('MockUSDC');
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
  ////console.log(Number(pDecimals.toString()), 'dai decimals');
  
  let converted = new BigNumber(10**Number(pDecimals.toString()) * amount); 
  return converted;
};


contract('PToken: Transfer', async ([deployer, ...users]) => {

  
    let _PDai;
    let _reward;
    let _DAI, _USDC;
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
    let skipblock;
  
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
      ////console.log(await convertToCurrencyDecimals(_DAI.address, 1000), '1000 in DAI');
      //init PDai
      let daiName = await _DAI.name();
      let daiSymbol = await _DAI.symbol();
      let daiDecimals = await _DAI.decimals();
      ////console.log(Number(daiDecimals.toString()), 'dai decimals');
      ////console.log(daiName, 'dai name');
      ////console.log(daiSymbol, 'dai symbol');
      //_PDai = await PToken.new(addressesProviderInstance.address, _DAI.address, Number(daiDecimals.toString()), daiName, daiSymbol, {from: deployer});
      

      //init DefaultReserveInterestRateStrategy
      //uint256 base variable borrow rate when Utilization rate = 0. Expressed in ray
      let _baseVariableBorrowRate = "10000000000000000000000000";
      //uint256 slope of the variable interest curve when utilization rate > 0 and <= OPTIMAL_UTILIZATION_RATE. Expressed in ray
      let _variableRateSlope1 = "40000000000000000000000000";
      //uint256 slope of the variable interest curve when utilization rate > OPTIMAL_UTILIZATION_RATE. Expressed in ray
      let _variableRateSlope2 = "1000000000000000000000000000";
      //uint256 slope of the stable interest curve when utilization rate > 0 and <= OPTIMAL_UTILIZATION_RATE. Expressed in ray
      let _stableRateSlope1 = "140000000000000000000000000";
      //uint256 slope of the stable interest curve when utilization rate > OPTIMAL_UTILIZATION_RATE. Expressed in ray
      let _stableRateSlope2 = "600000000000000000000000000";
      let reserve_address = _DAI.address;
      /* let reserve_address = _DAI.address;
        //uint256 base variable borrow rate when Utilization rate = 0. Expressed in ray
        let _baseVariableBorrowRate = Number('0x84595161401484a000000').toString();
        //uint256 slope of the variable interest curve when utilization rate > 0 and <= OPTIMAL_UTILIZATION_RATE. Expressed in ray
        let _variableRateSlope1 = Number('0x2116545850052128000000').toString();
        //uint256 slope of the variable interest curve when utilization rate > OPTIMAL_UTILIZATION_RATE. Expressed in ray
        let _variableRateSlope2 = Number('0x33b2e3c9fd0803ce8000000').toString();
        //uint256 slope of the stable interest curve when utilization rate > 0 and <= OPTIMAL_UTILIZATION_RATE. Expressed in ray
        let _stableRateSlope1 = Number('0x73ce27351811f40c000000').toString();
        //uint256 slope of the stable interest curve when utilization rate > OPTIMAL_UTILIZATION_RATE. Expressed in ray
        let _stableRateSlope2 = Number('0x01f04ef12cb04cf158000000').toString(); */
      
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
      ////console.log(reserveData, "DAI reserve data");
      
      _Core = await LendingPoolCore.at(getLCAddress);
      ////console.log(await _Core.getReservePTokenAddress(_DAI.address), 'core address');
      _PDai_Address = await _Core.getReservePTokenAddress(_DAI.address);

      //init populousreward contract
      //init reward token erc20 USDC for transfer to reward contract afterwards
      _USDC = await USDC.new({from: deployer});
      
      //Reward constructor parameters
        let coreAddress =  getLCAddress; 
        let RewardToken = _USDC.address;
        let _devaddr = deployer;
        //uint256 _rewardTokenPerBlock,
        let _rewardTokenPerBlock = '3';
        //uint256 _startBlock,
        //uint256 _bonusEndBlock
        let _startBlock = await web3.eth.getBlockNumber();
        ////console.log(_startBlock, 'current/bonus start block');
        let _bonusEndBlock = await web3.eth.getBlockNumber()+1000;
        skipblock = _startBlock+100;
        ////console.log(_bonusEndBlock, 'bonus end block');
      _reward = await PopulousReward.new(coreAddress, RewardToken, _devaddr, _rewardTokenPerBlock, _startBlock, _bonusEndBlock, {from: deployer});
         //console.log(_startBlock, 'reward contract start block');
         //console.log(_bonusEndBlock, 'reward contract end block');
    });
  
    it('Check Populous Reward field variables', async () => {
        //bonusEndBlock, rewardTokenPerBlock, BONUS_MULTIPLIER,rewardToken, _devaddr, core
        let rewardTokenAddress = await _reward.rewardToken();
       expect(rewardTokenAddress).to.be.equal(_USDC.address, "Invalid reward token address");
       let rewardCoreAddress = await _reward.core();
       expect(rewardCoreAddress).to.be.equal(getLCAddress, "Invalid core address");
    });

    it('Should update lending pool core address (onlyOwner can call)', async () => {
        await _reward.UpdatelendingPoolCore(getLCAddress);
        let rewardCoreAddress = await _reward.core();
       expect(rewardCoreAddress).to.be.equal(getLCAddress, "Invalid core address");
    });

    it('Should add a PToken (PDAI) to the Populous Reward contract (onlyOwner can call)', async () => {
        let _allocPoint = await web3.eth.getBlockNumber()+5;
        let _reserve = _DAI.address;
        await _reward.add(_allocPoint, _reserve);
        let _totalAllocPoint = await _reward.totalAllocPoint();
        expect(_totalAllocPoint.toNumber()).to.be.equal(_allocPoint, "Total allocation point not updated");
    });

    it('Should get pool information and set/update the given pools Token allocation point. (onlyOwner can call)', async () => {
        let _allocPoint = await web3.eth.getBlockNumber();
        let _reserve = _DAI.address;
        await _reward.set(_reserve, _allocPoint);
        //poolInfo[_reserve].allocPoint = _allocPoint;
        //Should get pool (reserve token) info'
        let poolInfo = await _reward.getpoolinfo(_reserve);
        let poolPToken = await _Core.getReservePTokenAddress(_reserve);
        //pool.PToken, pool.allocPoint, pool.lastRewardBlock, pool.accTokenPerShare
        ////console.log(poolInfo);
        ////console.log(poolInfo[0]);
        ////console.log(await web3.eth.getBlockNumber());
        ////console.log(poolInfo[1].toNumber());

        //pool.PToken is PDAI - lending pool token
        //reward token is USDC
        expect(poolInfo[0]).to.be.equal(poolPToken, "pool PToken address is incorrect");
        expect(poolInfo[1].toNumber()).to.be.equal(_allocPoint, "pool allocation point not updated");
        ////console.log(poolInfo[2].toNumber(), 'pool last reward block');
    });

    it('Should Set the migrator contract (reserve token) info (onlyOwner can call)', async () => {
        //function setMigrator(IMigratorToken _migrator) public onlyOwner 
    }); 

    it('Should Migrate lp token to another lp contract. (anyone can call)', async () => {
        //function migrate(address _reserve) public 
    }); 

    it('Should Return reward multiplier over the given _from to _to block (anyone can call)', async () => {
        //function getMultiplier(uint256 _from, uint256 _to) public view returns (uint256) {
        let _from = await web3.eth.getBlockNumber();
        let _to = await web3.eth.getBlockNumber()+10;
        let reward_multiplier = await _reward.getMultiplier(_from, _to);
        expect(reward_multiplier.toNumber()).to.be.greaterThan(0, 'Invalid reward multiplier');
    }); 

    it('Should Return pending rewardTokens on frontend (anyone can call)', async () => {
        //function pendingrewardToken(address _reserve, address _user) external view returns (uint256) {
        let _pendingrewardToken = await _reward.pendingrewardToken(_DAI.address, users[0]);
        expect(_pendingrewardToken.toNumber()).to.be.equal(0, 'Expected reward token for users[0] is incorrect');
    }); 
    
    it('Should Return user information (anyone can call)', async () => {
        //function getuserinfo(address _reserve, address _user) public view returns(uint256 ,uint256 ){
        //return(user.amount,user.rewardDebt);
        let _userInfo = await _reward.getuserinfo(_DAI.address, users[0]);
        expect(_userInfo[0].toNumber()).to.be.equal(0, 'Expected users[0] amount is incorrect');
        expect(_userInfo[1].toNumber()).to.be.equal(0, 'Expected users[0] reward debt is incorrect');
    });
    

    it('Should successfully update reward variables of the given pool to be up-to-date. (anyone can call)', async () => {
        //function updatePool(address _reserve) public {
        let poolUpdateTx = await _reward.updatePool(_DAI.address, {from: users[0]});
        expect(poolUpdateTx.receipt.status).to.be.true;
    });
    

    it('User 0 should successfully mint 500 Dai and deposit 250 into lending pool in exchange for lending pool/reserve PTokens', async () => {
        const mintAmount = await convertToCurrencyDecimals(_DAI.address, 500);
        const amountDAItoDeposit = await convertToCurrencyDecimals(_DAI.address, 250);

        await _DAI.mint(mintAmount, {
            //await _PDai.mint("500000000000000000000" , {
            from: users[0],
        });
        const initialBalance = await _DAI.balanceOf(users[0]);
        expect(Number(initialBalance.toString())).to.be.equal(500000000000000000000, "Invalid balance after mint");
        expect(new BigNumber(initialBalance).shiftedBy(-18).toNumber()).to.be.equal(500, "Invalid balance after mint");

        await _DAI.approve(getLCAddress, await convertToCurrencyDecimals(_DAI.address, 500), {
            from: users[0],
        });

        await lendingPoolInstance.deposit(_DAI.address, amountDAItoDeposit, '1', {
            from: users[0],
        });

        _PDai = await PToken.at(_PDai_Address);
        //balance
        const fromBalance = await _PDai.balanceOf(users[0]);
        expect(Number(fromBalance.toString())).to.be.equal(amountDAItoDeposit.toNumber(), "Invalid to balance after deposit");
    });

    it('User 0 should successfully deposit the 250 lending pool/reserve tokens for reward token allocation (anyone can call)', async () => {        
       
        const mintAmount = await convertToCurrencyDecimals(_USDC.address, 1000000);
        await _USDC.mint(mintAmount, {
            //await _PDai.mint("1000000000000" , {
            from: users[0],
        });
        const initialBalance = await _USDC.balanceOf(users[0]);
        expect(Number(initialBalance.toString())).to.be.equal(1000000000000, "Invalid balance after mint");
        ////console.log(initialBalance.toString(), 'User 0 initial balance');
        //transfer reward token to reward contract
        await _USDC.transfer(_reward.address, mintAmount, {from: users[0]});
        const rewardContractInitialBalance = await _USDC.balanceOf(_reward.address);
        expect(Number(rewardContractInitialBalance.toString())).to.be.equal(1000000000000, "Invalid balance after mint");
        
        _PDai = await PToken.at(_PDai_Address); 
        await _PDai.approve(_reward.address, await convertToCurrencyDecimals(_PDai.address, 250), {
            from: users[0],
        });
        //function deposit(address _reserve, uint256 _amount) public {
        await _reward.deposit(_DAI.address, await convertToCurrencyDecimals(_DAI.address, 250), {from: users[0]});
        //pool.PToken is PDAI - lending pool token
        //reward token is USDC
        await _reward.pendingrewardToken(_DAI.address, users[0]);

        /*AFTER DEPOSIT CHECKS*/

        //check user info after deposit
        //return(user.amount,user.rewardDebt);
        let _userInfo = await _reward.getuserinfo(_DAI.address, users[0]);
        expect(new BigNumber(_userInfo[0]).shiftedBy(-18).toNumber()).to.be.equal(250, 'Expected users[0] amount is incorrect');
        ////console.log(_userInfo[1].toNumber(), 'user reward debt after deposit');
        expect(new BigNumber(_userInfo[1]).shiftedBy(-18).toNumber()).to.be.equal(0, 'Expected users[0] reward debt is incorrect');
        //check reward contract lending pool token balance
        const rewardContract_lpBalance = await _PDai.balanceOf(_reward.address);
        ////console.log(Number(rewardContract_initialBalance.toString()));
        expect(Number(rewardContract_lpBalance.toString())).to.be.equal(Number(await convertToCurrencyDecimals(_PDai.address, 250)), "Invalid balance after mint");
        //check reward contract reward token balance
        //reward contract should have one million reward tokens (USDC)
        const rewardContract_initialBalance = await _USDC.balanceOf(_reward.address);
        ////console.log(Number(rewardContract_initialBalance.toString()));
        //const mint_amount = await convertToCurrencyDecimals(_USDC.address, 1000000);
        expect(new BigNumber(rewardContract_initialBalance).shiftedBy(-6).toNumber()).to.be.equal(1000000, "Invalid balance after user deposit");
        //check user lending pool token balance after deposit
        _PDai = await PToken.at(_PDai_Address);
        //balance
        const fromBalance = await _PDai.balanceOf(users[0]);
        expect(Number(fromBalance.toString())).to.be.equal(0, "Invalid balance after deposit into reward contract");
        //check user reward token balance for reward allocation checks after deposit
        const user_rewardBalance = await _USDC.balanceOf(users[0]);
        expect(new BigNumber(user_rewardBalance).shiftedBy(-6).toNumber()).to.be.equal(0, "Invalid balance after user deposit");
    }); 

    
    it('Should withdraw 100 lending pool/reserve tokens plus reward tokens from Populous Reward (anyone can call)', async () => {       
        
        //console.log(await web3.eth.getBlockNumber(), 'current block');
        //check pending reward tokens
        let pendingReward = await _reward.pendingrewardToken(_DAI.address, users[0]);
        //console.log(new BigNumber(pendingReward).shiftedBy(-6).toNumber(), 'pending reward token before withdraw');
        const initialrewardContract_lpBalance = await _PDai.balanceOf(_reward.address);
        //function withdraw(address _reserve, uint256 _amount) public {
        await _reward.withdraw(_DAI.address, await convertToCurrencyDecimals(_DAI.address, 100), {from: users[0]});

        /*AFTER WITHDRAWAL CHECKS*/

        //check user info after withdrawal
        //return(user.amount,user.rewardDebt);
        const fromBalance = await _PDai.balanceOf(users[0]);
        let _userInfo = await _reward.getuserinfo(_DAI.address, users[0]);
        expect(new BigNumber(_userInfo[0]).shiftedBy(-18).toNumber()).to.be.equal(150, 'Expected users[0] amount is incorrect');
        ////console.log(_userInfo[1].toNumber(), 'user reward debt after withdrawal');
        expect(new BigNumber(_userInfo[1]).shiftedBy(-18).toNumber()).to.be.equal(0, 'Expected users[0] reward debt is incorrect');
        //check reward contract lending pool token balance
        const rewardContract_lpBalance = await _PDai.balanceOf(_reward.address);
        expect(Number(rewardContract_lpBalance.toString())).to.be.equal(Number(initialrewardContract_lpBalance.toString()) - Number(fromBalance.toString()), "Invalid balance after mint");
        //check reward contract reward token balance
        //reward contract should have one million reward tokens (USDC)
        const rewardContract_initialBalance = await _USDC.balanceOf(_reward.address);
        const user_rewardBalance = await _USDC.balanceOf(users[0]);
        expect(new BigNumber(rewardContract_initialBalance).shiftedBy(-6).toNumber() + new BigNumber(user_rewardBalance).shiftedBy(-6).toNumber()).to.be.equal(1000000, "Invalid balance after user deposit");
        //check user lending pool token balance after withdrawal
        _PDai = await PToken.at(_PDai_Address);
        //balance should be 100 PDai withdrawn from reward contract
        // user deposited 250 Dai into lending pool for 250 PDai equivalent then 
        //deposited this into reward contract and withdrew 100 PDai
        expect(new BigNumber(fromBalance).shiftedBy(-18).toNumber()).to.be.equal(100, "Invalid balance after withdrawal into reward contract");
        //check user reward token balance for reward allocation checks after deposit
        expect(new BigNumber(user_rewardBalance).shiftedBy(-6).toNumber()).to.be.equal(0, "Invalid balance after user deposit");
        
    });    

    it('Should Withdraw only reward tokens (anyone can call)', async () => {
        //console.log(await web3.eth.getBlockNumber(), 'current block');
        //check pending reward tokens
        let pendingReward = await _reward.pendingrewardToken(_DAI.address, users[0]);
        //console.log(new BigNumber(pendingReward).shiftedBy(-6).toNumber(), 'pending reward token before withdraw');
        const initialrewardContract_lpBalance = await _PDai.balanceOf(_reward.address);
        //function withdrawrewardtoken(address _reserve) public {
        await _reward.withdrawrewardtoken(_DAI.address, {from: users[0]});

        /*AFTER WITHDRAWAL CHECKS*/

        //check user info after withdrawal
        //return(user.amount,user.rewardDebt);
        const fromBalance = await _PDai.balanceOf(users[0]);
        let _userInfo = await _reward.getuserinfo(_DAI.address, users[0]);
        expect(new BigNumber(_userInfo[0]).shiftedBy(-18).toNumber()).to.be.equal(150, 'Expected users[0] amount is incorrect');
        ////console.log(_userInfo[1].toNumber(), 'user reward debt after withdrawal');
        expect(new BigNumber(_userInfo[1]).shiftedBy(-18).toNumber()).to.be.equal(0, 'Expected users[0] reward debt is incorrect');
        //check reward contract lending pool token balance
        const rewardContract_lpBalance = await _PDai.balanceOf(_reward.address);
        expect(new BigNumber(rewardContract_lpBalance).shiftedBy(-18).toNumber()).to.be.equal(150, "Invalid balance after mint");
        //check reward contract reward token balance
        //reward contract should have one million reward tokens (USDC)
        const rewardContract_initialBalance = await _USDC.balanceOf(_reward.address);
        const user_rewardBalance = await _USDC.balanceOf(users[0]);
        expect(new BigNumber(rewardContract_initialBalance).shiftedBy(-6).toNumber() + new BigNumber(user_rewardBalance).shiftedBy(-6).toNumber()).to.be.equal(1000000, "Invalid balance after user deposit");
        //check user lending pool token balance after withdrawal
        _PDai = await PToken.at(_PDai_Address);
        //balance should be 100 PDai withdrawn from reward contract
        // user deposited 250 Dai into lending pool for 250 PDai equivalent then 
        //deposited this into reward contract and withdrew 100 PDai
        expect(new BigNumber(fromBalance).shiftedBy(-18).toNumber()).to.be.equal(100, "Invalid balance after withdrawal into reward contract");
        //check user reward token balance for reward allocation checks after withdrawal
        expect(new BigNumber(user_rewardBalance).shiftedBy(-6).toNumber()).to.be.equal(0, "Invalid balance after user deposit");
        
    });
    

    it('Should Withdraw remaining 150 lending pool tokens without caring about rewards. EMERGENCY ONLY. (anyone can call)', async () => {
        // Advance 1000 blocks.
        for (let i = 0; i < 1000; ++i) {
            await time.advanceBlock();
        }
        //console.log(await web3.eth.getBlockNumber(), 'current block');
        //check pending reward tokens
        let pendingReward = await _reward.pendingrewardToken(_DAI.address, users[0]);
        //console.log(new BigNumber(pendingReward).shiftedBy(-6).toNumber(), 'pending reward token before withdraw');
        const initialrewardContract_lpBalance = await _PDai.balanceOf(_reward.address);
        const rewardContract_initialBalance = await _USDC.balanceOf(_reward.address);
        const initial_user_rewardBalance = await _USDC.balanceOf(users[0]);
        //function emergencyWithdraw(address _reserve) public {
        await _reward.emergencyWithdraw(_DAI.address, {from: users[0]});
                
        /*AFTER WITHDRAWAL CHECKS*/

        //check user info after withdrawal
        //return(user.amount,user.rewardDebt);
        const fromBalance = await _PDai.balanceOf(users[0]);
        let _userInfo = await _reward.getuserinfo(_DAI.address, users[0]);
        expect(new BigNumber(_userInfo[0]).shiftedBy(-18).toNumber()).to.be.equal(150-150, 'Expected users[0] amount is incorrect');
        ////console.log(_userInfo[1].toNumber(), 'user reward debt after withdrawal');
        expect(new BigNumber(_userInfo[1]).shiftedBy(-18).toNumber()).to.be.equal(0, 'Expected users[0] reward debt is incorrect');
        //check reward contract lending pool token balance - user 0 has withdrawn all their PDai so should be 0
        const rewardContract_lpBalance = await _PDai.balanceOf(_reward.address);
        expect(Number(rewardContract_lpBalance.toString())).to.be.equal(0, "Invalid balance after mint");
        //check reward contract reward token balance - should not change/decrease
        const rewardContract_afterBalance = await _USDC.balanceOf(_reward.address);
        const user_rewardBalance = await _USDC.balanceOf(users[0]);
        expect(new BigNumber(rewardContract_afterBalance).shiftedBy(-6).toNumber()).to.be.equal(new BigNumber(rewardContract_initialBalance).shiftedBy(-6).toNumber(), "Invalid balance after user deposit");
        //check user lending pool token balance after withdrawal
        _PDai = await PToken.at(_PDai_Address);
        //balance should be 100 PDai withdrawn from reward contract
        // user deposited 250 Dai into lending pool for 250 PDai equivalent then 
        //deposited this into reward contract and withdrew 100 PDai
        expect(new BigNumber(fromBalance).shiftedBy(-18).toNumber()).to.be.equal(100+150, "Invalid balance after withdrawal into reward contract");
        //check user reward token balance for reward allocation checks after withdrawal - should not change
        expect(new BigNumber(user_rewardBalance).shiftedBy(-6).toNumber()).to.be.equal(new BigNumber(initial_user_rewardBalance).shiftedBy(-6).toNumber(), "Invalid balance after user deposit");
        
        const initialBalance = await _USDC.balanceOf(_reward.address);
        //console.log(initialBalance.toString(), 'reward contract closing reward token balance');
        //expect(Number(initialBalance.toString())).to.be.equal(1000000000000, "Invalid balance after mint");
        //await _reward.saferewardTokenTransfer(users[1], '1000000000000');
        ////console.log((await _USDC.balanceOf(_reward.address)).toString(), 'reward contract closing reward token balance after safe transfer');
    });     
    
});  