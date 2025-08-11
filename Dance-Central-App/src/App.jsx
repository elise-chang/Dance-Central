import { useState } from 'react'
import './App.css'
import TestApp from './pages/testing.jsx';
import Home from './pages/home.jsx';
import Blocking from './pages/blocking.jsx';
import Outfits from './pages/outfits.jsx';
import { Route, Routes } from "react-router-dom";

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<TestApp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/blocking" element={<Blocking />} />
        <Route path="/outfits" element={<Outfits />} />
      </Routes>
    </div>
  )
}

export default App
