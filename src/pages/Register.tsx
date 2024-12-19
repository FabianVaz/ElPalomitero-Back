import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/register`, {
        name,
        email,
        password,
      });

      // Mostrar mensaje de éxito y redirigir después de 2 segundos
      setSuccess('Registro exitoso. Redirigiendo...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError('Hubo un problema con el registro. Inténtalo de nuevo.');
    }
  };

  return (
    <div className="bg-black text-white min-vh-100 d-flex align-items-center justify-content-center">
      <div className="bg-danger p-4 rounded shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4">Registro</h2>
        {error && <p className="text-white bg-dark p-2 rounded">{error}</p>}
        {success && <p className="text-white bg-success p-2 rounded">{success}</p>}
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Nombre Completo</label>
            <input
              type="text"
              id="name"
              className="form-control"
              placeholder="Ingrese su nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Ingrese su correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              className="form-control"
              placeholder="Confirme su contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-dark w-100">Registrarse</button>
        </form>
        <p className="mt-3 text-center">
          ¿Ya tienes una cuenta?{' '}
          <span
            className="text-white text-decoration-underline"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/login')}
          >
            Inicia sesión aquí
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
