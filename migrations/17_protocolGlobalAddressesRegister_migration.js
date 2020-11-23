
/*From the documentation:
LendingPoolAddressesProvider is the Global addresses register of the protocol. 
This contract is immutable and the address will never change. 
This contract must be used to fetch the address of the 
latest implementation of the LendingPool contract.
The following addresses can be added / modified:
LendingPool contract,
LendingPoolCore contract,
LendingPoolParametersProvider contract,
LendingPoolManager multisig contract address,
LendingPoolConfigurator contract,
LendingPoolLiquidationManager contract,
LendingPoolDataProvider contract
PriceOracle contract,
LendingRateOracle contract,
FeeProvider contract,
TokenDistributor contract,
The mock Ethereum address used to represent ETH in the protocol. */

// location: contracts/configuration
const LendingPoolAddressesProvider = artifacts.require('LendingPoolAddressesProvider');
const LendingPool = artifacts.require('LendingPool');
const LendingPoolCore = artifacts.require('LendingPoolCore');
const LendingPoolParametersProvider = artifacts.require('LendingPoolParametersProvider');
// const LendingPoolManager = is admin user/wallet
const LendingPoolConfigurator = artifacts.require('LendingPoolConfigurator');
const LendingPoolLiquidationManager = artifacts.require('LendingPoolLiquidationManager');
const LendingPoolDataProvider = artifacts.require('LendingPoolDataProvider');
const PriceOracle = artifacts.require('PriceOracle');
const LendingRateOracle = artifacts.require('LendingRateOracle');
const FeeProvider = artifacts.require('FeeProvider');
const TokenDistributor = artifacts.require('TokenDistributor');

module.exports = function (deployer, network, accounts) {
    // Using the accounts within the migrations.
    const [root, alice, bob, carl] = accounts;

    if (network == "development") {
        // Do something specific to the network named "development".

        // using async/await
        deployer.then(async () => {

            let
                _lendingPool = await LendingPool.deployed(),
                _lendingPoolCore = await LendingPoolCore.deployed(),
                _lendingPoolParametersProvider = await LendingPoolParametersProvider.deployed(),
                _lendingPoolManager = root,
                _lendingPoolConfigurator = await LendingPoolConfigurator.deployed(),
                _lendingPoolLiquidationManager = await LendingPoolLiquidationManager.deployed(),
                _lendingPoolDataProvider = await LendingPoolDataProvider.deployed(),
                _priceOracle = await PriceOracle.deployed(),
                _lendingRateOracle = await LendingRateOracle.deployed(),
                _feeProvider = await FeeProvider.deployed(),
                _tokenDistributor = await TokenDistributor.deployed(),
                _lendingPoolAddressesProvider = await LendingPoolAddressesProvider.deployed();


            return Promise.all([
                /** 
                 * the smart contracts have to be set in this order for things to function 
                 */
                _lendingPoolAddressesProvider.setLendingPoolManager(_lendingPoolManager),
                _lendingPoolAddressesProvider.setFeeProviderImpl(_feeProvider.address),
                _lendingPoolAddressesProvider.setLendingPoolParametersProviderImpl(_lendingPoolParametersProvider.address),
                _lendingPoolAddressesProvider.setLendingPoolCoreImpl(_lendingPoolCore.address),
                _lendingPoolAddressesProvider.setLendingPoolConfiguratorImpl(_lendingPoolConfigurator.address),
                _lendingPoolAddressesProvider.setLendingPoolDataProviderImpl(_lendingPoolDataProvider.address),
                _lendingPoolAddressesProvider.setLendingPoolImpl(_lendingPool.address),
                _lendingPoolAddressesProvider.setPriceOracle(_priceOracle.address),
                _lendingPoolAddressesProvider.setLendingRateOracle(_lendingRateOracle.address),
                _lendingPoolAddressesProvider.setLendingPoolLiquidationManager(_lendingPoolLiquidationManager.address),
                _lendingPoolAddressesProvider.setTokenDistributor(_tokenDistributor.address),
                console.log(await _lendingPoolAddressesProvider.owner(), 'lending pool addresses provider owner'),
                console.log(await _lendingPoolAddressesProvider.getLendingPoolManager(), 'lending pool manager address'),
                console.log(await _lendingPoolAddressesProvider.getFeeProvider(), 'fee provider address'),
                console.log(await _lendingPoolAddressesProvider.getLendingPoolParametersProvider(), 'lending pool parameters provider address'),
                console.log(await _lendingPoolAddressesProvider.getLendingPoolCore(), 'lending pool core address'),
                console.log(await _lendingPoolAddressesProvider.getLendingPoolConfigurator(), 'lending pool configurator address'),
                console.log(await _lendingPoolAddressesProvider.getLendingPoolDataProvider(), 'lending pool data provider address'),
                console.log(await _lendingPoolAddressesProvider.getLendingPool(), 'lending pool address'),
                console.log(await _lendingPoolAddressesProvider.getPriceOracle(), 'price oracle address'),
                console.log(await _lendingPoolAddressesProvider.getLendingRateOracle(), 'lending rate oracle address'),
                console.log(await _lendingPoolAddressesProvider.getLendingPoolLiquidationManager(), 'lending pool liquidation manager address'),
                console.log(await _lendingPoolAddressesProvider.getTokenDistributor(), 'token distributor'),

            ])
            //.then(function (results) {
                //console.log(results);
                //console.log(results.length);
            //});

        });
    } else {
        // Perform a different step otherwise.
        deployer.then(async () => {

            let 
            _lendingPool = await LendingPool.deployed(),
            _lendingPoolCore = await LendingPoolCore.deployed(),
            _lendingPoolParametersProvider = await LendingPoolParametersProvider.deployed(),
            _lendingPoolManager = root,
            _lendingPoolConfigurator = await LendingPoolConfigurator.deployed(),
            _lendingPoolLiquidationManager = await LendingPoolLiquidationManager.deployed(),
            _lendingPoolDataProvider = await LendingPoolDataProvider.deployed(),
            _priceOracle = await PriceOracle.deployed(),
            _lendingRateOracle = await LendingRateOracle.deployed(),
            _feeProvider = await FeeProvider.deployed(),
            _tokenDistributor = await TokenDistributor.deployed(),
            _lendingPoolAddressesProvider = await LendingPoolAddressesProvider.deployed();
            /** 
             * the smart contracts have to be set in this order for things to function 
             */
            console.log(await _lendingPoolAddressesProvider.owner(), 'lending pool addresses provider owner');
            await _lendingPoolAddressesProvider.setLendingPoolManager(_lendingPoolManager, {from: root});
            await _lendingPoolAddressesProvider.setFeeProviderImpl(_feeProvider.address, {from: root});
            await _lendingPoolAddressesProvider.setLendingPoolParametersProviderImpl(_lendingPoolParametersProvider.address, {from: root});
            await _lendingPoolAddressesProvider.setLendingPoolCoreImpl(_lendingPoolCore.address, {from: root});
            await _lendingPoolAddressesProvider.setLendingPoolConfiguratorImpl(_lendingPoolConfigurator.address, {from: root});
            await _lendingPoolAddressesProvider.setLendingPoolDataProviderImpl(_lendingPoolDataProvider.address, {from: root});
            await _lendingPoolAddressesProvider.setLendingPoolImpl(_lendingPool.address, {from: root});
            await _lendingPoolAddressesProvider.setPriceOracle(_priceOracle.address, {from: root});
            await _lendingPoolAddressesProvider.setLendingRateOracle(_lendingRateOracle.address, {from: root});
            await _lendingPoolAddressesProvider.setLendingPoolLiquidationManager(_lendingPoolLiquidationManager.address, {from: root});
            await _lendingPoolAddressesProvider.setTokenDistributor(_tokenDistributor.address, {from: root});
                
            console.log(await _lendingPoolAddressesProvider.getLendingPoolManager(), 'lending pool manager address');
            console.log(await _lendingPoolAddressesProvider.getFeeProvider(), 'fee provider address');
            console.log(await _lendingPoolAddressesProvider.getLendingPoolParametersProvider(), 'lending pool parameters provider address');
            console.log(await _lendingPoolAddressesProvider.getLendingPoolCore(), 'lending pool core address');
            console.log(await _lendingPoolAddressesProvider.getLendingPoolConfigurator(), 'lending pool configurator address');
            console.log(await _lendingPoolAddressesProvider.getLendingPoolDataProvider(), 'lending pool data provider address');
            console.log(await _lendingPoolAddressesProvider.getLendingPool(), 'lending pool address');
            console.log(await _lendingPoolAddressesProvider.getPriceOracle(), 'price oracle address');
            console.log(await _lendingPoolAddressesProvider.getLendingRateOracle(), 'lending rate oracle address');
            console.log(await _lendingPoolAddressesProvider.getLendingPoolLiquidationManager(), 'lending pool liquidation manager address');
            console.log(await _lendingPoolAddressesProvider.getTokenDistributor(), 'token distributor');
        }); 
    }
};