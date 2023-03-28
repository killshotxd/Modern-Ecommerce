import { createContext, useContext, useEffect, useState } from "react";

// create context
const AuthContext = createContext();

//Provider Context
export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);

  const value = {};
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
