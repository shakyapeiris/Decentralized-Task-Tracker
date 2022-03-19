import React, { useContext, useState } from 'react';
import { web3Context } from './context/web3Context';

import { todoContext } from './context/todoContext';

// class App extends Component {
//   state = { storageValue: 0, web3: null, accounts: null, contract: null };

//   componentDidMount = async () => {};

//   runExample = async () => {
//     const { accounts, contract } = this.state;

//     // Stores a given value, 5 by default.
//     await contract.methods.set(5).send({ from: accounts[0] });

//     // Get the value from the contract to prove it worked.
//     const response = await contract.methods.get().call();

//     // Update state with the result.
//     this.setState({ storageValue: response });
//   };

//   render() {}
// }

const App = () => {
  const web3Ctx = useContext(web3Context);
  const todoCtx = useContext(todoContext);

  const [text, setText] = useState('');
  const [dueDate, setDueDate] = useState('');

  const submitFormHandler = (e) => {
    e.preventDefault();

    todoCtx.addNewTask(text, dueDate);
    setText('');
    setDueDate('');
  };
  if (!web3Ctx.web3) {
    return <div>Loading Web3, accounts, and contract...</div>;
  }
  return (
    <div>
      <form onSubmit={submitFormHandler}>
        <legend>Add task</legend>
        <fieldset>
          <div>
            <label>Enter your task: </label>
            <input
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
          </div>
          <div>
            <label>Due date: </label>
            <input
              onChange={(e) => {
                setDueDate(e.target.value);
              }}
              className="w-[full]"
            />
          </div>
          <button type="submit">Add</button>
        </fieldset>
      </form>

      <table className="border-[1px] border-black border-solid">
        <thead>
          <tr>
            <th>Completed</th>
            <th>Task</th>
            <th>Due date</th>
          </tr>
        </thead>
        <tbody>
          {todoCtx.tasks.map((task, index) => {
            return (
              <tr>
                <tr>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onClick={() => {
                      todoCtx.updateToggled(index);
                    }}
                  />
                </tr>
                <td>{task.title}</td>
                <td>{task.dueIn}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default App;
