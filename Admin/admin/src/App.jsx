import React from 'react'
import './App.css'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import { Routes, Route} from "react-router-dom";
import Navbar from './component/Navbar/Navbar';
import Home from './pages/Home/Home';
function App() {
  

  return (
    <>
    <Navbar/>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/add" element={<Add />} />
        <Route path="/add_b2c" element={<Add />} />
        <Route path="/list" element={<List />} />
        
      </Routes>
    </>
  )
}

export default App
