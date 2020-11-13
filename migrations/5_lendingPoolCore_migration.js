// location: contracts/lendingpool
const LendingPoolCore = artifacts.require('LendingPoolCore');
const CoreLibrary = artifacts.require('CoreLibrary');
// CoreLibrary needs to be deployed and linked as it contains external functions
// https://medium.com/coinmonks/all-you-should-know-about-libraries-in-solidity-dd8bc953eae7


module.exports = function(deployer, network, accounts) {
    // Using the accounts within the migrations.
    const [root, alice, bob, carl] = accounts;


    if (network == "development") {
        // Do something specific to the network named "development".
        // Deploy library CoreLibrary, then link CoreLibrary to contract LendingPoolCore, then deploy LendingPoolCore.
        deployer.deploy(CoreLibrary, {gas: 6721975, from: root});
        deployer.link(CoreLibrary, LendingPoolCore);
        deployer.deploy(LendingPoolCore, {gas: 6721975, from: root});
    } else {
        // Perform a different step otherwise.
    }
}