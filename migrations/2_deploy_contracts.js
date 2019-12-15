const Dweets = artifacts.require("./Dweets.sol");

module.exports = function(deployer) {
  deployer.deploy(Dweets);
};
