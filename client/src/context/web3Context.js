import React, { createContext, useEffect, useState } from 'react';
import ToDoContract from '../contracts/ToDo.json';
import getWeb3 from '../getWeb3';

export const web3Context = createContext({
  contract: null,
  accounts: null,
  web3: null,
});

const Web3ContextProvider = (props) => {
  const [contract, setContract] = useState();
  const [accounts, setAccounts] = useState();
  const [web3, setWeb3] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get network provider and web3 instance.
        const web3 = await getWeb3();

        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();

        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = ToDoContract.networks[networkId];
        const instance = new web3.eth.Contract(
          ToDoContract.abi,
          deployedNetwork && deployedNetwork.address
        );

        instance.options.address = '0x63bb6a16330b0A3676E2643c44Cf3A78792BC6a7';

        // Set web3, accounts, and contract to the state, and then proceed with an
        // example of interacting with the contract's methods.
        setAccounts(accounts);
        setContract(instance);
        setWeb3(web3);
      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`
        );
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const values = {
    contract,
    accounts,
    web3,
  };
  return (
    <web3Context.Provider value={values}>{props.children}</web3Context.Provider>
  );
};

export default Web3ContextProvider;
