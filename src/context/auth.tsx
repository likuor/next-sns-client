'use client'

import apiClient from '@/libs/apiClient';
import { createContext, useContext, ReactNode, useEffect, useState } from 'react';

interface AuthContextType {
  user: null | {
    id: number,
    email: string,
    username: string
  }
  login: (token: string) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => { },
  logout: () => { }
})

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<null | { id: number, email: string, username: string }>(null)

  useEffect(() => {
    // if user is loggedin already by token, set the user id
    const token = localStorage.getItem('auth_token')
    if (token) {
      apiClient.defaults.headers['Authorization'] = `Bearer ${token}`

      apiClient
        .get('/users/find')
        .then((res) => {
          setUser(res.data)
        })
        .catch((error) => {
          console.error(error);
        })
    }
  }, [])

  const login = async (token: string) => {
    localStorage.setItem("auth_token", token)
    apiClient.defaults.headers['Authorization'] = `Bearer ${token}`

    try {
      apiClient
        .get('/users/find')
        .then((res) => {
          setUser(res.data.user)
        })
    } catch (error) {
      console.error(error);
    }
  }

  const logout = () => {
    localStorage.removeItem("auth_token")
    delete apiClient.defaults.headers['Authorization']
    setUser(null)
  }

  const value = {
    user,
    login,
    logout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
