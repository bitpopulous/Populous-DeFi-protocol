// location: contracts/lendingpool
const LendingPool = artifacts.require('LendingPool');
// const LendingPoolCore = artifacts.require('LendingPoolCore');

module.exports = function(deployer, network, accounts) {
    // Using the accounts within the migrations.
    const [root, alice, bob, carl] = accounts;

    if (network == "development") {
        // Do something specific to the network named "development".

        /* 
        Note: set lendingPoolCore address in lendingPool 
        using initialize function
        */
        deployer.deploy(LendingPool, {gas: 4612388, from: root});
    } else {
        // Perform a different step otherwise.
    }
} ;