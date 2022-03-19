const ToDoContract = artifacts.require('./ToDo.sol');

module.exports = (deployer) => {
  deployer.deploy(ToDoContract);
};
