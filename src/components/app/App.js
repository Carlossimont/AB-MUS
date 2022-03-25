
import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Room from '../room/Room';
import Lobby from '../lobby/Lobby';
import Header from '../header/Header';
import Login from '../login/Login'
import Teams from '../teams/Teams'
import CreateRoom from '../createroom/Createroom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Lobby />} />
        <Route path="/login" element={<Login />} />
        <Route path="/teams" element={<Teams />} /> 
        <Route path="/createroom" element={<CreateRoom />} /> 
      </Routes>
    </BrowserRouter>
  )
}

export default App;
