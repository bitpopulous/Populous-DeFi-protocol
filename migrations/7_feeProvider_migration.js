// location: contracts/fees
const FeeProvider = artifacts.require('FeeProvider');

module.exports = function (deployer, network, accounts) {
    // Using the accounts within the migrations.
    const [root, alice, bob, carl] = accounts;

    if (network == "development") {
        // Do something specific to the network named "development".
        deployer.deploy(FeeProvider, { gas: 4612388, from: root });
    } else {
        // Perform a different step otherwise.
    }
};