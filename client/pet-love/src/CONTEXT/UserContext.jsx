import { React, createContext } from 'react'

import useAuth from '../HOOKS/useAuth'

const Context = createContext()

const UserProvider = ({ children }) => {

  const { authenticated, register, logout, login } = useAuth()

  return <Context.Provider value={{ authenticated, register, logout, login }}>{children}</Context.Provider>
}

export { Context, UserProvider }