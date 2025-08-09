import { useState } from 'react'
import './App.css'
import TestApp from './pages/testing.jsx';
import Home from './pages/home.jsx';
import { Route, Routes } from "react-router-dom";

function App() {

  return (
    <div>
      <TestApp />
      <Routes>
        <Route path="/home" element={<Home/>} />
      </Routes>
    </div>
  )
}

export default App
