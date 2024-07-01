import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const UserForm = () => {
    const [nombreRegistro, setNombreRegistro] = useState('');
    const [emailRegistro, setEmailRegistro] = useState('');
    const [contraseñaRegistro, setContraseñaRegistro] = useState('');
    const [nombreEdicion, setNombreEdicion] = useState('');
    const [emailEdicion, setEmailEdicion] = useState('');
    const [usuarios, setUsuarios] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [usuarioEditando, setUsuarioEditando] = useState(null);

    useEffect(() => {
        cargarUsuarios();
    }, []);

    const cargarUsuarios = async () => {
        try {
            const response = await axios.get('http://localhost:4000/usuarios');
            setUsuarios(response.data.usuarios);
        } catch (error) {
            console.error('Error al cargar usuarios:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error al cargar usuarios',
                text: 'Hubo un problema al cargar la lista de usuarios.'
            });
        }
    };

    const handleSubmitRegistro = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/registrar', {
                nombre: nombreRegistro,
                email: emailRegistro,
                contraseña: contraseñaRegistro
            });
            Swal.fire({
                icon: 'success',
                title: 'Usuario registrado correctamente',
                showConfirmButton: false,
                timer: 1500
            });
            cargarUsuarios(); // Recargar la lista de usuarios después de registrar uno nuevo
            // Limpiar campos de registro
            setNombreRegistro('');
            setEmailRegistro('');
            setContraseñaRegistro('');
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error al registrar usuario',
                text: error.response.data.error
            });
        }
    };

    const handleEditarUsuario = (usuario) => {
        setUsuarioEditando(usuario);
        setNombreEdicion(usuario.nombre);
        setEmailEdicion(usuario.email);
        setModalShow(true);
    };

    const handleGuardarEdicion = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.patch(`http://localhost:4000/usuarios/${usuarioEditando.id}`, {
                nombre: nombreEdicion,
                email: emailEdicion
            });
            Swal.fire({
                icon: 'success',
                title: 'Usuario actualizado correctamente',
                showConfirmButton: false,
                timer: 1500
            });
            setModalShow(false);
            cargarUsuarios(); // Recargar la lista de usuarios después de editar uno
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error al actualizar usuario',
                text: error.response.data.error
            });
        }
    };

    const handleEliminarUsuario = (usuario) => {
        Swal.fire({
            title: `¿Estás seguro de eliminar al usuario ${usuario.nombre}?`,
            text: 'Esta acción no se puede deshacer.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                eliminarUsuario(usuario.id);
            }
        });
    };

    const eliminarUsuario = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:4000/usuarios/${id}`);
            Swal.fire({
                icon: 'success',
                title: 'Usuario eliminado correctamente',
                showConfirmButton: false,
                timer: 1500
            });
            cargarUsuarios(); // Recargar la lista de usuarios después de eliminar uno
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error al eliminar usuario',
                text: error.response.data.error
            });
        }
    };

    return (
        <div className="container">
            <h2>Registro de Usuario</h2>
            <form onSubmit={handleSubmitRegistro}>
                <div className="mb-3">
                    <label className="form-label">Nombre:</label>
                    <input type="text" className="form-control" value={nombreRegistro} onChange={(e) => setNombreRegistro(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email:</label>
                    <input type="email" className="form-control" value={emailRegistro} onChange={(e) => setEmailRegistro(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Contraseña:</label>
                    <input type="password" className="form-control" value={contraseñaRegistro} onChange={(e) => setContraseñaRegistro(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Registrar</button>
            </form>

            <h2>Usuarios Registrados</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map(usuario => (
                        <tr key={usuario.id}>
                            <td>{usuario.id}</td>
                            <td>{usuario.nombre}</td>
                            <td>{usuario.email}</td>
                            <td>
                                <button className="btn btn-primary me-2" onClick={() => handleEditarUsuario(usuario)}>Editar</button>
                                <button className="btn btn-danger" onClick={() => handleEliminarUsuario(usuario)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal para editar usuario */}
            <Modal show={modalShow} onHide={() => setModalShow(false)} size="md" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleGuardarEdicion}>
                        <div className="mb-3">
                            <label className="form-label">Nombre:</label>
                            <input type="text" className="form-control" value={nombreEdicion} onChange={(e) => setNombreEdicion(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email:</label>
                            <input type="email" className="form-control" value={emailEdicion} onChange={(e) => setEmailEdicion(e.target.value)} />
                        </div>
                        <div className="modal-footer">
                            <Button variant="secondary" onClick={() => setModalShow(false)}>
                                Cancelar
                            </Button>
                            <Button variant="primary" type="submit">
                                Guardar Cambios
                            </Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

        </div>
    );
};

export default UserForm;
