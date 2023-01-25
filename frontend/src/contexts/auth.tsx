import React, { createContext, useContext, useEffect, useState } from "react";

import api from "../services/api";

import axios from "axios";

interface SignInReturn {
  user: any;
  token: string;
}

interface AuthContextData {
  token: string | null;
  name: string | null;
  checkSession?: boolean;
  signIn(email: string, password: string): Promise<SignInReturn | false>;
  logout(): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface AuthProviderProps {
  children?: any;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [name, setName] = useState<string | null>("");
  const [checkSession, setCheckSession] = useState<boolean>(false);

  useEffect(() => {
    async function load() {
      if (!checkSession) {
        const storagedToken = localStorage.getItem("@ATLAS:token");
        const storagedName = localStorage.getItem("@ATLAS:name");

        if (storagedToken) {
          api.defaults.headers["Authorization"] = `Bearer ${storagedToken}`;

          setCheckSession(true);
          setToken(storagedToken);
          setName(storagedName);
        } else {
          setCheckSession(true);
          setToken(null);
          setName(null);
        }
      }
    }
    load();
  }, [checkSession]);

  async function signIn(
    email: string,
    password: string
  ): Promise<SignInReturn | false> {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/sessions`,
        {
          email: email,
          password: password,
        }
      );

      if (response.data.token) {
        api.defaults.headers["Authorization"] = `Bearer ${response.data.token}`;
        setName(response.data.user.name);
        setToken(response.data.token);

        localStorage.setItem("@ATLAS:token", response.data.token);
        localStorage.setItem("@ATLAS:name", response.data.user.name);
        setCheckSession(true);

        return response ? response.data : false;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }

  async function logout() {
    setToken(null);
    setName(null);

    api.defaults.headers["Authorization"] = ` `;

    localStorage.removeItem("@ATLAS:token");
    localStorage.removeItem("@ATLAS:name");

    window.location.href = "/login";
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        token,
        logout,
        name,
        checkSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
