const Dai = artifacts.require('Dai');
const USDC = artifacts.require('USDC');

module.exports = function(deployer, network, accounts) {
    // Using the accounts within the migrations.
    const [root, alice, bob, carl] = accounts;

    if (network == "development") {
        // Do something specific to the network named "development".
        deployer.deploy(Dai, {gas: 4612388, from: root});
        deployer.deploy(USDC, {gas: 4612388, from: root});
    } else {
        // Perform a different step otherwise.
    }
};

