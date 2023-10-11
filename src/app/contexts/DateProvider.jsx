import React, { createContext, useContext, useReducer } from "react";

const DateContext = createContext();

const dateReducer = (state, action) => {
  switch (action.type) {
    case 'SET_DATE':
      return new Date(action.payload);
    default:
      return state;
  }
};

export const DateProvider = ({ children }) => {
  const [currentDate, dispatch] = useReducer(dateReducer, new Date());

  return (
    <DateContext.Provider value={{ currentDate, dispatch }}>
      {children}
    </DateContext.Provider>
  );
};

export const useDateContext = () => useContext(DateContext)
