import React from 'react'
import { Link } from 'react-router-dom'

import styles from './Navbar.module.css'
import Logo from '../../ASSETS/img/logo.png'

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_logo}>
        <img src={Logo} alt="Love Pet" />
        <h2>Love Pet</h2>
      </div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Registro</Link>
        </li>
      </ul>
    </nav>

  )
}

export default Navbar