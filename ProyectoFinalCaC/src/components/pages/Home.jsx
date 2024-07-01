import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleGoToTurnos = () => {
    navigate('/turnos');
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Bienvenido a la Página de Inicio</h1>
      <p className="mb-4">Esta es la página principal de la aplicación.</p>
      <button className="btn btn-primary" onClick={handleGoToTurnos}>
        Ir a Gestión de Turnos
      </button>
    </div>
  );
};

export default Home;
