import api from '../../UTILS/api'

import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

import styles from './Home.module.css'
const Home = () => {
  const [pets, setPets] = useState([])

  useEffect(() => {

    api.get('/pets').then((response) => {
      setPets(response.data.pets)

    })

  }, [])

  return (
    <section>
      <div className={styles.pet_home_header}>
        <h1>Adote um Bichinho</h1>
        <p>Veja os detalhes de cada um e conheça o tutor dele</p>
      </div>
      <div className={styles.pet_container}>
        {pets.length > 0 &&
          pets.map((pet) => (
            <div className={styles.pet_card}>
              <div style={{ backgroundImage: `url(${import.meta.env.VITE_API}/images/pets/${pet.images[0]})` }} className={styles.pet_card_image}></div>
              <h3>{pet.name}</h3>
              <p>
                <span className="bold">Peso:</span> {pet.weight}kg
              </p>
              {
                pet.available ? (
                  <Link to={`pets/${pet._id}`}>Saiba mais</Link>
                ) : (
                  <p className={styles.adopted_text}>Adotado</p>
                )
              }
            </div>
          ))
        }
        {pets.length === 0 && (
          <p>Não há bichos cadastrados ou disponíveis para adoção no momento!</p>
        )}
      </div>
    </section>
  )
}

export default Home