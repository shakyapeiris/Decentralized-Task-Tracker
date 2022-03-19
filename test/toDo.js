const ToDoContract = artifacts.require('./ToDo.sol');

contract('ToDo', (accounts) => {
  let toDoInstance;
  let account;
  before(async () => {
    toDoInstance = await ToDoContract.deployed();
    account = accounts[0];
  });

  it('should add a new task', async () => {
    const result = await toDoInstance.addTask(
      'New task2',
      '25th February 2022',
      { from: account }
    );

    const title = result.logs[0].args.title;
    assert.equal(title, 'New task2');
  });

  it('should recieve tasks', async () => {
    const result = await toDoInstance.getMyTasks({ from: account });
    assert.equal(result[0].title, 'New task2');
  });

  it('should update task status', async () => {
    await toDoInstance.toggleCompleted(0, { from: account });
    const result = await toDoInstance.getMyTasks({ from: account });
    assert.equal(result[0].completed, true);
  });
});
