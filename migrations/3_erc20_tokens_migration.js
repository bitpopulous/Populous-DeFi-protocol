const Dai = artifacts.require('MockDAI');
const USDC = artifacts.require('MockUSDC');

module.exports = function(deployer, network, accounts) {
    // Using the accounts within the migrations.
    const [root, alice, bob, carl] = accounts;

    if (network == "development") {
        // Do something specific to the network named "development".
        deployer.deploy(Dai, {gas: 4612388, from: root, overwrite: true});
        deployer.deploy(USDC, {gas: 4612388, from: root, overwrite: true});
        
    } else {
        // Perform a different step otherwise.
        deployer.deploy(Dai, {gas: 4612388, from: root, overwrite: false});
        deployer.deploy(USDC, {gas: 4612388, from: root, overwrite: false});
    }
};

