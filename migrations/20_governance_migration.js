const LendingPoolAddressesProvider = artifacts.require('LendingPoolAddressesProvider');
const PopulousReward = artifacts.require('PopulousReward');
const LendingPoolCore = artifacts.require('LendingPoolCore');
const Dai = artifacts.require('MockDAI');
const USDC = artifacts.require('MockUSDC');
//governance
const PopulousPropositionPower = artifacts.require('PopulousPropositionPower');
const AssetVotingWeightProvider = artifacts.require('AssetVotingWeightProvider');
const GovernanceParamsProvider = artifacts.require('GovernanceParamsProvider');
const PopulousProtoGovernance = artifacts.require('PopulousProtoGovernance');


module.exports = function (deployer, network, accounts) {
    // Using the accounts within the migrations.
    const [root, alice, bob, carl] = accounts;


    if (network == "development" ) {
        // Do something specific to the network named "development".

        deployer.then(async () => {
            /** 
             * the smart contracts have to be deployed in this order for things to function 
             */
            let _PopulousPropositionPower, _AssetVotingWeightProvider, 
            _GovernanceParamsProvider, _PopulousProtoGovernance;
            //deploy PopulousPropositionPower/governance tokens - Asset to control the permissions on the actions in PopulousProtoGovernance, like: Register a new Proposal
            const populousPropositionPowerName = "Populous Proposition Power";
            const populousPropositionPowerSymbol = "PPP";
            const populousPropositionPowerDecimals = 18;
            const cap = 3; // cap == council.length
            const council = [alice, bob, carl];
            // name Asset name
            //  symbol Asset symbol
            //  decimals Asset decimals
            //  council List of addresses which will receive tokens initially
            //  cap The cap of tokens to mint, length of the council list
            await deployer.deploy(PopulousPropositionPower, populousPropositionPowerName, populousPropositionPowerSymbol, 
                populousPropositionPowerDecimals, council, cap, { gas: 6721975, from: root, overwrite: true});
            _PopulousPropositionPower = await PopulousPropositionPower.deployed();
            //deploy AssetVotingWeightProvider
            //  _assets Dynamic array of asset addresses
            //  _weights Dynamic array of asset weights, for each one of _assets
            let _DAI = await Dai.deployed();
            let _UDSC = await USDC.deployed();
            await deployer.deploy(AssetVotingWeightProvider, [_DAI.address, _UDSC.address], ["100", "50"], { gas: 6721975, from: root, overwrite: true});
            _AssetVotingWeightProvider = await AssetVotingWeightProvider.deployed();
            //deploy GovernanceParamsProvider
            //uint256 _propositionPowerThreshold,
            // _propositionPower,
            // IAssetVotingWeightProvider _assetVotingWeightProvider
            const _propositionPowerThreshold = 3;
            await deployer.deploy(GovernanceParamsProvider, _propositionPowerThreshold, _PopulousPropositionPower.address, _AssetVotingWeightProvider.address, { gas: 6721975, from: root, overwrite: true});
            _GovernanceParamsProvider = await GovernanceParamsProvider.deployed();
            //deploy PopulousProtoGovernance
            await deployer.deploy(PopulousProtoGovernance, _GovernanceParamsProvider.address, { gas: 6721975, from: root, overwrite: true});
            _PopulousProtoGovernance = await PopulousProtoGovernance.deployed();

        });
    } else {
        deployer.then(async () => {
            /** 
             * the smart contracts have to be deployed in this order for things to function 
             */
            let _PopulousPropositionPower, _AssetVotingWeightProvider, 
            _GovernanceParamsProvider, _PopulousProtoGovernance;
            //deploy PopulousPropositionPower/governance tokens - Asset to control the permissions on the actions in PopulousProtoGovernance, like: Register a new Proposal
            const populousPropositionPowerName = "Populous Proposition Power";
            const populousPropositionPowerSymbol = "PPP";
            const populousPropositionPowerDecimals = 18;
            const cap = 3; // cap == council.length
            const council = [alice, bob, carl];
            // name Asset name
            //  symbol Asset symbol
            //  decimals Asset decimals
            //  council List of addresses which will receive tokens initially
            //  cap The cap of tokens to mint, length of the council list
            await deployer.deploy(PopulousPropositionPower, populousPropositionPowerName, populousPropositionPowerSymbol, 
                populousPropositionPowerDecimals, council, cap, { gas: 6721975, from: root, overwrite: false});
            _PopulousPropositionPower = await PopulousPropositionPower.deployed();
            //deploy AssetVotingWeightProvider
            //  _assets Dynamic array of asset addresses
            //  _weights Dynamic array of asset weights, for each one of _assets
            let _DAI = await Dai.deployed();
            let _UDSC = await USDC.deployed();
            await deployer.deploy(AssetVotingWeightProvider, [_DAI.address, _UDSC.address], ["100", "50"], { gas: 6721975, from: root, overwrite: false});
            _AssetVotingWeightProvider = await AssetVotingWeightProvider.deployed();
            //deploy GovernanceParamsProvider
            //uint256 _propositionPowerThreshold,
            // _propositionPower,
            // IAssetVotingWeightProvider _assetVotingWeightProvider
            const _propositionPowerThreshold = 3;
            await deployer.deploy(GovernanceParamsProvider, _propositionPowerThreshold, _PopulousPropositionPower.address, _AssetVotingWeightProvider.address, { gas: 6721975, from: root, overwrite: false});
            _GovernanceParamsProvider = await GovernanceParamsProvider.deployed();
            //deploy PopulousProtoGovernance
            await deployer.deploy(PopulousProtoGovernance, _GovernanceParamsProvider.address, { gas: 6721975, from: root, overwrite: false});
            _PopulousProtoGovernance = await PopulousProtoGovernance.deployed();

        });
    }
};