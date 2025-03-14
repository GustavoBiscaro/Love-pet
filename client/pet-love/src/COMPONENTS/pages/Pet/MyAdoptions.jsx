import React, { useEffect, useState } from 'react'
import styles from './Dashboard.module.css'
import api from '../../../UTILS/api'
import RoundedImage from '../../layout/RoundedImage'




const MyAdoptions = () => {
  const [pets, setPets] = useState([])
  const [token] = useState(localStorage.getItem('token') || '')

  useEffect(() => {
    api.get('/pets/myadoptions', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((response) => {
      setPets(response.data.pets)
      console.log(pets)
    })
  }, [token])
  return (
    <section>
      <div className={styles.petlist_header}>
        <h1>Adoções</h1>
      </div>
      <div className={styles.petlist_container}>
        {pets.length > 0 &&
          pets.map((pet) => (
            <div key={pet._id} className={styles.petlist_row}>
              <div className={styles.petList_row} key={pet._id}>
                <RoundedImage
                  src={`${import.meta.env.VITE_API}images/pets/${pet.images[0]}`}
                  alt={pet.name}
                  width="px75"
                />

                <span className="bold">{pet.name}</span>
                <div className={styles.contacts}>
                  <p>
                    <span className='bold'>Ligue para:</span> {pet.user.phone}
                  </p>
                  <p>
                    <span className='bold'>Fale com:</span> {pet.user.name}
                  </p>
                </div>
                <div className={styles.actions}>
                  {pet.available ? (
                    <p>Adoção em processo</p>
                  ) : (
                    <p>Parabéns por concluir a adoção.</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        {pets.length === 0 && <p>Ainda não existem Adoções.</p>}
      </div>
    </section>
  )
}

export default MyAdoptions