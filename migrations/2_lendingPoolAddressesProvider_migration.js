// location: contracts/configuration
const LendingPoolAddressesProvider = artifacts.require('LendingPoolAddressesProvider');

module.exports = function(deployer, network, accounts) {
    // Using the accounts within the migrations.
    const [root, alice, bob, carl] = accounts;

    if (network == "development") {
        // Do something specific to the network named "development".
        deployer.deploy(LendingPoolAddressesProvider, {gas: 6721975, from: root, overwrite: true});
        console.log(root, 'admin address');
    } else {
        // Perform a different step otherwise.
        // Do something specific to the network named "development".
        deployer.deploy(LendingPoolAddressesProvider, {gas: 6721975, from: root, overwrite: false});
        console.log(root, 'admin address');
    }
};