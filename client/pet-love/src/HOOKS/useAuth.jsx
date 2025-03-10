import { useNavigate } from 'react-router-dom'
import api from '../UTILS/api'
import useFlashMessage from './useFlashMessage'
import { useState, useEffect } from 'react'

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false) // Corrigido useState
  const navigate = useNavigate() // substituiu o history
  const setFlashMessage = useFlashMessage()

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
      setAuthenticated(true)
    }
  }, [])

  async function register(user) {
    let msgText = 'Cadastro realizado com sucesso!'
    let msgType = 'success'

    try {
      const { data } = await api.post('/users/register', user)

      await authUser(data)

      navigate('/') // Redirecionar após o cadastro bem-sucedido
    } catch (error) {
      msgText = error.response?.data?.message || 'Ocorreu um erro'
      msgType = 'error'
    }

    setFlashMessage(msgText, msgType)
  }


  async function login(user) {
    let msgText = 'Login realizado com sucesso'
    let msgType = 'success'

    try {

      const data = await api.post('/users/login', user).then((response) => {
        return response.data
      })

      await authUser(data)
    } catch (error) {
      msgText = error.response?.data?.message || 'Ocorreu um erro'
      msgType = 'error'
    }
    setFlashMessage(msgText, msgType)
  }

  async function authUser(data) {
    setAuthenticated(true)
    localStorage.setItem('token', JSON.stringify(data.token))
    navigate('/')
  }

  function logout() {
    const msgText = 'Logout realizado com sucesso!'
    const msgType = 'success'

    setAuthenticated(false)
    localStorage.removeItem('token')
    api.defaults.headers.Authorization = undefined
    navigate('/')

    setFlashMessage(msgText, msgType)
  }

  return { authenticated, register, logout, login }
}
