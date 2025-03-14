import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import RoundedImage from '../../layout/RoundedImage'
import api from '../../../UTILS/api'

import styles from './Dashboard.module.css'

import useFlashMessage from '../../../HOOKS/useFlashMessage'

const MyPets = () => {
  const [pets, setPets] = useState([])
  const [token] = useState(localStorage.getItem('token') || '')
  const { setFlashMessage } = useFlashMessage()

  useEffect(() => {
    api.get('/pets/mypets', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      },
    })
      .then((response) => {
        setPets(response.data.pets)
      })
  }, [token])

  async function removePet(id) {
    let msgType = 'success'

    const data = await api
      .delete(`/pets/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        const updatedPets = pets.filter((pet) => pet._id !== id)
        setPets(updatedPets)
        return response.data
      })
      .catch((err) => {
        console.log(err)
        msgType = 'error'
        return err.response.data
      })

    setFlashMessage(data.message, msgType)
  }

  return (
    <section>
      <div className={styles.petList_header}>
        <h1>Meus Bichinhos</h1>
        <Link to="/pets/add">Cadastrar bicho</Link>
      </div>
      <div className={styles.petList_container}>
        {pets.length > 0 &&
          pets.map((pet) => (
            <div className={styles.petList_row} key={pet._id}>
              <RoundedImage
                src={`${import.meta.env.VITE_API}images/pets/${pet.images[0]}`}
                alt={pet.name}
                width="px75"
              />

              <span className="bold">{pet.name}</span>
              <div className={styles.actions}>
                {pet.available ? (
                  <>
                    {pet.adopter && (
                      <button className={styles.conclude_btn}>Concluir adoção</button>
                    )}
                    <Link to={`/pets/edit/${pet._id}`}>Editar</Link>
                    <button onClick={() => {
                      removePet(pet._id)
                    }} className={styles.delete_btn}>Excluir</button>
                  </>
                ) : (
                  <p>Bichinho já adotado</p>
                )}
              </div>
            </div>
          ))

        }
        {pets.length === 0 && <p>Não há bichinhos cadastrados</p>}
      </div>
    </section>
  )
}

export default MyPets