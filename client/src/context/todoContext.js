import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { web3Context } from './web3Context';

export const todoContext = createContext({
  tasks: [],
  addNewTask: () => {},
  updateToggled: () => {},
});

const ToDoContextProvider = (props) => {
  const [tasks, setTasks] = useState([]);
  const web3Ctx = useContext(web3Context);

  const fetchData = async () => {
    const results = await web3Ctx.contract.methods.getMyTasks().call({
      from: web3Ctx.accounts[0],
    });

    setTasks(results);
  };

  useEffect(() => {
    if (web3Ctx.web3) fetchData();
  }, [fetchData]);

  const addNewTask = async (text, dueDate) => {
    await web3Ctx.contract.methods
      .addTask(text, dueDate)
      .send({ from: web3Ctx.accounts[0] });
    setTasks((curr) => [...curr, text]);
  };

  const updateToggled = async (index) => {
    await web3Ctx.contract.methods
      .toggleCompleted(index)
      .send({ from: web3Ctx.accounts[0] });
    fetchData();
  };

  return (
    <todoContext.Provider value={{ tasks, addNewTask, updateToggled }}>
      {props.children}
    </todoContext.Provider>
  );
};

export default ToDoContextProvider;
