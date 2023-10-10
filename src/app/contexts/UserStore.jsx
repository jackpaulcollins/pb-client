"use client"
import { createContext, useContext, useReducer } from "react"

const UserContext = createContext({
  user: {},
  setUser: () => "",
});

export const UserContextProvider = ({ children }) => {
  const userReducer = (state, action) => {
    switch (action.type) {
      case 'SET_USER':
        return { ...state, user: action.payload };
      case 'SET_DATA':
        return { ...state, data: action.payload };
      case 'CLEAR_USER':
        return { ...state, data: {} };
      default:
        return state;
    }
  };

  const initialState = {};
  const [state, dispatch] = useReducer(userReducer, initialState)

  return (
    <UserContext.Provider value={{ user: state.user, dispatch }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => useContext(UserContext);