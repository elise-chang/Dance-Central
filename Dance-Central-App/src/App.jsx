import './App.css';
import Home from './pages/home.jsx';
import Blocking from './pages/blocking.jsx';
import Casting from './pages/casting.jsx';
import Outfits from './pages/outfits.jsx';
import { Navigate, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<Home />} />
      <Route path="/blocking" element={<Blocking />} />
      <Route path="/casting" element={<Casting />} />
      <Route path="/outfits" element={<Outfits />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}

export default App;
