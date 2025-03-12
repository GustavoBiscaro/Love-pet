import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import styles from './Navbar.module.css'
import Logo from '../../ASSETS/img/logo.png'

/* Context */
import { Context } from '../../CONTEXT/UserContext'

const Navbar = () => {

  const { authenticated, logout } = useContext(Context)
  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.navbar_logo}>
        <img src={Logo} alt="Love Pet" />
        <h2>Love Pet</h2>
      </Link>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {authenticated ? (
          <>
            <li>
              <Link to="/pets/mypets">Meus bichos</Link>
            </li>
            <li>
              <Link to="/user/profile">Perfil</Link>
            </li>
            <li onClick={logout}>Sair</li></>) : (<><li>
              <Link to="/login">Login</Link>
            </li>
              < li >
                <Link to="/register">Registrar</Link>
              </li >
            </>
        )
        }


      </ul >
    </nav >

  )
}

export default Navbar