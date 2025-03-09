import { React, useContext, useState } from 'react'
import Input from '../../form/Input'
import styles from '../../form/Form.module.css'
import { Link } from 'react-router-dom'

/* Contexts */
import { Context } from '../../../CONTEXT/UserContext'



const Register = () => {
  const [user, setUser] = useState({})
  const { register } = useContext(Context)

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    register(user)

  }


  return (
    <section className={styles.form_container}>
      <h1>Cadastre-se</h1>
      <form onSubmit={handleSubmit}>
        <Input text="Nome"
          type="text"
          name="name"
          placeholder="Digite o nome"
          handleOnChange={handleChange}
        />

        <Input text="Telefone"
          type="text"
          name="phone"
          placeholder="Telefone"
          handleOnChange={handleChange}
        />

        <Input text="E-mail"
          type="email"
          name="email"
          placeholder="Seu e-mail"
          handleOnChange={handleChange}
        />

        <Input text="Senha"
          type="password"
          name="password"
          placeholder="Sua senha"
          handleOnChange={handleChange}
        />
        <Input text="Confirmação de senha"
          type="password"
          name="confirmpassword"
          placeholder="Confirme a sua senha"
          handleOnChange={handleChange}
        />

        <input type="submit" value="Registrar" />
      </form>
      <p>
        Já tem conta? <Link to="/login">Clique aqui</Link>
      </p>
    </section>
  )
}

export default Register