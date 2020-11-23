// location: contracts/lendingpool
const LendingPoolDataProvider = artifacts.require('LendingPoolDataProvider');

module.exports = function (deployer, network, accounts) {
    // Using the accounts within the migrations.
    const [root, alice, bob, carl] = accounts;

    if (network == "development") {
        // Do something specific to the network named "development".
        deployer.deploy(LendingPoolDataProvider, { gas: 6721975, from: root, overwrite: true});
    } else {
        // Perform a different step otherwise.
        deployer.deploy(LendingPoolDataProvider, { gas: 6721975, from: root, overwrite: false});

    }
};