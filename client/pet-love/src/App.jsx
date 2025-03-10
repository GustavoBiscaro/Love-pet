import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

/*componentes */
import Navbar from './COMPONENTS/layout/Navbar';
import Footer from './COMPONENTS/layout/Footer';
import Container from './COMPONENTS/layout/Container'

/*Page */
import Login from './COMPONENTS/pages/Auth/Login';
import Register from './COMPONENTS/pages/Auth/Register';
import Home from './COMPONENTS/pages/Home';
import Message from './COMPONENTS/layout/Message';
import Profile from './COMPONENTS/pages/User/Profile';

/* Context */
import { UserProvider } from './CONTEXT/UserContext';


function App() {


  return (

    <Router>
      <UserProvider>
        <Navbar />
        <Message />
        <Container>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/user/profile' element={<Profile />} />
            <Route path='/' element={<Home />} />
          </Routes>
        </Container>
        <Footer />
      </UserProvider>
    </Router>
  )
}

export default App
