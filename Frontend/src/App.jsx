import Navbar from '../src/components/Navbar/Navbar'
import Footer from '../src/components/Footer/Footer'
import Home from '../src/Pages/Home/Home'
import './App.css'
import { useState } from 'react'
import Login from '../src/components/Login/Login'
import{Routes,Route} from 'react-router-dom'
function App() {
const [showLogin,setShowLogin]=useState(false);

  return (
    <>
    {showLogin?<Login/>:null}
    <Navbar/>
    {showLogin && <Login setShowLogin={setShowLogin} />}
      <Navbar setShowLogin={setShowLogin} />

      <Routes>
        <Route path="/" element={<Home />} />
       </Routes>

  
   
    <Footer/>
    </>
  )
}

export default App
