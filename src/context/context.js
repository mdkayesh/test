import { createContext, useContext, useReducer } from "react";
import actionReducer from "./actionReducer";

const Context = createContext();

const initialState = {
  user: JSON.parse(localStorage.getItem("user"))
    ? JSON.parse(localStorage.getItem("user"))
    : null,
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(actionReducer, initialState);

  const getUser = (payload) => {
    dispatch({ type: "GET_USER", payload: payload });
  };

  const LogOut = () => {
    dispatch({ type: "LOG_OUT" });
  };

  return (
    <Context.Provider value={{ ...state, getUser, LogOut }}>
      {children}
    </Context.Provider>
  );
};

// custom hook

export const useAuthProvider = () => {
  return useContext(Context);
};

export default AuthProvider;
