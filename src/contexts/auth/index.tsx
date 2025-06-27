import { createContext, useEffect, useState } from "react";

type AuthContextProps = {
  authStatus: AuthStatus;
  handleAuthenticate: (token: string) => void;
  handleLogout: () => void;
};

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

const AuthStatus = {
  PENDING: "pending",
  AUTHORIZED: "authorized",
  UNAUTHORIZED: "unauthorized",
} as const;

type AuthStatus = (typeof AuthStatus)[keyof typeof AuthStatus];

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [authStatus, setAuthStatus] = useState<AuthStatus>(AuthStatus.PENDING);

  const handleAuthenticate = (token: string) => {
    localStorage.setItem("@session:token", token);
    setAuthStatus(AuthStatus.AUTHORIZED);
  };

  const handleLogout = () => {
    localStorage.removeItem("@session:token");
    setAuthStatus(AuthStatus.UNAUTHORIZED);
  };

  useEffect(() => {
    const token = localStorage.getItem("@session:token");

    if (!token) {
      setAuthStatus(AuthStatus.UNAUTHORIZED);
    } else {
      setAuthStatus(AuthStatus.AUTHORIZED);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ authStatus, handleAuthenticate, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
