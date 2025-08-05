import { useState } from 'react'
import './App.css'
import TestApp from './pages/testing.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <TestApp />
      <h1>hi</h1>
      <Routes>
      <Route path="/" element={home}></Route>
      </Routes>
    </div>
  )
}

export default App
