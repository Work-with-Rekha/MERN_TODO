// import React, { createContext, useEffect, useState } from "react";

// export const AuthContext = createContext<{
//   isLoggedIn: boolean;
// }>({
//   isLoggedIn: false,
// });

// type AuthProviderProps = {
//   children: React.ReactNode;
// };

// const AuthProvider = ({ children }: AuthProviderProps) => {
//   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

//   async function getToken() {
//     try {
//       const token = await localStorage.getItem("access_token");
//       console.log(token);
//       setIsLoggedIn(!!token); // Set isLoggedIn based on the presence of the token
//     } catch (error) {
//       setIsLoggedIn(false); // Set isLoggedIn to false if there's an error or no token
//     }
//   }
//   useEffect(() => {
//     getToken();
//   }, [getToken]);

//   return <AuthContext.Provider value={{ isLoggedIn }}>{children}</AuthContext.Provider>;
// };

// export default AuthProvider;
import React, { createContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const AuthContext = createContext<{
  user: string;
  logout: () => void;
  login: (data: string) => Promise<void>;
}>({ user: "", logout: () => {}, login: async () => {} });

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useLocalStorage("access_token", null);

  const navigate = useNavigate();

  const login = async (data: string) => {
    setUser(data);
    navigate("/");
  };

  const logout = () => {
    setUser(null);
    navigate("/login", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
