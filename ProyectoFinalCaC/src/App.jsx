// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home';
import Turnos from './components/pages/Turnos';
import Login from './components/pages/Login';
import Usuarios from './components/pages/Usuarios';
import Tareas from './components/pages/Tareas';
import Navbar from './components/Layout/NavBar'; // Importar el componente Navbar

const App = () => {
  return (
    <Usuarios/>
  );
};

export default App;
