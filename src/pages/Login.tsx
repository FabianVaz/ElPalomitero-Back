import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/login`, {
        email,
        password,
      });
  
      // Guardar el usuario con el campo `id` mapeado desde `_id`
      const user = {
        id: data.user._id,
        name: data.user.name,
        email: data.user.email,
      };
      localStorage.setItem('user', JSON.stringify(user));
  
      // Redirigir a la página de perfil
      navigate('/');
    } catch (err) {
      console.error('Error en el inicio de sesión:', err);
      setError('Error desconocido.');
    }
  };

  return (
    <div className="bg-black text-white min-vh-100 d-flex align-items-center justify-content-center">
      <div className="bg-danger p-4 rounded shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4">Iniciar Sesión</h2>
        {error && <p className="text-white bg-dark p-2 rounded">{error}</p>}
        <form onSubmit={handleLogin}>
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
          <button type="submit" className="btn btn-dark w-100">Iniciar Sesión</button>
        </form>
        <p className="mt-3 text-center">
          ¿No tienes una cuenta?{' '}
          <span
            className="text-white text-decoration-underline"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/register')}
          >
            Regístrate aquí
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
