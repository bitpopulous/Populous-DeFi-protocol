
const eContractid = {
  PopulousPropositionPower: "PopulousPropositionPower",
  LendingPoolAddressesProvider: "LendingPoolAddressesProvider",
  TestVotingAssetA: "TestVotingAssetA",
  TestVotingAssetB: "TestVotingAssetB",
  AssetVotingWeightProvider : "AssetVotingWeightProvider",
  PopulousProtoGovernance : "PopulousProtoGovernance",
  ProposalExecutor : "ProposalExecutor",
  FailingProposalExecutor : "FailingProposalExecutor",
  GovernanceParamsProvider : "GovernanceParamsProvider"
}

const eProposalType = {
  UPGRADE_ADDRESS_PROPOSAL : "UPGRADE_ADDRESS_PROPOSAL"
}

const eActionPrefix  = {
  SUBMIT_VOTE : "SUBMIT_VOTE",
  CANCEL_VOTE : "CANCEL_VOTE",
  TRANSFER_TOKEN : "TRANSFER_TOKEN",
  MINT_TOKEN : "MINT_TOKEN",
  FAST_FORWARD_BLOCK : "FAST_FORWARD_BLOCK",
  CHALLENGE_VOTERS : "CHALLENGE_VOTERS",
  RESOLVE_PROPOSAL : "RESOLVE_PROPOSAL",
  TRY_TO_MOVE_TO_VALIDATING : "TRY_TO_MOVE_TO_VALIDATING"
}


const eProposalStatus = {
  Initializing : "0",
  Voting : "1",
  Validating : "2",
  Executed : "3"
}

const eVote = {
  Abstain : "0",
  Yes : "1",
  No : "2",
  INVALID : "3"
}


module.exports = {eVote, eProposalStatus, eContractid, eProposalType, eActionPrefix};

