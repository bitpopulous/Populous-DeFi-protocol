// location: contracts/mocks
const LendingRateOracle = artifacts.require('LendingRateOracle');

module.exports = function (deployer, network, accounts) {
    // Using the accounts within the migrations.
    const [root, alice, bob, carl] = accounts;

    if (network == "development") {
        // Do something specific to the network named "development".
        deployer.deploy(LendingRateOracle, { gas: 6721975, from: root, overwrite: true });
    } else {
        // Perform a different step otherwise.
        deployer.deploy(LendingRateOracle, { gas: 6721975, from: root, overwrite: false });
    }
};

