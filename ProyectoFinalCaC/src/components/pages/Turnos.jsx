import React, { useState, useEffect } from 'react';
import { Table, Button, Form, InputGroup, FormControl, Modal } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2'; // Importa SweetAlert2

const Turnos = () => {
  const [turnos, setTurnos] = useState([]);
  const [newTurno, setNewTurno] = useState({
    nombre_cliente: '',
    fecha: '',
    hora_inicio: '',
    hora_fin: '',
    estado: '',
  });

  const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal

  // Fetch turnos from the backend
  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/turnos');
        setTurnos(response.data);
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo cargar la lista de turnos.',
        });
      }
    };

    fetchTurnos();
  }, []);

  const handleAddTurno = async () => {
    try {
      const response = await axios.post('http://localhost:5000/turnos', newTurno);
      setTurnos([...turnos, response.data]);
      setNewTurno({
        nombre_cliente: '',
        fecha: '',
        hora_inicio: '',
        hora_fin: '',
        estado: '',
      });
      setShowModal(false); // Oculta el modal después de agregar el turno
      Swal.fire({
        icon: 'success',
        title: 'Turno Agregado',
        text: 'El nuevo turno se ha agregado correctamente.',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo agregar el turno.',
      });
    }
  };

  const handleDeleteTurno = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/turnos/${id}`);
      setTurnos(turnos.filter(turno => turno.id !== id));
      Swal.fire({
        icon: 'success',
        title: 'Eliminado',
        text: 'El turno se ha eliminado correctamente.',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo eliminar el turno.',
      });
    }
  };

  const handleUpdateTurno = async (id, updatedTurno) => {
    try {
      const response = await axios.put(`http://localhost:5000/turnos/${id}`, updatedTurno);
      setTurnos(turnos.map(turno => (turno.id === id ? response.data : turno)));
      Swal.fire({
        icon: 'success',
        title: 'Actualizado',
        text: 'El turno se ha actualizado correctamente.',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo actualizar el turno.',
      });
    }
  };

  return (
    <div className="container mt-5">
      <h1>Gestión de Turnos</h1>

      <Button variant="primary" onClick={() => setShowModal(true)}>Registrar Turno</Button>

      {/* Modal para el formulario de registro */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Registrar Turno</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Nombre del Cliente"
              value={newTurno.nombre_cliente}
              onChange={(e) => setNewTurno({ ...newTurno, nombre_cliente: e.target.value })}
            />
            <FormControl
              placeholder="Fecha (YYYY-MM-DD)"
              value={newTurno.fecha}
              onChange={(e) => setNewTurno({ ...newTurno, fecha: e.target.value })}
            />
            <FormControl
              placeholder="Hora Inicio (HH:MM:SS)"
              value={newTurno.hora_inicio}
              onChange={(e) => setNewTurno({ ...newTurno, hora_inicio: e.target.value })}
            />
            <FormControl
              placeholder="Hora Fin (HH:MM:SS)"
              value={newTurno.hora_fin}
              onChange={(e) => setNewTurno({ ...newTurno, hora_fin: e.target.value })}
            />
            <FormControl
              placeholder="Estado"
              value={newTurno.estado}
              onChange={(e) => setNewTurno({ ...newTurno, estado: e.target.value })}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleAddTurno}>
            Agregar Turno
          </Button>
        </Modal.Footer>
      </Modal>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre Cliente</th>
            <th>Fecha</th>
            <th>Hora Inicio</th>
            <th>Hora Fin</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {turnos.map((turno, index) => (
            <tr key={turno.id}>
              <td>{index + 1}</td>
              <td>{turno.nombre_cliente}</td>
              <td>{turno.fecha}</td>
              <td>{turno.hora_inicio}</td>
              <td>{turno.hora_fin}</td>
              <td>{turno.estado}</td>
              <td>
                <Button variant="danger" onClick={() => handleDeleteTurno(turno.id)}>Eliminar</Button>
                {/* Aquí podrías agregar un botón para editar el turno */}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Turnos;
