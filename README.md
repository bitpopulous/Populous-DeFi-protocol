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

PPT is the governance token for the PopDeFi. Wth PPT you are able to participate in voting on key aspects of the PopDeFi such as rates and new strategies which will come into play. PPT also can command income driven from internal fees generated on both the PopDeFi and PIP. PPT can also be state on the PopEx in return for ETH generated from the Populous mining operations.

## Lending and borrowing -- pending



## Ethereum (ropsten) test network deployment for Populous DeFi lending pool and reward smart contracts with automated migration scripts in required order - 18/11/2020

```
infura key/address used - https://ropsten.infura.io/v3/${secret.infuraKey[0]}`, 2
0xC6561dF9180a8863fA9a16aB376eFbca17166CF4

Starting migrations...
======================
> Network name:    'ropsten'
> Network id:      3
> Block gas limit: 8000029


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
0xE5cc501BaD49f4897EC6BFd1f1A4464b8D3C264f DAI token address for lending pool
0xbeD9521335Db8604D7406323dCbe775396db0baE PDAI token address for lending pool and Populous Reward
   -------------------------------------
   > Total cost:                   0 ETH


20_populousReward_migration.js
==============================
0xB1B0dd29beB78692F98f6068e81010d65Cc62D17 USDC address for reward token

   Deploying 'PopulousReward'
   --------------------------
   > transaction hash:    0x37dbd9213f625be3ced68d3dd296364c52291691a6500e35e9429a3ddd557297
   > Blocks: 0            Seconds: 8
   > contract address:    0x8321f488eab884Ffc5575928217634AE9f72EbfD
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



ChainlinkProxyPriceProvider address - 0xA26BBe6700484bF5e3dcC5A9E0d5c484c2bBffD4
SetPriceOracle in LendingPoolAddressesProvider TX - https://ropsten.etherscan.io/tx/0x72d756572230adc961a12effeb6ca998f35d9619f015d32010c7e516deca1cd7
PriceOracle address - 0x4085A4cdFe648258DdB59d38655C07c919bA6CD7
asset price for DAI - truffle(ropsten)> await chainLinkInstance.getAssetPrice("0xE5cc501BaD49f4897EC6BFd1f1A4464b8D3C264f")
<BN: de0b6b3a7640000>
de0b6b3a7640000 = 1000000000000000000 (1 ETH)

LendingPool upgrade
lpV2 address: 0xf68459085cb11Dfb197278f235eC3969d1606B43
lpV3 address: 0x4bED3413455F653cB8Ec62c5089A7ed2A5695EDA

lending pool (proxy) address - 0x65b8F9EC549400275b647667fa8e0864Bd412cA2
lending pool addresses provider - 0xE4C62301abD7cEDC98Dc0fA37DFefA5813A64c10

NEW RESERVE
tusd token address - 0xD35e9aaC33BeE9c35504C49Aacb1f3197521c6BB - decimals 18
truffle(ropsten)> await _poolConfigInstance.initReserve(tusd.address, '18', '0x9F67a019218A3b1A37EcA42135C3E492A96F7D57')
await _poolConfigInstance.refreshLendingPoolCoreConfiguration()
pr = await IPriceOracle.at('0x4085A4cdFe648258DdB59d38655C07c919bA6CD7')
await pr.setAssetPrice('0xD35e9aaC33BeE9c35504C49Aacb1f3197521c6BB', '1000000000000000000')
chainLinkInstance = await ChainlinkProxyPriceProvider.at('0xA26BBe6700484bF5e3dcC5A9E0d5c484c2bBffD4')
truffle(ropsten)> await chainLinkInstance.getAssetPrice(tusd.address)
<BN: de0b6b3a7640000>
await tusd.transfer('0x2dDcDa68A63aBAe2E0a7722A22D3F5472E9dB10c', '1000000000000000000000000000')
truffle(ropsten)> await _poolConfigInstance.enableBorrowingOnReserve(tusd.address, true)
tx:
   '0x403c2dbf4776bcb9be8b2922ef91c2eb4351807d53dce718daaacbb11a92e96d',
```




## Ethereum (ropsten) test network deployment for Populous DeFi governance smart contracts with automated migration scripts in required order - 23/11/2020

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



## Ethereum (ropsten) test network upgrades to version 5 and Mock ERC20 tokens/reserves - 10/12/2020
```
infura key/address used - https://ropsten.infura.io/v3/${secret.infuraKey[0]}`, 2
0xC6561dF9180a8863fA9a16aB376eFbca17166CF4

0xE5cc501BaD49f4897EC6BFd1f1A4464b8D3C264f DAI
0xB1B0dd29beB78692F98f6068e81010d65Cc62D17 USDC 
MockPXT 0x72C770aB6CA28114504255C6b5b2e67f9a4749DA
MockPPT 0x350E7A260B584e24c04ac2ba682fa568D59c7829
MockTUSD 0xD35e9aaC33BeE9c35504C49Aacb1f3197521c6BB

> Network name:    'ropsten'
> Network id:      3
> Block gas limit: 8000029


1_initial_migration.js
======================

   Deploying 'Migrations'
   ----------------------
   > transaction hash:    0x7d6064193f28d226e5c5aec8f9d0a82b048e844685c8d75dc3046a554765a50e
   > Blocks: 1            Seconds: 32
   > contract address:    0x2FA47E9c20D726cfe270489edF547023c249C9b3
   > account:             0xC6561dF9180a8863fA9a16aB376eFbca17166CF4
   > balance:             10.761002891
   > gas used:            168274
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.003870302 ETH

   > Saving artifacts
   -------------------------------------
   > Total cost:         0.003870302 ETH



3_erc20_tokens_migration.js
===========================


   Deploying 'MockPXT'
   -------------------
   > transaction hash:    0x023b183aebf6566bcd2011bb2d469798a50788ee46590bc1a71304c143c34a42
   > Blocks: 0            Seconds: 28
   > contract address:    0x72C770aB6CA28114504255C6b5b2e67f9a4749DA
   > account:             0xC6561dF9180a8863fA9a16aB376eFbca17166CF4
   > balance:             10.674693689
   > gas used:            728223
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.016749129 ETH


   Deploying 'MockPPT'
   -------------------
   > transaction hash:    0x8317195148d4ce0e2ba0488c085174c60ab7ee288330383f5c50afcd92a231c0
   > Blocks: 1            Seconds: 24
   > contract address:    0x350E7A260B584e24c04ac2ba682fa568D59c7829
   > account:             0xC6561dF9180a8863fA9a16aB376eFbca17166CF4
   > balance:             10.657944836
   > gas used:            728211
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.016748853 ETH


   Deploying 'MockTUSD'
   --------------------
   > transaction hash:    0x6024fbbc60a7a3e332f3c1c4d8df65ba929acd34f1d6133ad6ce3d44a3b99099
   > Blocks: 2            Seconds: 40
   > contract address:    0xa2c379F86D8a860E7fBe6cCDfb290cd3A53A3902
   > account:             0xC6561dF9180a8863fA9a16aB376eFbca17166CF4
   > balance:             10.641194741
   > gas used:            728265
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.016750095 ETH

   > Saving artifacts
   -------------------------------------
   > Total cost:         0.083747669 ETH


4_pTokens_migration.js
======================
   -------------------------------------
   > Total cost:                   0 ETH



0xE4C62301abD7cEDC98Dc0fA37DFefA5813A64c10 lending pool addresses provider address
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



UPGRADES TO VERSION 5
============================
acc = await web3.eth.getAccounts()

admin = "0xC6561dF9180a8863fA9a16aB376eFbca17166CF4"

lpa = await LendingPoolAddressesProvider.at('0xE4C62301abD7cEDC98Dc0fA37DFefA5813A64c10')

tf = await TestFaucet.new()
'0x8180570bbccFa65F4Fa60A8DDf3A71bB9365864a' //50k max tokens

lp = await LendingPool.new()
lp.address
'0x4010Be267B656B300B0a9f86aC16F75C0e47165C'

lpc = await LendingPoolConfigurator.new()
lpc.address
'0xFb1873C507705322EB576564EB8f66EA6E0a787c'

lpd = await LendingPoolDataProvider.new()
lpd.address
'0x6F078b1E5E60260b2eA1168E83588B325d60718b'

//usdc, gbp, ppt, tusd, pax
usdc = await MockUSDC.at('0xB1B0dd29beB78692F98f6068e81010d65Cc62D17')

dai = await MockDAI.at('0xE5cc501BaD49f4897EC6BFd1f1A4464b8D3C264f')

gbp = await MockGBP.at('0xB30970F01A8a452b8D8CA099Afaf73B5aA5A090B')

pxt = await MockPXT.at('0x72C770aB6CA28114504255C6b5b2e67f9a4749DA')

ppt = await MockPPT.at('0x350E7A260B584e24c04ac2ba682fa568D59c7829')

tusd = await MockTUSD.at('0xD35e9aaC33BeE9c35504C49Aacb1f3197521c6BB')

pax = await MockPAX.new()

pax.decimals()
<BN: 12>
pax.symbol()
'PAX'
pax.name()
'PAX'
pax.address
'0x34FD39B364AFd7B2cE88316bf9b29598794FbA51'
truffle(ropsten)> pax = await MockPAX.at('0x34FD39B364AFd7B2cE88316bf9b29598794FbA51')

//set token prices in ETH
truffle(ropsten)> chainlink = await lpa.getPriceOracle()
truffle(ropsten)> chainlink
'0xA26BBe6700484bF5e3dcC5A9E0d5c484c2bBffD4'
truffle(ropsten)> chainlinkOracle = await ChainlinkProxyPriceProvider.at('0xA26BBe6700484bF5e3dcC5A9E0d5c484c2bBffD4')

truffle(ropsten)> chainlinkOracle.getFallbackOracle()
'0x4085A4cdFe648258DdB59d38655C07c919bA6CD7'
truffle(ropsten)> fallbackOracle = await PriceOracle.at('0x4085A4cdFe648258DdB59d38655C07c919bA6CD7')
example in migration 18: truffle(ropsten)> fallbackOracle.setAssetPrice(pax.address, "1629670000000000")

//set token market borrow rates 
truffle(ropsten)> lpa.getLendingRateOracle()
truffle(ropsten)> marketRateOracle = await LendingRateOracle.at('0xFcD868ca0eBbb2D786Caf1A8A19a08A138b05100')
example in migration 12: truffle(ropsten)> marketRateOracle.setMarketBorrowRate(pax.address, "30000000000000000000000000")

//set PAX as invoice lending pool address
//set GBP as invoice lending pool collateral address 
truffle(ropsten)> await lpc.setTokenAddress(web3.utils.fromAscii("GBP"), gbp.address)

truffle(ropsten)> await lpc.enableReserveForInvoicePool(pax.address, true)

truffle(ropsten)> lpc.isReserveEnabledForInvoicePool(pax.address)
true
truffle(ropsten)> lpc.getCollateralTokenAddressStatus(gbp.address)
true

lpa = await LendingPoolAddressesProvider.at('0xE4C62301abD7cEDC98Dc0fA37DFefA5813A64c10')
lp = await LendingPool.new()
lpc = await LendingPoolConfigurator.new()
lpd = await LendingPoolDataProvider.new()

//lending pool upgrade
truffle(ropsten)> await lpa.setLendingPoolImpl(lp4.address, {from:admin})
{ tx:
   '',

ETHEREUM_ADDRESS = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"

//init reserves and enable for borrowing and as collateral, example in migration 18:
truffle(ropsten)> lpa.getLendingPoolConfigurator()
'0x5410fa325E652d5B186884C09606c173e3C69aAb'
truffle(ropsten)> lpc = await LendingPoolConfigurator.at('0x5410fa325E652d5B186884C09606c173e3C69aAb')
truffle(ropsten)> core = await LendingPoolCore.at('0xB1E4F9f16f72968704DCDcE00EC5848B2074aEdD')
truffle(ropsten)> core.getReserveInterestRateStrategyAddress(dai.address)
'0x9F67a019218A3b1A37EcA42135C3E492A96F7D57'
truffle(ropsten)> core.getReserveInterestRateStrategyAddress(usdc.address)
'0x9F67a019218A3b1A37EcA42135C3E492A96F7D57'

await lpc.initReserve(pxt.address, '8', '0x9F67a019218A3b1A37EcA42135C3E492A96F7D57')
await lpc.initReserve(ppt.address, '8', '0x9F67a019218A3b1A37EcA42135C3E492A96F7D57')
await lpc.initReserve(tusd.address, '18', '0x9F67a019218A3b1A37EcA42135C3E492A96F7D57')
await lpc.initReserve(pax.address, '18', '0x9F67a019218A3b1A37EcA42135C3E492A96F7D57')
await lpc.initReserve(gbp.address, '8', '0x9F67a019218A3b1A37EcA42135C3E492A96F7D57')
await lpc.initReserve(ETHEREUM_ADDRESS, '18', '0x9F67a019218A3b1A37EcA42135C3E492A96F7D57')

//enableReserveAsCollateral example in migration 22
await lpc.enableReserveAsCollateral(pxt.address, "75", "80", "105")
await lpc.enableReserveAsCollateral(ppt.address, "75", "80", "105")
await lpc.enableReserveAsCollateral(tusd.address, "75", "80", "105")
await lpc.enableReserveAsCollateral(pax.address, "75", "80", "105")
await lpc.enableReserveAsCollateral(gbp.address, "75", "80", "105")
await lpc.enableReserveAsCollateral(ETHEREUM_ADDRESS, "75", "80", "105")

//enableBorrowingOnReserve
await lpc.enableBorrowingOnReserve(ppt.address, true)
await lpc.enableBorrowingOnReserve(pxt.address, true)
await lpc.enableBorrowingOnReserve(pax.address, true)
await lpc.enableBorrowingOnReserve(tusd.address, true)
await lpc.enableBorrowingOnReserve(gbp.address, true)
await lpc.enableBorrowingOnReserve(ETHEREUM_ADDRESS, true)

//lending pool upgrades to version 5
truffle(ropsten)> await lpa.setLendingPoolImpl(lp.address, {from:admin})
{ tx:
   '0xe3f1377703c51759a7f0b46dc24f3a1269102c68c58e56eb7b7064d27e0db787',

//lending pool configurator upgrade
truffle(ropsten)> await lpa.setLendingPoolConfiguratorImpl(lpc.address, {from:admin})
{ tx:
   '0xd49bfa209f3266bb30949fca12b8fa02399df4ebf4406846781cb8a5756b1462',

```

## Ethereum (ropsten) test network deployment for Populous Reward Pools using RewardPoolAddressManager - 17/12/2020

```
infura key/address used - https://ropsten.infura.io/v3/${secret.infuraKey[1]}`, 2
0xC6561dF9180a8863fA9a16aB376eFbca17166CF4

acc = await web3.eth.getAccounts()
admin = acc[0]

ram = await RewardPoolAddressManager.new()
ram.address
'0xd50bC0BCD19f1562180b66fD8806c6dF2AA9Bec5'

dai = await MockDAI.at('0xE5cc501BaD49f4897EC6BFd1f1A4464b8D3C264f')
ppt = await MockPPT.at('0x350E7A260B584e24c04ac2ba682fa568D59c7829')
pxt = await MockPXT.at('0x72C770aB6CA28114504255C6b5b2e67f9a4749DA')

deploy reward pools for PPT and DAI from RewardPoolAddressManager - addReserve(LendingPoolCore _core, address _rewardToken, address _reserve, uint256 _duration in miliseconds)
await ram.addReserve('0xB1E4F9f16f72968704DCDcE00EC5848B2074aEdD', pxt.address, dai.address, '604800')
await ram.addReserve('0xB1E4F9f16f72968704DCDcE00EC5848B2074aEdD', pxt.address, ppt.address, '604800')

ram.getRewardPool(dai.address)
ram.getRewardPool(ppt.address)
reward pool address manager - 0xd50bC0BCD19f1562180b66fD8806c6dF2AA9Bec5
dai reward pool - 0x12B21aD17bFd30826796Cd96dE40F6B79Cb8b0F9
ppt reward pool - 0x7d5d82A80d0470a96d07bAeb7f9F83C698E79859

notify reward on each reward pool
daiReward = await RewardPool.at('0x12B21aD17bFd30826796Cd96dE40F6B79Cb8b0F9')
pptReward = await RewardPool.at('0x7d5d82A80d0470a96d07bAeb7f9F83C698E79859')

truffle(ropsten)> daiReward.duration()
<BN: 93a80>
truffle(ropsten)> pptReward.duration()
<BN: 93a80>
truffle(ropsten)>


mint pxt and transfer to each reward pool
await pxt.mint('100000000000000000') //1 bln pxt DONE
pxt.balanceOf(admin) //75 mln pxt per reward pool NOTE for 52 weeks/1 year
await pxt.transfer(pptReward.address, '144230700000000') //weekly pxt per reward pool NOTE
await pxt.transfer(daiReward.address, '144230700000000') //weekly pxt per reward pool NOTE
await pptReward.notifyRewardAmount('144230700000000')  //00000000 pxt precision 8
await daiReward.notifyRewardAmount('144230700000000')

pdai = await PToken.at('0xbeD9521335Db8604D7406323dCbe775396db0baE')
await pdai.approve(daiReward.address, '100000000000000000000000')
//function allowance(address owner, address spender) public view returns (uint256) {
await daiReward.stake('100000') //000000000000000000 dai decimals 10**18

truffle(ropsten)> daiReward.pToken()
'0xbeD9521335Db8604D7406323dCbe775396db0baE'

truffle(ropsten)> await web3.utils.toDecimal(await daiReward.rewardPerToken()) / 10**8
<BN: 5cb7e4>

truffle(ropsten)> await web3.utils.toDecimal(await daiReward.rewardRate())

truffle(ropsten)> daiReward.earned(admin)
<BN: c172b431e0>
truffle(ropsten)> web3.utils.toDecimal('2440cb7be0')
155705900000
truffle(ropsten)> web3.utils.toDecimal('2440cb7be0') / 10**8
1557.059
truffle(ropsten)> await web3.utils.toDecimal(await daiReward.earned(admin)) / 10**8
OR
truffle(ropsten)> await web3.utils.toDecimal(await daiReward.earned('0xC6561dF9180a8863fA9a16aB376eFbca17166CF4')) / 10**8
```


## Ethereum (ropsten) test network deployment for Populous DeFi governance smart contracts with automated migration scripts in required order - 10/01/2021

```
alchemy key/address used - wss://eth-ropsten.ws.alchemyapi.io/v2/2vcXaK3xR2xUx2XYhEVzfpX7maV4uHlp

admin: 0x614b32516601b7C424d0B284B498D5E14323ED3A


Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.



Starting migrations...
======================
> Network name:    'ropsten'
> Network id:      3
> Block gas limit: 8000000 (0x7a1200)


1_initial_migration.js
======================

   Deploying 'Migrations'
   ----------------------
   > transaction hash:    0x6dea962345a15c7df84873336f9b6bbf98614c34a7acbdd4b7d4008356a6dad6
   > Blocks: 2            Seconds: 56
   > contract address:    0x73503c3dae3A38A2fdD6D90f9e20a6342495fA4e
   > block number:        9435051
   > block timestamp:     1610240569
   > account:             0x614b32516601b7C424d0B284B498D5E14323ED3A
   > balance:             1.196129422
   > gas used:            168286 (0x2915e)
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.003870578 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:         0.003870578 ETH


2_lendingPoolAddressesProvider_migration.js
===========================================
0x614b32516601b7C424d0B284B498D5E14323ED3A admin address

   Deploying 'LendingPoolAddressesProvider'
   ----------------------------------------
   > transaction hash:    0xfa36d6b7915baa0069a3c51ba76a8f19844a2f81f221103979cfb87dbedcff1a
   > Blocks: 1            Seconds: 16
   > contract address:    0xf32860c0C702F0eF53408624Fd91302F8Db1962e
   > block number:        9435053
   > block timestamp:     1610240586
   > account:             0x614b32516601b7C424d0B284B498D5E14323ED3A
   > balance:             1.1590968
   > gas used:            1567835 (0x17ec5b)
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.036060205 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:         0.036060205 ETH


3_erc20_tokens_migration.js
===========================

   Deploying 'MockDAI'
   -------------------
   > transaction hash:    0xb84c0e255784bb11d34e31f72de02782a16f212b9ae0056f0114bdb000642de8
   > Blocks: 0            Seconds: 16
   > contract address:    0x89e93b2c12baace584C9456C65E4dcd903818127
   > block number:        9435055
   > block timestamp:     1610240609
   > account:             0x614b32516601b7C424d0B284B498D5E14323ED3A
   > balance:             1.141720254
   > gas used:            728223 (0xb1c9f)
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.016749129 ETH


   Deploying 'MockUSDC'
   --------------------
   > transaction hash:    0xfe7ec1a2a8d936f79bbac4e44774e057d1ce98f2d28bc41b68c231ef716c710a
   > Blocks: 0            Seconds: 32
   > contract address:    0xf4f3a93fd94abC6E0f49fCBafcDc1926f2877fF9
   > block number:        9435056
   > block timestamp:     1610240631
   > account:             0x614b32516601b7C424d0B284B498D5E14323ED3A
   > balance:             1.124969791
   > gas used:            728281 (0xb1cd9)
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.016750463 ETH


   Deploying 'MockPXT'
   -------------------
   > transaction hash:    0xb5993bea27df94ecc83a9aeb421e7a5337ecddeb43bc7ca27075e0575924f249
   > Blocks: 0            Seconds: 8
   > contract address:    0xAb252AB695409A94723E135a1B87C94B34679B45
   > block number:        9435057
   > block timestamp:     1610240668
   > account:             0x614b32516601b7C424d0B284B498D5E14323ED3A
   > balance:             1.108220662
   > gas used:            728223 (0xb1c9f)
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.016749129 ETH


   Deploying 'MockPPT'
   -------------------
   > transaction hash:    0xe2a38fad30147b11a8ede3277dd0bda390baca61ba07886635a391e7716444b4
   > Blocks: 0            Seconds: 12
   > contract address:    0x2CAE686B8056C8802C61a5484c728743dA63b74d
   > block number:        9435059
   > block timestamp:     1610240681
   > account:             0x614b32516601b7C424d0B284B498D5E14323ED3A
   > balance:             1.091471533
   > gas used:            728223 (0xb1c9f)
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.016749129 ETH


   Deploying 'MockTUSD'
   --------------------
   > transaction hash:    0xe55ab0abf768ecb9d8b6f95ffd01c6ad45a177c6ed9511b489d9a8b5aadc7a47
   > Blocks: 0            Seconds: 8
   > contract address:    0x209541015a43D5962A5570BbF242DA17C807Cfc4
   > block number:        9435062
   > block timestamp:     1610240699
   > account:             0x614b32516601b7C424d0B284B498D5E14323ED3A
   > balance:             1.074721438
   > gas used:            728265 (0xb1cc9)
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.016750095 ETH


   Deploying 'MockGBP'
   -------------------
   > transaction hash:    0x47c22441d02ef8ecc4e1cad4b066c96170b622d4d1662d71f44f10dbf6fcef95
   > Blocks: 1            Seconds: 24
   > contract address:    0xABFC5c2610E24d1B447CDEB160ACe1ad89725981
   > block number:        9435063
   > block timestamp:     1610240710
   > account:             0x614b32516601b7C424d0B284B498D5E14323ED3A
   > balance:             1.057972309
   > gas used:            728223 (0xb1c9f)
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.016749129 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:         0.100497074 ETH


4_pTokens_migration.js
======================

   > Saving migration to chain.
   -------------------------------------
   > Total cost:                   0 ETH


5_lendingPoolCore_migration.js
==============================

   Deploying 'CoreLibrary'
   -----------------------
   > transaction hash:    0x69e8c3277ae1443050c3fad0a8099f498bef2f8629edea4c4d0dd8a820a37c1e
   > Blocks: 0            Seconds: 8
   > contract address:    0x1b92F33a1FD75a8b4DE60413e91FA72CA8Fa7AB3
   > block number:        9435066
   > block timestamp:     1610240774
   > account:             0x614b32516601b7C424d0B284B498D5E14323ED3A
   > balance:             1.050363311
   > gas used:            276268 (0x4372c)
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.006354164 ETH


   Linking
   -------
   * Contract: LendingPoolCore <--> Library: CoreLibrary (at address: 0x1b92F33a1FD75a8b4DE60413e91FA72CA8Fa7AB3)

   Deploying 'LendingPoolCore'
   ---------------------------
   > transaction hash:    0xc73674cede7b87058c1360f361660ad3697b548ea37e8c56c6d03468f2585871
   > Blocks: 1            Seconds: 20
   > contract address:    0x4cf867b729dDBdb972E00Ee77CDA0ED8487B433b
   > block number:        9435067
   > block timestamp:     1610240786
   > account:             0x614b32516601b7C424d0B284B498D5E14323ED3A
   > balance:             0.936875078
   > gas used:            4934271 (0x4b4a7f)
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.113488233 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:         0.119842397 ETH


6_lendingPool_migration.js
==========================

   Deploying 'LendingPool'
   -----------------------
   > transaction hash:    0x14b98ae87e8cdf637567808e945719cd3a3bb696e2a7d16b306ac0a66f7893e8
   > Blocks: 1            Seconds: 8
   > contract address:    0xb9c8C4E95ff78BBb9aB52A4A1905f27753ee08f4
   > block number:        9435069
   > block timestamp:     1610240830
   > account:             0x614b32516601b7C424d0B284B498D5E14323ED3A
   > balance:             0.836908614
   > gas used:            4319089 (0x41e771)
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.099339047 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:         0.099339047 ETH


7_feeProvider_migration.js
==========================

   Deploying 'FeeProvider'
   -----------------------
   > transaction hash:    0x5bea881dd6637d3d3086b69c6901c97cd5a4335921d79119428fffd990bb0ff8
   > Blocks: 1            Seconds: 16
   > contract address:    0xaDc3261a95903C3A5c4921554725a4D9332f66Ae
   > block number:        9435073
   > block timestamp:     1610240883
   > account:             0x614b32516601b7C424d0B284B498D5E14323ED3A
   > balance:             0.82987503
   > gas used:            278529 (0x44001)
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.006406167 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:         0.006406167 ETH


8_lendingPoolParametersProvider_migration.js
============================================

   Deploying 'LendingPoolParametersProvider'
   -----------------------------------------
   > transaction hash:    0x27b7149352990798dae1eab35170fcf111d018a5270c38d10f1ba29e0dbeca11
   > Blocks: 0            Seconds: 16
   > contract address:    0x4930897158A6874c5AF6A9Eaaa7a02C40aDf6C98
   > block number:        9435077
   > block timestamp:     1610240929
   > account:             0x614b32516601b7C424d0B284B498D5E14323ED3A
   > balance:             0.825599146
   > gas used:            158629 (0x26ba5)
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.003648467 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:         0.003648467 ETH


9_lendingPoolConfigurator_migration.js
======================================

   Deploying 'LendingPoolConfigurator'
   -----------------------------------
   > transaction hash:    0x35ba63961ba7a6449dbeffa364e9fa696216408ea9c6f1810cef4eb9d6bd0ca4
   > Blocks: 1            Seconds: 4
   > contract address:    0x2F9C265d1F0783003613D1c99d38b43942b1878c
   > block number:        9435081
   > block timestamp:     1610240959
   > account:             0x614b32516601b7C424d0B284B498D5E14323ED3A
   > balance:             0.703017863
   > gas used:            5302342 (0x50e846)
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.121953866 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:         0.121953866 ETH


10_lendingPoolDataProvider_migration.js
=======================================

   Deploying 'LendingPoolDataProvider'
   -----------------------------------
   > transaction hash:    0xce4c2ed17da79c89b9ff733143d3f32771ebff5d5ba80a674fae7ceb6767cd63
   > Blocks: 1            Seconds: 16
   > contract address:    0x4aDA8F751F98B98f7A781fd34F77059E41f569d6
   > block number:        9435085
   > block timestamp:     1610240988
   > account:             0x614b32516601b7C424d0B284B498D5E14323ED3A
   > balance:             0.637074609
   > gas used:            2839819 (0x2b550b)
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.065315837 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:         0.065315837 ETH


11_priceOracle_migration.js
===========================

   Deploying 'PriceOracle'
   -----------------------
   > transaction hash:    0xb0db1bcd66262be291aba6a743b6b48c146386ec70ace340b5e5c344b13aad81
   > Blocks: 1            Seconds: 40
   > contract address:    0x9918329F4Be4C35d0D64b2eAD4220604957F12EF
   > block number:        9435090
   > block timestamp:     1610241030
   > account:             0x614b32516601b7C424d0B284B498D5E14323ED3A
   > balance:             0.632921545
   > gas used:            153289 (0x256c9)
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.003525647 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:         0.003525647 ETH


12_lendingRateOracle_migration.js
=================================

   Deploying 'LendingRateOracle'
   -----------------------------
   > transaction hash:    0xbcd207f23fae4ebf814d0cb0788fed384894690e648b84e3a77a223a032414e0
   > Blocks: 0            Seconds: 24
   > contract address:    0x292CC8FacBc423D5e117c70066be3418815403A1
   > block number:        9435092
   > block timestamp:     1610241087
   > account:             0x614b32516601b7C424d0B284B498D5E14323ED3A
   > balance:             0.624296315
   > gas used:            347731 (0x54e53)
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.007997813 ETH

finished setting token market borrow rates

   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:         0.007997813 ETH


13_lendingPoolLiquidationManager_migration.js
=============================================

   Deploying 'LendingPoolLiquidationManager'
   -----------------------------------------
   > transaction hash:    0xb765cdcc1829a2239b43114d164ce1de5ac510e87f175c03a7a229e97e496e62
   > Blocks: 1            Seconds: 4
   > contract address:    0x1cbA78be03a1224fC517DE6832e3e586795142f8
   > block number:        9435108
   > block timestamp:     1610241300
   > account:             0x614b32516601b7C424d0B284B498D5E14323ED3A
   > balance:             0.590774459
   > gas used:            1129816 (0x113d58)
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.025985768 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:         0.025985768 ETH


14_tokenDistributor_migration.js
================================

   Deploying 'TokenDistributor'
   ----------------------------
   > transaction hash:    0xa4d391b808d7a0f7b10ada900efc0ddb94875f572e27433db75ff7ba7c98fc37
   > Blocks: 1            Seconds: 56
   > contract address:    0xbF8Bd370Fb744B78cB56613845633c9516475489
   > block number:        9435112
   > block timestamp:     1610241377
   > account:             0x614b32516601b7C424d0B284B498D5E14323ED3A
   > balance:             0.555863495
   > gas used:            1490589 (0x16be9d)
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.034283547 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:         0.034283547 ETH


15_defaultReserveInterestRateStrategy_migration.js
==================================================

   Deploying 'DefaultReserveInterestRateStrategy'
   ----------------------------------------------
   > transaction hash:    0x0b13e1727359a25257ffa55eadb9ba63e1966b90116f8dcfac6b86139f78d467
   > Blocks: 1            Seconds: 12
   > contract address:    0x99f8794E63781d184372b15E2D9a8c1D8c229342
   > block number:        9435115
   > block timestamp:     1610241404
   > account:             0x614b32516601b7C424d0B284B498D5E14323ED3A
   > balance:             0.537044251
   > gas used:            673249 (0xa45e1)
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.015484727 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:         0.015484727 ETH


16_walletBalanceProvider_migration.js
=====================================

   Deploying 'WalletBalanceProvider'
   ---------------------------------
   > transaction hash:    0x6286fb4016f9397d6284b717c43d573460584685870ee9c8196f23febe0e24d6
   > Blocks: 1            Seconds: 12
   > contract address:    0x981C3508203a619Ecf37878209d5b25f06c335A2
   > block number:        9435118
   > block timestamp:     1610241443
   > account:             0x614b32516601b7C424d0B284B498D5E14323ED3A
   > balance:             0.527114208
   > gas used:            404462 (0x62bee)
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.009302626 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:         0.009302626 ETH


17_protocolGlobalAddressesRegister_migration.js
===============================================
0x614b32516601b7C424d0B284B498D5E14323ED3A lending pool addresses provider owner
0xf32860c0C702F0eF53408624Fd91302F8Db1962e lending pool addresses provider
0x614b32516601b7C424d0B284B498D5E14323ED3A lending pool manager address
0xDCDd2E07fcEb6A7D16A2305a65613e459dD11B75 fee provider address
0x0c81DF99C91A5Cb43361AcAa7c13F4D2A03E230a lending pool parameters provider address
0xc97458d58a4eceB45FD5680e7425D1c397d1406a lending pool core address
0x7d743B5b6C6A739851667a0bC276dB53cc11c7e6 lending pool configurator address
0x535639af266f2e15C49ccB68a53c65bD089E1AEf lending pool data provider address
0xD126c3D3613722C99524955cfa9B0AE63192E388 lending pool address
0x292CC8FacBc423D5e117c70066be3418815403A1 lending rate oracle address
0x1cbA78be03a1224fC517DE6832e3e586795142f8 lending pool liquidation manager address
0xbF8Bd370Fb744B78cB56613845633c9516475489 token distributor

   > Saving migration to chain.
   -------------------------------------
   > Total cost:                   0 ETH


18_init_reserve_asset_price_migration.js
========================================

   Deploying 'ChainlinkProxyPriceProvider'
   ---------------------------------------
   > transaction hash:    0x333e9e4a0356879abc212412a25623576f1d99caff11120f7135124e8fcc9e5e
   > Blocks: 0            Seconds: 32
   > contract address:    0x35F5B4a8E3AA92A8C009A883966b9B507F98D748
   > block number:        9435194
   > block timestamp:     1610242207
   > account:             0x614b32516601b7C424d0B284B498D5E14323ED3A
   > balance:             1.625858094
   > gas used:            698308 (0xaa7c4)
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.016061084 ETH

0x35F5B4a8E3AA92A8C009A883966b9B507F98D748 chainlink proxy asset price provider address
0x9918329F4Be4C35d0D64b2eAD4220604957F12EF fallback asset price oracle address
0x9918329F4Be4C35d0D64b2eAD4220604957F12EF 0x9918329F4Be4C35d0D64b2eAD4220604957F12EF actual and set price oracle addresses
finished setting token/asset prices/exchange rates in ETH
0x89e93b2c12baace584C9456C65E4dcd903818127 DAI reserve address for lending pool
0xABFC5c2610E24d1B447CDEB160ACe1ad89725981 GBP reserve address for lending pool
0xAb252AB695409A94723E135a1B87C94B34679B45 PXT reserve address for lending pool
0x209541015a43D5962A5570BbF242DA17C807Cfc4 TUSD reserve address for lending pool
0xf4f3a93fd94abC6E0f49fCBafcDc1926f2877fF9 USDC reserve address for lending pool
0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE Ether reserve address for lending pool
0x2CAE686B8056C8802C61a5484c728743dA63b74d PPT reserve address for lending pool

0x89b10c0fCeE4a26e4ACC7eDD32D55933C5a1957C PDAI address for lending pool and Populous Reward
0x7A4487330df35B2F229092d27A0815f50764aD3d PGBP address for lending pool and Populous Reward
0xD4286152f79cb425D3505798804c889B1dd4A377 PPXT address for lending pool and Populous Reward
0x5A3beeFDfCE3d6C564900bcDe59eb9b9a5F06D08 PPPT address for lending pool and Populous Reward
0x98fCaFfd0323A99eBB9bC442FDa93498E5645d8E PTUSD address for lending pool and Populous Reward
0xA617CF773a39508C52F5AdEdc6d0528D3a374EEa PUSDC address for lending pool and Populous Reward
0xB3B0f6D3dAD210EFB7eb9D97528095d46a3eF51b PETH address for lending pool and Populous reward

   > Saving migration to chain.
   -------------------------------------
   > Total cost:                   0 ETH


19_populousReward_migration.js
==============================
0xAb252AB695409A94723E135a1B87C94B34679B45 PXT address for reward token

   Deploying 'RewardPoolAddressManager'
   ------------------------------------
   > transaction hash:    0x04ce6b149e2a21f32bcd7cffe39aaca9ea9371775eb9c48b519a2c50fbcc1074
   > Blocks: 0            Seconds: 28
   > contract address:    0x182e513F19333a875b08ac34524808E722CCfFdb
   > block number:        9435247
   > block timestamp:     1610242998
   > account:             0x614b32516601b7C424d0B284B498D5E14323ED3A
   > balance:             1.255551079
   > gas used:            1624218 (0x18c89a)
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.037357014 ETH

0x182e513F19333a875b08ac34524808E722CCfFdb Populous Reward Address Manager address
<BN: 832d53a3a300> 'DAI reward contract PXT balance'
<BN: 832d53a3a300> 'PPT reward contract PXT balance'


22_enable_collateral_and_borrowing_migration.js
===============================================
pxt reserve enabled for use as collateral
ppt reserve enabled for use as collateral
usdc reserve enabled for use as collateral
dai reserve enabled for use as collateral
tusd reserve enabled for use as collateral
ether reserve enabled for use as collateral
gbp reserve enabled for use as collateral
pxt reserve enabled for borrowing
ppt reserve enabled for borrowing
usdc reserve enabled for borrowing
dai reserve enabled for borrowing
tusd reserve enabled for borrowing
ether reserve enabled for borrowing
gbp reserve enabled for borrowing


23_test_tokens_faucet_migrations.js
===================================

   Deploying 'TestFaucet'
   ----------------------
   > transaction hash:    0x24158fba34ee48ff0fe6a1a72f9a8e54926469a922b8abfe96db476f339adb64
   > Blocks: 0            Seconds: 8
   > contract address:    0xcfB548dF4e6476080527420BFC4309D0ff8c27A6
   > block number:        9435283
   > block timestamp:     1610243593
   > account:             0x614b32516601b7C424d0B284B498D5E14323ED3A
   > balance:             1.148438147
   > gas used:            600994 (0x92ba2)
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.013822862 ETH

0xcfB548dF4e6476080527420BFC4309D0ff8c27A6 test faucet contract address

```



## Ethereum live network deployment for Populous DeFi smart contracts with automated migration scripts in required order - 10/01/2021

```

admin: 0x70393B06D018e148B593A91E022EA73071c17007



*Verified Livenet Contracts on Etherscan*

*with proxies*
0x9E25121dd5df2f26EAE8125c48AF835E4aeFb1e3 fee provider (verified), 0x4718661DF4d1C8E3346F473A6ed2Bc4C36e94EB3 fee provider proxy address (verified InitializableAdminUpgradeabilityProxy and linked)
0x0545D25fD64d016f6a7ACeCaac3aa0E5700F6C40 lending pool parameters provider (verified), 0x688A8479A66A43d734613893CC8d99D25dbBc434 lending pool parameters provider proxy address (verified InitializableAdminUpgradeabilityProxy and linked)
0x4911688251Ce7803E54fF080506060E67e229408 lending pool core (verified with linked CoreLibrary), 0x616B43FC44dD94D236B92d3d04D35d496903Af75 lending pool core proxy address (verified InitializableAdminUpgradeabilityProxy and linked)
0x9D3e89b0c8b42Be85fD9CF875579F72d03a0d93B lending pool configurator (verified), 0x3908c86AAb8Ae7334e7f03d4A5897186d34a0fD6 lending pool configurator proxy address (verified InitializableAdminUpgradeabilityProxy and linked)
0xA5A1fcb63280080f1Ba941484f23C59CEDF55BB2 lending pool data provider (verified), 0xa81B37668C5FD24F4DC5Ae1eba59233AC0A51CA0 lending pool data provider proxy address (verified InitializableAdminUpgradeabilityProxy and linked)
0x18A60fc294Bf180cFfe589247a2E473418FA0B0e lending pool (verified), 0xEFc272451cFDCe282BEFBfE96038484C4C194235 lending pool proxy address (verified InitializableAdminUpgradeabilityProxy and linked)

*no proxies*
0x7C6e8fC0224ce0e71A8b24983e6a67d2AD69013a lending rate oracle address (verified lending rate oracle - no proxy)
0x825921261314d2cD5ff1D0ED08b757B9615f6Eaf token distributor (verified token distributer - no proxy)
0xB0C26F0C7D76980D737ac8348cEC8a0390e54098 price oracle (verified price oracle - no proxy)
0x4ad055E076BE86d8f947333F15fB4e313BAfC49B lending pool addresses provider (verified - no proxy)
0x049a32D35ca9F0f1Ea0d9E3404e559664301434C reward pool address manager (verified - no proxy)
0x903aF4B52BBec2D0e8895332cc8fdd46dc310054 lending pool liquiddation manager (verified - no proxy)
0x2A6397AEac0fBfa2034D2E705aEAD676a0782D71 DAI reward pool (verified)
0x818f57194c6e54213E3AF786d4E763ef89EF7829 USDC reward pool (verified)
0x676AC3E2E53a2d010AB66A2Ab5aF7E0ee5a4FC00 USDT reward pool (verified)
0x08944Ce6c5d0ae48BC4A37435aC31C7EDd1B801B TUSD reward pool (verified)


Starting migrations...
======================
> Network name:    'live'
> Network id:      1
> Block gas limit: 12512074 (0xbeeb4a)


1_initial_migration.js
======================

   Deploying 'Migrations'
   ----------------------
   > transaction hash:    0xe54cba07340ba0f14fbf2ff9750688f89f5477d9e47eceb19b1f96d36efd2c5b
   > Blocks: 2            Seconds: 16
   > contract address:    0x28D4a9Fc706Eb095563adC8EcCF46FE334370F6B
   > block number:        11629718
   > block timestamp:     1610316173
   > account:             0x70393B06D018e148B593A91E022EA73071c17007
   > balance:             2.48737855
   > gas used:            168286 (0x2915e)
   > gas price:           75 gwei
   > value sent:          0 ETH
   > total cost:          0.01262145 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.01262145 ETH


2_lendingPoolAddressesProvider_migration.js
===========================================
0x70393B06D018e148B593A91E022EA73071c17007 admin address

   Deploying 'LendingPoolAddressesProvider'
   ----------------------------------------
   > transaction hash:    0x55b6f735f4afce8367a0ca3ce5c0a5c40d369a6600b45830b178f7f742077dc4
   > Blocks: 3            Seconds: 40
   > contract address:    0x4ad055E076BE86d8f947333F15fB4e313BAfC49B
   > block number:        11629727
   > block timestamp:     1610316297
   > account:             0x70393B06D018e148B593A91E022EA73071c17007
   > balance:             2.36662
   > gas used:            1567835 (0x17ec5b)
   > gas price:           75 gwei
   > value sent:          0 ETH
   > total cost:          0.117587625 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:         0.117587625 ETH


3_erc20_tokens_migration.js
===========================

   > Saving migration to chain.
   -------------------------------------
   > Total cost:                   0 ETH


4_pTokens_migration.js
======================

   > Saving migration to chain.
   -------------------------------------
   > Total cost:                   0 ETH


5_lendingPoolCore_migration.js
==============================

   Deploying 'CoreLibrary'
   -----------------------
   > transaction hash:    0x8429fb57d9c493957e9fe0e2d17278d5217be1f28a4dfb1a36ba19b2f760b2e5
   > Blocks: 4            Seconds: 60
   > contract address:    0x21E8188042f7d5FFDeBac35E8b08A18f62E2B4A7
   > block number:        11629740
   > block timestamp:     1610316484
   > account:             0x70393B06D018e148B593A91E022EA73071c17007
   > balance:             2.339762125
   > gas used:            276268 (0x4372c)
   > gas price:           75 gwei
   > value sent:          0 ETH
   > total cost:          0.0207201 ETH


   Linking
   -------
   * Contract: LendingPoolCore <--> Library: CoreLibrary (at address: 0x21E8188042f7d5FFDeBac35E8b08A18f62E2B4A7)

   Deploying 'LendingPoolCore'
   ---------------------------
   > transaction hash:    0x5f71e87a2e17a6fc52d79a9fc534f1a9aec74eb25d92264f2a7e1189edb52d7f
   > Blocks: 4            Seconds: 68
   > contract address:    0x4911688251Ce7803E54fF080506060E67e229408
   > block number:        11629744
   > block timestamp:     1610316558
   > account:             0x70393B06D018e148B593A91E022EA73071c17007
   > balance:             1.9696918
   > gas used:            4934271 (0x4b4a7f)
   > gas price:           75 gwei
   > value sent:          0 ETH
   > total cost:          0.370070325 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:         0.390790425 ETH


6_lendingPool_migration.js
==========================

   Deploying 'LendingPool'
   -----------------------
   > transaction hash:    0x28eae6e4f2f4e1085c427c120ab90051d923c6099b6a2524fb45047abbc1f9a9
   > Blocks: 4            Seconds: 68
   > contract address:    0x18A60fc294Bf180cFfe589247a2E473418FA0B0e
   > block number:        11629753
   > block timestamp:     1610316694
   > account:             0x70393B06D018e148B593A91E022EA73071c17007
   > balance:             1.6437142
   > gas used:            4319089 (0x41e771)
   > gas price:           75 gwei
   > value sent:          0 ETH
   > total cost:          0.323931675 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:         0.323931675 ETH


7_feeProvider_migration.js
==========================

   Deploying 'FeeProvider'
   -----------------------
   > transaction hash:    0x74c95703c843d17192b31473008a75d08239e5a5c3e86f52b24c55c1a6bad353
   > Blocks: 9            Seconds: 140
   > contract address:    0x9E25121dd5df2f26EAE8125c48AF835E4aeFb1e3
   > block number:        11629769
   > block timestamp:     1610316899
   > account:             0x70393B06D018e148B593A91E022EA73071c17007
   > balance:             1.6207786
   > gas used:            278529 (0x44001)
   > gas price:           75 gwei
   > value sent:          0 ETH
   > total cost:          0.020889675 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:         0.020889675 ETH


8_lendingPoolParametersProvider_migration.js
============================================

   Deploying 'LendingPoolParametersProvider'
   -----------------------------------------
   > transaction hash:    0xa4ff23a0c486f96fcfdd8ec71e7fad501bb047ea75f499788e5f94e60f72763e
   > Blocks: 1            Seconds: 4
   > contract address:    0x0545D25fD64d016f6a7ACeCaac3aa0E5700F6C40
   > block number:        11629776
   > block timestamp:     1610316982
   > account:             0x70393B06D018e148B593A91E022EA73071c17007
   > balance:             1.6068355
   > gas used:            158629 (0x26ba5)
   > gas price:           75 gwei
   > value sent:          0 ETH
   > total cost:          0.011897175 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:         0.011897175 ETH


9_lendingPoolConfigurator_migration.js
======================================

   Deploying 'LendingPoolConfigurator'
   -----------------------------------
   > transaction hash:    0x95879288a44c8a6b8792785614e59ce92427816d95a4866a6f5cbbec02d6617e
   > Blocks: 1            Seconds: 8
   > contract address:    0x9D3e89b0c8b42Be85fD9CF875579F72d03a0d93B
   > block number:        11629782
   > block timestamp:     1610317040
   > account:             0x70393B06D018e148B593A91E022EA73071c17007
   > balance:             1.207113925
   > gas used:            5302342 (0x50e846)
   > gas price:           75 gwei
   > value sent:          0 ETH
   > total cost:          0.39767565 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.39767565 ETH


10_lendingPoolDataProvider_migration.js
=======================================

   Deploying 'LendingPoolDataProvider'
   -----------------------------------
   > transaction hash:    0x4b297542f2f6d4915d315070324baf1e7ca76d771a070fcb77157aeeaf11cb45
   > Blocks: 3            Seconds: 44
   > contract address:    0xA5A1fcb63280080f1Ba941484f23C59CEDF55BB2
   > block number:        11629788
   > block timestamp:     1610317128
   > account:             0x70393B06D018e148B593A91E022EA73071c17007
   > balance:             0.992081575
   > gas used:            2839819 (0x2b550b)
   > gas price:           75 gwei
   > value sent:          0 ETH
   > total cost:          0.212986425 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:         0.212986425 ETH


11_priceOracle_migration.js
===========================

   Deploying 'PriceOracle'
   -----------------------
   > transaction hash:    0x58a4506f2c8186771d5fd8600e874bcbbe7300b3c1a94d4663a9150089b5840a
   > Blocks: 0            Seconds: 4
   > contract address:    0xB0C26F0C7D76980D737ac8348cEC8a0390e54098
   > block number:        11629792
   > block timestamp:     1610317148
   > account:             0x70393B06D018e148B593A91E022EA73071c17007
   > balance:             0.963355075
   > gas used:            355741 (0x56d9d)
   > gas price:           75 gwei
   > value sent:          0 ETH
   > total cost:          0.026680575 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:         0.026680575 ETH


12_lendingRateOracle_migration.js
=================================

   Deploying 'LendingRateOracle'
   -----------------------------
   > transaction hash:    0xf3df96d15039cf8b30c55f83a3f8d607a525448f23b41ee13f11243f3daeab87
   > Blocks: 4            Seconds: 28
   > contract address:    0x7C6e8fC0224ce0e71A8b24983e6a67d2AD69013a
   > block number:        11629801
   > block timestamp:     1610317241
   > account:             0x70393B06D018e148B593A91E022EA73071c17007
   > balance:             0.935229325
   > gas used:            347731 (0x54e53)
   > gas price:           75 gwei
   > value sent:          0 ETH
   > total cost:          0.026079825 ETH

finished setting token market borrow rates

   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:         0.026079825 ETH


13_lendingPoolLiquidationManager_migration.js
=============================================

   Deploying 'LendingPoolLiquidationManager'
   -----------------------------------------
   > transaction hash:    0xc9b0608395eb3e81cb8785c5a5d4bf59ae150659674c8b548b2561f3fdad2c7d
   > Blocks: 3            Seconds: 20
   > contract address:    0x903aF4B52BBec2D0e8895332cc8fdd46dc310054
   > block number:        11629823
   > block timestamp:     1610317532
   > account:             0x70393B06D018e148B593A91E022EA73071c17007
   > balance:             0.8355784
   > gas used:            1129816 (0x113d58)
   > gas price:           75 gwei
   > value sent:          0 ETH
   > total cost:          0.0847362 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:           0.0847362 ETH


14_tokenDistributor_migration.js
================================

   Deploying 'TokenDistributor'
   ----------------------------
   > transaction hash:    0x262f12413c8c6ee8a947a11f32c6428133fc724897c5ac61e1384d7699fc3009
   > Blocks: 2            Seconds: 8
   > contract address:    0x825921261314d2cD5ff1D0ED08b757B9615f6Eaf
   > block number:        11629834
   > block timestamp:     1610317720
   > account:             0x70393B06D018e148B593A91E022EA73071c17007
   > balance:             0.7217383
   > gas used:            1490589 (0x16be9d)
   > gas price:           75 gwei
   > value sent:          0 ETH
   > total cost:          0.111794175 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:         0.111794175 ETH


15_defaultReserveInterestRateStrategy_migration.js
==================================================

   > Saving migration to chain.
   -------------------------------------
   > Total cost:                   0 ETH


16_walletBalanceProvider_migration.js
=====================================

   Deploying 'WalletBalanceProvider'
   ---------------------------------
   > transaction hash:    0xd6d030b85917cc92a492ca3a460ddc37b339daa62daf05042faf7a944237f8f1
   > Blocks: 3            Seconds: 32
   > contract address:    0x5aBe3E049DceA07a8FAd15A2C91D53b586f8Ed8a
   > block number:        11629851
   > block timestamp:     1610318019
   > account:             0x70393B06D018e148B593A91E022EA73071c17007
   > balance:             1.1784843
   > gas used:            404462 (0x62bee)
   > gas price:           75 gwei
   > value sent:          0 ETH
   > total cost:          0.03033465 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.03033465 ETH



17_protocolGlobalAddressesRegister_migration.js
===============================================
0x70393B06D018e148B593A91E022EA73071c17007 lending pool addresses provider owner
0x4ad055E076BE86d8f947333F15fB4e313BAfC49B lending pool addresses provider
0x70393B06D018e148B593A91E022EA73071c17007 lending pool manager address
0x4718661DF4d1C8E3346F473A6ed2Bc4C36e94EB3 fee provider address
0x688A8479A66A43d734613893CC8d99D25dbBc434 lending pool parameters provider address
0x616B43FC44dD94D236B92d3d04D35d496903Af75 lending pool core address
0x3908c86AAb8Ae7334e7f03d4A5897186d34a0fD6 lending pool configurator address
0xa81B37668C5FD24F4DC5Ae1eba59233AC0A51CA0 lending pool data provider address
0xEFc272451cFDCe282BEFBfE96038484C4C194235 lending pool address
0x7C6e8fC0224ce0e71A8b24983e6a67d2AD69013a lending rate oracle address
0x903aF4B52BBec2D0e8895332cc8fdd46dc310054 lending pool liquidation manager address
0x825921261314d2cD5ff1D0ED08b757B9615f6Eaf token distributor

 > Saving migration to chain.
   -------------------------------------
   > Total cost:                   0 ETH


18_init_reserve_asset_price_migration.js
========================================
0x194b2F51Cda25E4d8eBeC62B50327b27a8105831 USDT default reserve interest rate strategy contract address
0x12fF39C41EdEAF1be3aC93E8a6B32f083f27d8aB USDC default reserve interest rate strategy contract address
0xBf4841420334E7429eD9b566e5caAFb1538226b3 TUSD default reserve interest rate strategy contract address
0x6134185aC301AD4d3FdC1785a3aDEDbEF6Ec9bFc DAI default reserve interest rate strategy contract address

   Deploying 'ChainlinkProxyPriceProvider'
   ---------------------------------------
   > transaction hash:    0xf7281b136fdccaa278b6044bef43e5bd6e913aa324b570e84dd80241f5d7213f
   > Blocks: 1            Seconds: 20
   > contract address:    0x083c5d40D03E36F8f696B28Beff47EB688238670
   > block number:        11629906
   > block timestamp:     1610318770
   > account:             0x70393B06D018e148B593A91E022EA73071c17007
   > balance:             1.5915583
   > gas used:            793040 (0xc19d0)
   > gas price:           75 gwei
   > value sent:          0 ETH
   > total cost:          0.059478 ETH

0x083c5d40D03E36F8f696B28Beff47EB688238670 chainlink proxy asset price provider address
0xB0C26F0C7D76980D737ac8348cEC8a0390e54098 fallback asset price oracle address
0xB0C26F0C7D76980D737ac8348cEC8a0390e54098 0xB0C26F0C7D76980D737ac8348cEC8a0390e54098 actual and set price oracle addresses
finished setting token/asset prices/exchange rates in ETH
0x6b175474e89094c44da98b954eedeac495271d0f DAI reserve address for lending pool
0xdac17f958d2ee523a2206206994597c13d831ec7 USDT reserve address for lending pool
0x0000000000085d4780B73119b644AE5ecd22b376 TUSD reserve address for lending pool
0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48 USDC reserve address for lending pool
0x2260fac5e5542a773aa44fbcfedf7c193bc2c599 WBTC reserve address for lending pool
0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE ETHEREUM reserve address for lending pool
0xEe755Af8eF359690078418f911e55747Cb748178 PDAI address for lending pool and Populous Reward
0x532B953f04a11446206E8808b1FD373AD18e1101 PTUSD address for lending pool and Populous Reward
0xAb6c406DFc3ABd5915b46cEc6069C7a70b443286 PUSDC address for lending pool and Populous Reward
0xCECc027c84234616668306b0412aeCABb7943bAD PUSDT address for lending pool and Populous reward
0xA0dD7347fF83f9aECE47f319AC2b144d0E670394 PWBTC address for lending pool and Populous reward
0x67c7ac1EB96024Fd293B2e11c4Fae37F6D60466d PETH address for lending pool and Populous reward

   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:            0.059478 ETH


19_populousReward_migration.js
==================================

0x049a32D35ca9F0f1Ea0d9E3404e559664301434C reward pool address manager

0x2A6397AEac0fBfa2034D2E705aEAD676a0782D71 DAI reward pool
0x818f57194c6e54213E3AF786d4E763ef89EF7829 USDC reward pool
0x676AC3E2E53a2d010AB66A2Ab5aF7E0ee5a4FC00 USDT reward pool 
0x08944Ce6c5d0ae48BC4A37435aC31C7EDd1B801B TUSD reward pool
0x300438e1Bad50CBcC3aD38aDE8eD02E7D620C807 WBTC reward pool
0x94981e73aD1452cf9C6589c910b9Cb42E1280dA3 ETH reward pool


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.12181635 ETH


22_enable_collateral_and_borrowing_migration.js
===============================================
USDC reserve enabled for use as collateral
DAI reserve enabled for use as collateral
TUSD reserve enabled for use as collateral
USDT reserve enabled for use as collateral
USDC reserve enabled for borrowing
DAI reserve enabled for borrowing
TUSD reserve enabled for borrowing
USDT reserve enabled for borrowing

   > Saving migration to chain.
   -------------------------------------
   > Total cost:                   0 ETH


```
