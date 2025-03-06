import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

/*componentes */
import Navbar from './COMPONENTS/layout/Navbar';
import Footer from './COMPONENTS/layout/Footer';

/*Page */
import Login from './COMPONENTS/pages/Auth/Login';
import Register from './COMPONENTS/pages/Auth/Register';
import Home from './COMPONENTS/pages/Auth/Home';

function App() {


  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Home />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
