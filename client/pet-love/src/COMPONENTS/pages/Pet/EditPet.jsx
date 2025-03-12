import React, { useEffect, useState } from 'react'
import api from '../../../UTILS/api'

import styles from './AddPet.module.css'

import PetForm from '../../form/PetForm'

import useFlashMessage from '../../../HOOKS/useFlashMessage'

const EditPet = () => {
  return (
    <section>
      <div className={styles.addpet_header}>
        <h1>Editando o Pet: 'pet.name'</h1>
        <p>Após finalizar a edição, os dados serão atualizados!</p>
      </div>
    </section>
  )
}

export default EditPet