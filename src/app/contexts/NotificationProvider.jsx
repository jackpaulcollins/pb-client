"use client"
import { createContext, useContext, useReducer, useState } from "react"

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {

  const notificationReducer = (state, action) => {
    console.log(action)
    const { title, message, icon } = action.payload;
    switch (action.type) {
      case 'SET_NOTIFICATION':
        return { ...state, title, message, icon };
      case 'CLEAR_NOTIFICATION':
        return { ...state, title: null, message: null, icon: null };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(notificationReducer, { title: null, message: null, icon: null});

  return (
    <NotificationContext.Provider value={{ title: state.title, message: state.message, icon: state.user, dispatch }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => useContext(NotificationContext);