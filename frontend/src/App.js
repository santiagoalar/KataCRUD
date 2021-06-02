import React, { useReducer, createContext } from 'react';
import reducer from './reducer';
import List from './List';
import Form from './Form';

export const HOST_API = "http://localhost:8080/api";


const initialState = {
    list: [],
    item: {}
};

export const Store = createContext(initialState);

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <Store.Provider value={{ state, dispatch }}>
    {children}
  </Store.Provider>
}

function App() {
  return <StoreProvider>
    <Form />
    <List />
  </StoreProvider>
}
export default App;