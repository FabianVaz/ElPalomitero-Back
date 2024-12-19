import { Home, User } from 'lucide-react';

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  if (!user) return null; // No mostrar navbar si no hay sesión activa

  return (
    <nav className="bg-dark border-top border-secondary fixed-bottom d-flex justify-content-around py-2">
      <button
        className="btn btn-link text-white text-center"
        onClick={() => window.location.href = '/'}
      >
        <Home className="mb-1" size={20} />
        <span className="d-block small">Inicio</span>
      </button>
      <button
        className="btn btn-link text-white text-center"
        onClick={() => window.location.href = '/profile'}
      >
        <User className="mb-1" size={20} />
        <span className="d-block small">Perfil</span>
      </button>
    </nav>
  );
};

export default Navbar;
