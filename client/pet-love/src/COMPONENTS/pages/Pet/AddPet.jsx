import React, { useState } from 'react'

import api from '../../../UTILS/api'

import styles from './AddPet.module.css'
import { useNavigate } from 'react-router-dom' // no lugar do useHistory
import PetForm from '../../form/PetForm'


import useFlashMessage from '../../../HOOKS/useFlashMessage'



const AddPet = () => {
  const [token] = useState(localStorage.getItem('token') || '')
  const setFlashMessage = useFlashMessage()
  const navigate = useNavigate()

  async function registerPet(pet) {
    let msgType = 'success'

    const formData = new FormData()

    const petFormData = await Object.keys(pet).forEach((key) => {
      if (key === 'images') {
        for (let i = 0; i < pet[key].length; i++) {
          formData.append(`images`, pet[key][i])
        }
      } else {
        formData.append(key, pet[key])
      }
    })

    formData.append('pet', petFormData)

    const data = await api.post('pets/create', formData, {
      Authorization: `Bearer ${JSON.parse(token)}`,
      'Content-Type': 'multipart/form-data'
    })
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        msgType = 'error'
        return err.response.data
      })

    setFlashMessage(data.message, msgType)
    if (msgType !== 'error') {
      navigate('/pets/mypets')
    }
  }

  return (
    <section className={styles.addpet_header}>
      <div>
        <h1>Cadastre um bichinho</h1>
        <p>Depois ficará disponível para adoção</p>
      </div>
      <PetForm handleSubmit={registerPet} btnText="Cadastrar Bicho" />
    </section>
  )
}

export default AddPet