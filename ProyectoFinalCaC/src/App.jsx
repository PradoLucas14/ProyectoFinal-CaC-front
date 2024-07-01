import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/pages/Home';
import Turnos from './components/pages/Turnos';
import './App.css'; // Puedes usar este archivo para estilos personalizados si es necesario

const App = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">Mi Aplicación</a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/turnos">Gestión de Turnos</Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/turnos" element={<Turnos />} />
          <Route path="*" element={<h2>404 No Encontrado</h2>} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
