// location: contracts/fees
const TokenDistributor = artifacts.require('TokenDistributor');

module.exports = function (deployer, network, accounts) {
    // Using the accounts within the migrations.
    const [root, alice, bob, carl] = accounts;

    if (network == "development") {
        // Do something specific to the network named "development".
        deployer.deploy(TokenDistributor, { gas: 6721975, from: root });
    } else {
        // Perform a different step otherwise.
    }
}