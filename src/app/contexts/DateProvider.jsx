import React, { createContext, useContext, useReducer } from "react";
import { toDate, format } from 'date-fns';

const DateContext = createContext();

const formatDate = (rawDate) => {
  return format(toDate(rawDate), 'MMMM d, yyyy')
}

const dateReducer = (state, action) => {
  switch (action.type) {
    case 'SET_DATE':
      return { date: action.payload };
    default:
      return state;
  }
};

export const DateProvider = ({ children }) => {
  const [date, dispatch] = useReducer(dateReducer, formatDate(new Date()));

  return (
    <DateContext.Provider value={{ date, dispatch }}>
      {children}
    </DateContext.Provider>
  );
};

export const useDateContext = () => useContext(DateContext)
