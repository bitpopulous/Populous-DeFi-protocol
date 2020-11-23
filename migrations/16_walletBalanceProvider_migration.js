// location: contracts/misc
const WalletBalanceProvider = artifacts.require('WalletBalanceProvider');
const LendingPoolAddressesProvider = artifacts.require('LendingPoolAddressesProvider');
module.exports = function (deployer, network, accounts) {
    // Using the accounts within the migrations.
    const [root, alice, bob, carl] = accounts;

    if (network == "development") {
        // Do something specific to the network named "development".
        let _lendingPoolAddressesProvider;
        deployer.then(function(){
            return LendingPoolAddressesProvider.deployed()
            .then(function(instance) {
                _lendingPoolAddressesProvider = instance;
            })
            .then(function() {
                return deployer.deploy(WalletBalanceProvider, _lendingPoolAddressesProvider.address, { gas: 6721975, from: root, overwrite: true});
            });
        });
    } else {
        // Perform a different step otherwise.
        let _lendingPoolAddressesProvider;
        deployer.then(function(){
            return LendingPoolAddressesProvider.deployed()
            .then(function(instance) {
                _lendingPoolAddressesProvider = instance;
            })
            .then(function() {
                return deployer.deploy(WalletBalanceProvider, _lendingPoolAddressesProvider.address, { gas: 6721975, from: root, overwrite: false});
            });
        });
    }
};