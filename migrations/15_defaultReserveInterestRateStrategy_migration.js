// location: contracts/lendingpool
const DefaultReserveInterestRateStrategy = artifacts.require('DefaultReserveInterestRateStrategy');
const Dai = artifacts.require('MockDAI');
const LendingPoolAddressesProvider = artifacts.require('LendingPoolAddressesProvider');


module.exports = function (deployer, network, accounts) {
    // Using the accounts within the migrations.
    const [root, alice, bob, carl] = accounts;

    if (network == "development") {
        // Do something specific to the network named "development".

        /* Solidity WadRayMath.sol library guide
        * wads (decimal numbers with 18 digits precision) and rays (decimals with 27 digits)
        */
        /* DefaultReserveInterestRateStrategy field variables
        * uint256 public constant EXCESS_UTILIZATION_RATE = 0.2 * 1e27;
        * uint256 public constant OPTIMAL_UTILIZATION_RATE = 0.8 * 1e27;
        */
       
        //Constructor Parameters
        //ERC-20 token address
        let _reserve;
        let _lendingPoolAddressesProvider;
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
        deployer.then(function(){
            return LendingPoolAddressesProvider.deployed()
            .then(function(instance) {
                _lendingPoolAddressesProvider = instance;
            })
            .then(function() {
            return Dai.deployed()
            })
            .then(function(instance) {
                _reserve = instance;
                //add deployed Dai instance to PDai
                return deployer.deploy(DefaultReserveInterestRateStrategy, _reserve.address, _lendingPoolAddressesProvider.address, _baseVariableBorrowRate, _variableRateSlope1, _variableRateSlope2, _stableRateSlope1, _stableRateSlope2, {gas: 6721975, from: root, overwrite: true});
            });
        });
        
    } else {
        // Perform a different step otherwise.
        /* Solidity WadRayMath.sol library guide
        * wads (decimal numbers with 18 digits precision) and rays (decimals with 27 digits)
        */
        /* DefaultReserveInterestRateStrategy field variables
        * uint256 public constant EXCESS_UTILIZATION_RATE = 0.2 * 1e27;
        * uint256 public constant OPTIMAL_UTILIZATION_RATE = 0.8 * 1e27;
        */
       
        //Constructor Parameters
        //ERC-20 token address
        let _reserve;
        let _lendingPoolAddressesProvider;
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
        deployer.then(function(){
            return LendingPoolAddressesProvider.deployed()
            .then(function(instance) {
                _lendingPoolAddressesProvider = instance;
            })
            .then(function() {
            return Dai.deployed()
            })
            .then(function(instance) {
                _reserve = instance;
                //add deployed Dai instance to PDai
                return deployer.deploy(DefaultReserveInterestRateStrategy, _reserve.address, _lendingPoolAddressesProvider.address, _baseVariableBorrowRate, _variableRateSlope1, _variableRateSlope2, _stableRateSlope1, _stableRateSlope2, {gas: 6721975, from: root, overwrite: false});
            });
        });
        
    }
} ;