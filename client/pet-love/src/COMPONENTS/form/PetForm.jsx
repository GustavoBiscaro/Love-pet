import React, { useState } from 'react'

import formStyles from './Form.module.css'

import Input from './Input'
import Select from './Select'

const PetForm = ({ handleSubmit, petData, btnText }) => {
  const [pet, setPet] = useState(petData || {})
  const [preview, setPreview] = useState([])
  const colors = ["Branco", "Preto", "Cinza", "Caramelo", "Variado"]

  function onFileChange(e) {
    setPreview(Array.from(e.target.files))
    setPet({ ...pet, images: [...e.target.files] })
  }

  function handleChange(e) {
    setPet({ ...pet, [e.target.name]: e.target.value })
  }

  function handleColor(e) {
    setPet({ ...pet, color: e.target.options[e.target.selectedIndex].text })
  }

  function submit(e) {
    e.preventDefault();
    handleSubmit(pet)
  }

  return (
    <form onSubmit={submit} className={formStyles.form_container}>
      <div className={formStyles.preview_pet_images}>
        {preview.length > 0
          ? preview.map((image, index) => (

            <img src={URL.createObjectURL(image)}
              alt={pet.name}
              key={`${pet.name} + ${index}`}
            />

          )) :
          pet.images && pet.images.map((image, index) => (
            <img src={`${import.meta.env.VITE_API}images/pets/${image}`}
              alt={pet.name}
              key={`${pet.name} + ${index}`}
            />
          ))

        }
      </div>
      <Input
        text="Imagens do Bicho"
        type="file"
        name="images"
        handleOnChange={onFileChange}
        multiple={true}
      />
      <Input
        text="Nome do Bicho"
        type="text"
        name="name"
        placeholder="Digite o nome"
        handleOnChange={handleChange}
        value={pet.name || ''}
      />
      <Input
        text="Idade do Bicho"
        type="text"
        name="age"
        placeholder="Digite a idade"
        handleOnChange={handleChange}
        value={pet.age || ''}
      />

      <Input
        text="Peso do Bicho"
        type="text"
        name="weight"
        placeholder="Digite o peso"
        handleOnChange={handleChange}
        value={pet.weight || ''}
      />

      <Select
        name="color"
        text="Selecione a cor"
        options={colors}
        handleOnChange={handleColor}
        value={pet.color || ''}

      />

      <input type="submit" value={btnText} />


    </form>
  )
}

export default PetForm