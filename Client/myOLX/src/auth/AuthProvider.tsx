import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getAuthenticationToken } from '../api/auth';

type LoginFn = (username?: string, password?: string) => void;
type LogoutFn = () => void;

export interface AuthState {
  authenticationError: any;
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  login?: LoginFn;
  logout?: LogoutFn;
  pendingAuthentication?: boolean;
  username?: string;
  password?: string;
  token: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isAuthenticating: false,
  authenticationError: null,
  pendingAuthentication: false,
  token: '',
};

export const AuthContext = React.createContext<AuthState>(initialState);

interface AuthProviderProps {
  children: PropTypes.ReactNodeLike,
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, setState] = useState<AuthState>(initialState);
  const { isAuthenticated, isAuthenticating, authenticationError, pendingAuthentication, token } = state;
  const login = useCallback<LoginFn>(loginCallback, []);
  const logout = useCallback<LogoutFn>(logoutCallback, []);
  useEffect(authenticationEffect, [pendingAuthentication]);
  const value = { isAuthenticated, login, logout, isAuthenticating, authenticationError, token };
  
  console.log('AuthProvider render');
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );

  function logoutCallback() : void {
    setState({...state, isAuthenticated: false, token: ''});
    sessionStorage.removeItem("token");
  }

  function loginCallback(username?: string, password?: string): void {
    console.log('AuthProvider login');
    setState({...state, pendingAuthentication: true, username, password});
  }

  function authenticationEffect() {
    let canceled = false;
    authenticate();
    return () => {
      canceled = true;
    }

    async function authenticate() {
      if (!pendingAuthentication) {
        console.log('AuthProvider authenticate, !pendingAuthentication, checking pendingAuthenticationFromToken');
        console.log('AuthProvider token auth');
        setState({ ...state, isAuthenticating: true, });
        let token = sessionStorage.getItem("token");
        if (!token) {
            setState({ ...state, authenticationError: new Error("Empty authentication token"), isAuthenticated: false, isAuthenticating: false});
            return;
        }
        setState({ ...state, token, isAuthenticated: true, isAuthenticating: false});
        return;
      }
      try {
        console.log('AuthProvider authenticate...');
        setState({
          ...state,
          isAuthenticating: true,
        });
        const { username, password } = state;
        
        
        const response = await getAuthenticationToken(username || "", password || "");
        const { access, reset } = response.data;
        if (!access) {
            throw new Error("Empty access token returned from server. Cannot authenticate.");
        }
        if (canceled) {
          return;
        }
        console.log('AuthProvider authenticate succeeded');
        sessionStorage.setItem("token", access);
        setState({...state, token: access, pendingAuthentication: false, isAuthenticated: true, isAuthenticating: false,});
      } catch (error) {
        if (canceled) {
          return;
        }
        console.log('AuthProvider authenticate failed');
        setState({...state, authenticationError: error, pendingAuthentication: false, isAuthenticating: false});
      }
    }
  }
};
