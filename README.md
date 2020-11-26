# Populous DeFi

Ethereum DeFi smart contracts for Populous

## Usage

```
npm i - to install dependencies
npm test - to run truffle tests
```

## Dependencies/Environment Setup

```
Truffle v5.0.0 (core: 5.0.0)
Solidity - 0.5.16 (solc-js)
Node v10.13.0
ganache-cli for local dpeloyment and testing - npm install -g ganache-cli@latest
```

## Invoice finance

Creates a LP for the purchasing of invoices from invoice sellers. Security from the company in form of a charged are tokenised, along with a personal guarantee from the director on his personal assets I.e property into a stable token GBPp. We measure this on a Recourse Loan To Value ‘RLTV’ of 75%

## Reward Tokens

PXT is the reward token of the Populous DeFi platform. The token is distributed every 10,000 blocks to users who deposit stable tokens on the PopDeFi. PXT Not only reiceves income from internal fees generated on the PopDeFi but it can also be staked on the PopEx where ETH is the mining reward for Staking PXT.


## Governance Tokens

PXT is the governance token for the PopDeFi. Wth PXT you are able to participate in voting on key aspects of the PopDeFi such as rates and new strategies which will come into play. PXT also can command income driven from internal fees generated on both the PopDeFi and PIP. PXT can also be state on the PopEx in return for ETH generated from the Populous mining operations.

## Lending and borrowing
Deposit and provide liquidity to the market to earn a passive income. Borrowers are able to borrow at a LTV rate of between 50% to 75% of crypto assets owned.


## Ropsten Test Network deployment with automated smart contract configurations - 18/11/2020

```
infura key/address used - https://ropsten.infura.io/v3/${secret.infuraKey[0]}`, 2
0xC6561dF9180a8863fA9a16aB376eFbca17166CF4

Starting migrations...
======================
> Network name:    'ropsten'
> Network id:      3
> Block gas limit: 8000029

ChainlinkProxyPriceProvider address - 0xA26BBe6700484bF5e3dcC5A9E0d5c484c2bBffD4
PriceOracle address - 0x4085A4cdFe648258DdB59d38655C07c919bA6CD7
asset price for DAI - truffle(ropsten)> await chainLinkInstance.getAssetPrice("0xE5cc501BaD49f4897EC6BFd1f1A4464b8D3C264f")
<BN: de0b6b3a7640000>
de0b6b3a7640000 = 1000000000000000000 (1 ETH)


1_initial_migration.js
======================

   Deploying 'Migrations'
   ----------------------
   > transaction hash:    0x68c61579f2428359a813f6047b21d9b2b28204fdd23a3337383fb2cf6c398175
   > Blocks: 2            Seconds: 28
   > contract address:    0x43DC283a8cBa74d5A09e0155e14CA31703872557
   > account:             0xC6561dF9180a8863fA9a16aB376eFbca17166CF4
   > balance:             8.814713234
   > gas used:            168274
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.003870302 ETH

   > Saving artifacts
   -------------------------------------
   > Total cost:         0.003870302 ETH


2_lendingPoolAddressesProvider_migration.js
===========================================
0xC6561dF9180a8863fA9a16aB376eFbca17166CF4 admin address used for deployment and smart contract configurations

   Re-using deployed 'LendingPoolAddressesProvider'
   ------------------------------------------------
   > contract address:    0xE4C62301abD7cEDC98Dc0fA37DFefA5813A64c10

   -------------------------------------
   > Total cost:                   0 ETH


3_erc20_tokens_migration.js
===========================

   Re-using deployed 'MockDAI'
   ---------------------------
   > contract address:    0xE5cc501BaD49f4897EC6BFd1f1A4464b8D3C264f


   Re-using deployed 'MockUSDC'
   ----------------------------
   > contract address:    0xB1B0dd29beB78692F98f6068e81010d65Cc62D17

   -------------------------------------
   > Total cost:                   0 ETH


4_pTokens_migration.js
======================

   Re-using deployed 'PDai'
   ------------------------
   > contract address:    0x896ECBA9072bc1B4d81a50C01d3F599E82640878


   Re-using deployed 'PUSDC'
   -------------------------
   > contract address:    0x087b1De7714BBcAd1F0b154C627417492C04805A

   -------------------------------------
   > Total cost:                   0 ETH


5_lendingPoolCore_migration.js
==============================

   Re-using deployed 'CoreLibrary'
   -------------------------------
   > contract address:    0x69997f8b15f8fd3fE6b809d865EE3b818C4cB813


   Re-using deployed 'LendingPoolCore'
   -----------------------------------
   > contract address:    0x2882fD747d888f7f04076d65580C5E3349dDE465

   -------------------------------------
   > Total cost:                   0 ETH


6_lendingPool_migration.js
==========================

   Re-using deployed 'LendingPool'
   -------------------------------
   > contract address:    0xf68459085cb11Dfb197278f235eC3969d1606B43

   -------------------------------------
   > Total cost:                   0 ETH


7_feeProvider_migration.js
==========================

   Re-using deployed 'FeeProvider'
   -------------------------------
   > contract address:    0x06800e207521d586F03430F6981F0779A36247b6

   -------------------------------------
   > Total cost:                   0 ETH


8_lendingPoolParametersProvider_migration.js
============================================

   Re-using deployed 'LendingPoolParametersProvider'
   -------------------------------------------------
   > contract address:    0xCd3AF347C65621Ea239386C220F7064FbD227098

   -------------------------------------
   > Total cost:                   0 ETH


9_lendingPoolConfigurator_migration.js
======================================

   Re-using deployed 'LendingPoolConfigurator'
   -------------------------------------------
   > contract address:    0x8fcaB763d4bCE0c2A62a76e2Bf2Dc39D75887510

   -------------------------------------
   > Total cost:                   0 ETH


10_lendingPoolDataProvider_migration.js
=======================================

   Re-using deployed 'LendingPoolDataProvider'
   -------------------------------------------
   > contract address:    0xf365b796e4C1e70D73897bDE5F3Ccb1e5c60b10D

   -------------------------------------
   > Total cost:                   0 ETH


11_priceOracle_migration.js
===========================

   Re-using deployed 'PriceOracle'
   -------------------------------
   > contract address:    0x4085A4cdFe648258DdB59d38655C07c919bA6CD7

   -------------------------------------
   > Total cost:                   0 ETH


12_lendingRateOracle_migration.js
=================================

   Re-using deployed 'LendingRateOracle'
   -------------------------------------
   > contract address:    0xFcD868ca0eBbb2D786Caf1A8A19a08A138b05100

   -------------------------------------
   > Total cost:                   0 ETH


13_lendingPoolLiquidationManager_migration.js
=============================================

   Deploying 'LendingPoolLiquidationManager'
   -----------------------------------------
   > transaction hash:    0x07416aa7f09313a2490085f5d0bad7b9fa82967deb062bf60d15309c71481826
   > Blocks: 1            Seconds: 20
   > contract address:    0xc06410CeA7aC94d864ce31D7DECaCcFFA16179C5
   > account:             0xC6561dF9180a8863fA9a16aB376eFbca17166CF4
   > balance:             8.788727466
   > gas used:            1129816
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.025985768 ETH

   > Saving artifacts
   -------------------------------------
   > Total cost:         0.025985768 ETH


14_tokenDistributor_migration.js
================================

   Deploying 'TokenDistributor'
   ----------------------------
   > transaction hash:    0x0b87d03c211bd78e8af02ca6832a8648bbc86da0472584d680f34acc86535177
   > Blocks: 1            Seconds: 68
   > contract address:    0x7aF86d2fb4798eD796EE162c6eD42148e6A78a47
   > account:             0xC6561dF9180a8863fA9a16aB376eFbca17166CF4
   > balance:             8.75799965
   > gas used:            1335992
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.030727816 ETH

   > Saving artifacts
   -------------------------------------
   > Total cost:         0.030727816 ETH


15_defaultReserveInterestRateStrategy_migration.js
==================================================

   Deploying 'DefaultReserveInterestRateStrategy'
   ----------------------------------------------
   > transaction hash:    0x83e45ffd1efb1a0b025efd2fe80abe1364fadea2f3a39a804c680700782ce514
   > Blocks: 0            Seconds: 4
   > contract address:    0x9F67a019218A3b1A37EcA42135C3E492A96F7D57
   > account:             0xC6561dF9180a8863fA9a16aB376eFbca17166CF4
   > balance:             8.742514923
   > gas used:            673249
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.015484727 ETH

   > Saving artifacts
   -------------------------------------
   > Total cost:         0.015484727 ETH


16_walletBalanceProvider_migration.js
=====================================

   Deploying 'WalletBalanceProvider'
   ---------------------------------
   > transaction hash:    0x38e05ac4fd6e0a34043e06749538d8c2c548ee3dcaab6003d4f94a1d45ffee06
   > Blocks: 1            Seconds: 20
   > contract address:    0x539F1528f7A4bF52CFB780794fBF2fc4bDbFb9F7
   > account:             0xC6561dF9180a8863fA9a16aB376eFbca17166CF4
   > balance:             8.733212021
   > gas used:            404474
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.009302902 ETH

   > Saving artifacts
   -------------------------------------
   > Total cost:         0.009302902 ETH


17_protocolGlobalAddressesRegister_migration.js
===============================================
0xC6561dF9180a8863fA9a16aB376eFbca17166CF4 lending pool manager address
0x51c994d2D17BdA4166b1Ea37045b1CbC56EB04Be fee provider address
0xed5560eA5f2a3d8AbbAc4D54d130Ef6f2e593465 lending pool parameters provider address
0xB1E4F9f16f72968704DCDcE00EC5848B2074aEdD lending pool core address
0x5410fa325E652d5B186884C09606c173e3C69aAb lending pool configurator address
0xb9DeE95305f48c71284A513aeb02FA79894ca719 lending pool data provider address
0x65b8F9EC549400275b647667fa8e0864Bd412cA2 lending pool address
0x4085A4cdFe648258DdB59d38655C07c919bA6CD7 price oracle address
0xFcD868ca0eBbb2D786Caf1A8A19a08A138b05100 lending rate oracle address
0xc06410CeA7aC94d864ce31D7DECaCcFFA16179C5 lending pool liquidation manager address
0x7aF86d2fb4798eD796EE162c6eD42148e6A78a47 token distributor
   -------------------------------------
   > Total cost:                   0 ETH


19_contract_configurations_migration.js
=======================================
0xE5cc501BaD49f4897EC6BFd1f1A4464b8D3C264f DAI address for lending pool
0xbeD9521335Db8604D7406323dCbe775396db0baE PDAI address for lending pool and Populous Reward
   -------------------------------------
   > Total cost:                   0 ETH


20_populousReward_migration.js
==============================
0xB1B0dd29beB78692F98f6068e81010d65Cc62D17 USDC address for reward token

   Deploying 'PopulousReward'
   --------------------------
   > transaction hash:    0x37dbd9213f625be3ced68d3dd296364c52291691a6500e35e9429a3ddd557297
   > Blocks: 0            Seconds: 8
   > contract address:    0xbd1eB2b00568e6E37547F77821b1A048A8582Cf9
   > account:             0xC6561dF9180a8863fA9a16aB376eFbca17166CF4
   > balance:             8.538458279
   > gas used:            1786800
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.0410964 ETH

   > Saving artifacts
   -------------------------------------
   > Total cost:           0.0410964 ETH


Summary
=======
> Total deployments:   2
> Final cost:          0.044966702 ETH
```




## Ethereum (ropsten) test network deployment for Populous DeFi governance smart contracts with automated migrations in specified order - 23/11/2020

```
infura key/address used - https://ropsten.infura.io/v3/${secret.infuraKey[2]}`, 0
0x572fe4180F8dE6F7e4DD68FC6973f27295a8DE4C


Starting migrations...
======================
> Network name:    'ropsten'
> Network id:      3
> Block gas limit: 8000029


1_initial_migration.js
======================

   Deploying 'Migrations'
   ----------------------
   > transaction hash:    0x07ec81380dc61d5700b89461bc3399a6549e43a232da2a0635c26e7ba5dd9be8
   > Blocks: 0            Seconds: 16
   > contract address:    0xb4F7DDcdc8575E6f93E2F71E631D47889B351F29
   > account:             0x572fe4180F8dE6F7e4DD68FC6973f27295a8DE4C
   > balance:             4.486344049
   > gas used:            168274
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.003870302 ETH

   > Saving artifacts
   -------------------------------------
   > Total cost:         0.003870302 ETH


20_governance_migration.js
==========================
0x572fe4180F8dE6F7e4DD68FC6973f27295a8DE4C deployer address
[ '0xDC2BacF976d4a1a97c6F127F2353bcc14aC91159',
  '0xC6561dF9180a8863fA9a16aB376eFbca17166CF4',
  '0x193059505b53c7b666633e0fDebaBBD20f4b2799',
  '0x41483557B201fC3d5674aC61ec94d3915ee36664' ] 'governance council members'

   Deploying 'PopulousPropositionPower'
   ------------------------------------
   > transaction hash:    0xea3c42253d1166e4026154ba5c6dfb301ee00ce7d1f853d5ce954aee8506a8e4
   > Blocks: 0            Seconds: 8
   > contract address:    0x945B09FdB0EF271DDB073ffBb3b4e2e4acA6Ed70
   > account:             0x572fe4180F8dE6F7e4DD68FC6973f27295a8DE4C
   > balance:             4.459306882
   > gas used:            1175529
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.027037167 ETH

0x945B09FdB0EF271DDB073ffBb3b4e2e4acA6Ed70 populous proposition power address

   Deploying 'AssetVotingWeightProvider'
   -------------------------------------
   > transaction hash:    0xd358fadd7f656ceb0989d3f1f0f208c87c39833b909da666584df5b48e0e45f8
   > Blocks: 0            Seconds: 4
   > contract address:    0x2385b23eAdF0A77aCE272670D5171818377B59d0
   > account:             0x572fe4180F8dE6F7e4DD68FC6973f27295a8DE4C
   > balance:             4.450759507
   > gas used:            371625
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.008547375 ETH

0x2385b23eAdF0A77aCE272670D5171818377B59d0 asset voitng weight provider address

   Deploying 'GovernanceParamsProvider'
   ------------------------------------
   > transaction hash:    0x5b30998d74cd12b463693c6dbffb757f07159240983bd19b8c2b10aa7ef8983a
   > Blocks: 2            Seconds: 52
   > contract address:    0xd3e61e9D039657a7778df5b7bb85f062f63D0a56
   > account:             0x572fe4180F8dE6F7e4DD68FC6973f27295a8DE4C
   > balance:             4.439857714
   > gas used:            473991
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.010901793 ETH

0xd3e61e9D039657a7778df5b7bb85f062f63D0a56 governance params provider address

   Deploying 'PopulousProtoGovernance'
   -----------------------------------
   > transaction hash:    0x703486390eb151d0709ce0a1a0fc85046cca2718182f7cc2a33b442eae2a7324
   > Blocks: 1            Seconds: 8
   > contract address:    0x728aD72B79f5092b6b25595837e3Bb73Be953323
   > account:             0x572fe4180F8dE6F7e4DD68FC6973f27295a8DE4C
   > balance:             4.385964045
   > gas used:            2343203
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.053893669 ETH

0x728aD72B79f5092b6b25595837e3Bb73Be953323 populous proto governance address
   > Saving artifacts
   -------------------------------------
   > Total cost:         0.100380004 ETH


Summary
=======
> Total deployments:   5
> Final cost:          0.104250306 ETH
```
