// location: contracts/lendingpool
const LendingPoolLiquidationManager = artifacts.require('LendingPoolLiquidationManager');

module.exports = function (deployer, network, accounts) {
    // Using the accounts within the migrations.
    const [root, alice, bob, carl] = accounts;

    if (network == "development") {
        // Do something specific to the network named "development".
        deployer.deploy(LendingPoolLiquidationManager, { gas: 6721975, from: root });
    } else {
        // Perform a different step otherwise.
    }
}