const { exit } = require( "process");
const fs = require("fs");
const { file } = require("tmp-promise");
const SUPPORTED_ETHERSCAN_NETWORKS = ["main", "ropsten", "kovan"];



function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}



module.exports = {delay};