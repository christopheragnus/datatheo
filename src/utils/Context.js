import React, { createContext, useContext, useReducer } from "react";

export const ListContext = createContext(null);

export const ListContextProvider = ({ reducer, initialState, children }) => (
  <ListContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </ListContext.Provider>
);

export const useStateValue = () => useContext(ListContext);
