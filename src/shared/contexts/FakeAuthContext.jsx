import { createContext, useContext, useReducer } from "react";

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const initialState = {
  isAuthenticated: false,
  user: null,
};

const reducerFn = (state, action) => {
  switch (action.type) {
    case "login": {
      return { ...state, isAuthenticated: true, user: FAKE_USER };
    }
    case "logout": {
      return { ...state, isAuthenticated: false, user: null };
    }
    default:
      throw new Error("unknown auth Action");
  }
};

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducerFn,
    initialState
  );

  const login = (email, password) => {
    if (email !== FAKE_USER.email || password !== FAKE_USER.password) return;
    dispatch({ type: "login", payload: FAKE_USER });
  };

  const logout = () => {
    dispatch({ type: "logout" });
  };

  return (
    <AuthContext.Provider value={{ login, logout, user, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  if (useContext(AuthContext) === undefined)
    throw new Error(
      "You are trying to access auth context outside its provider"
    );
  return useContext(AuthContext);
};

export { AuthProvider, useAuthContext };
