import React from "react";
import "./App.css";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import { Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar/Navbar";
import Home from "./pages/Home/Home";
import AddB2c from "./pages/Add_b2c/Add_b2c";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<Add />} />
        <Route path="/add_b2c" element={<AddB2c />} />
        <Route path="/list" element={<List />} />
      </Routes>
    </>
  );
}

export default App;
