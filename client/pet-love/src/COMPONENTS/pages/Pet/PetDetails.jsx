import api from '../../../UTILS/api'

import React, { useEffect, useState } from 'react'

import styles from './PetDetails.module.css'
import { useParams, Link } from 'react-router-dom'

import useFlashMessage from '../../../HOOKS/useFlashMessage'

const PetDetails = () => {
  const [pet, setPet] = useState({})
  const { id } = useParams()
  const setFlashMessage = useFlashMessage()
  const [token] = useState(localStorage.getItem('token') || '')

  useEffect(() => {
    api.get(`/pets/${id}`).then((response) => {
      setPet(response.data.pet)
    })
  }, [id])

  async function schedule() {

    let msgType = 'success'

    const data = await api({
      method: 'patch',
      url: `/pets/schedule/${pet._id}`,
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((res) => {
      return res.data
    })
      .catch((err) => {
        msgType = 'error'
        return err.response.data
      })

    setFlashMessage(data.message, msgType)
  }


  return (
    <>
      {pet.name && (
        <section className={styles.pet_details_container}>
          <div className={styles.pet_details_header}>
            <h1>Conhecendo o Bichinho: {pet.name}</h1>
            <p>Caso haja interesse, agende uma visita!</p>
          </div>
          <div className={styles.pet_images}>
            {pet.images.map((image, index) => (
              <img
                src={`${import.meta.env.VITE_API}images/pets/${image}`}
                alt={pet.name}
                key={index}
              />
            ))}
          </div>
          <p>
            <span className="bold">Peso:</span> {pet.weight}kg
          </p>
          <p>
            <span className="bold">Idade:</span> {pet.age} anos
          </p>
          {token ? (
            <button onClick={schedule}>Solicitar uma visita</button>
          ) : (
            <p className={styles.advice_msg}>Você precisa <Link className={styles.warning_account} to="/register">criar uma conta</Link> para solicitação de visita. </p>
          )}
        </section>
      )}
    </>
  )
}

export default PetDetails