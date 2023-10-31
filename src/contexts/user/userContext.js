import { createContext, useContext, useReducer } from "react";

const UserContext = createContext();

const UserReducer = (state, action) => {
  switch (action.type) {
    case "SIGN_UP":
      return { ...state, user: action.payload };
    case "SIGN_IN":
      return { ...state, user: action.payload };
    case "SIGN_OUT":
      return { ...state, user: null };
    case "UPDATE_USER":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  const initialState = {
    user: localStorage.getItem("real_state-user")
      ? JSON.parse(localStorage.getItem("real_state-user"))
      : null,
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        dispatch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

export default UserContext;
