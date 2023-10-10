"use client"
import { createContext, useContext, useReducer, useEffect, useState } from "react"
import { usePathname } from 'next/navigation';
import { POST } from "../api/api";
import { getToken } from "../utils/apiHelper";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

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
  const [state, dispatch] = useReducer(userReducer, initialState);
  const [initialLoading, setInitialLoading] = useState(true);

  const path = usePathname();

  useEffect(() => {
    if (path === '/login') {
      setInitialLoading(false);
      return;
    }

    const verifyToken = async () => {
      try {
        const token = getToken();
        const response = await POST('tokens/verify', {token})

        if (response.status === 200) {
          const { user } = response.data ;
          dispatch({ type: 'SET_USER', payload: user });
        }
      } catch (error) {
        console.error('Verification request failed:', error);
        dispatch({ type: 'CLEAR_USER' });
      } finally {
        setInitialLoading(false);
      }
    };

    verifyToken();
  }, [path]);

  if (initialLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user: state.user, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);