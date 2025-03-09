import { React, createContext } from 'react'

import useAuth from '../HOOKS/useAuth'

const Context = createContext()

const UserProvider = ({ children }) => {

  const { register } = useAuth()

  return <Context.Provider value={{ register }}>{children}</Context.Provider>
}

export { Context, UserProvider }