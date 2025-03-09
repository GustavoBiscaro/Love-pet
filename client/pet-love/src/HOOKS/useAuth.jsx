// trocar para navigate('/')
// history.push('/) -> navigate('/)

import { useNavigate } from 'react-router-dom'
import api from '../UTILS/api'
import useFlashMessage from './useFlashMessage'

export default function useAuth() {
  const navigate = useNavigate() // Adicionando navigate corretamente
  const setFlashMessage = useFlashMessage()

  async function register(user) {
    let msgText = 'Cadastro realizado com sucesso!'
    let msgType = 'success'

    try {
      const { data } = await api.post('/users/register', user)
      console.log(data)

      // Redirecionar para a home após o cadastro bem-sucedido
      navigate('/')

    } catch (error) {
      msgText = error.response?.data?.message || 'Ocorreu um erro'
      msgType = 'error'
    }

    setFlashMessage(msgText, msgType) // Corrigido para chamar a função corretamente
  }

  return { register }
}
