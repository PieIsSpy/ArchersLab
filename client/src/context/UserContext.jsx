import { createContext } from "react";

export const UserContext = createContext({
  currentUser: null,
  setUser: (_user) => {},
  setIsAuth: (_val) => {},
  setAdmin: (_val) => {},
  isAdmin: false,
  loading: false,
});
