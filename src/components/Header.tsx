import { useEffect, useState } from 'react';

const Header = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);


  return (
    <header className="bg-danger d-flex justify-content-between align-items-center px-4 py-2">
      <div>
        <h1 className="text-white m-0">El Palomitero</h1>
      </div>
      <div>
        {user ? (
          <div className="d-flex align-items-center">
            
          </div>
        ) : (
          <>
            <button
              className="btn btn-outline-light me-2"
              onClick={() => window.location.href = '/login'}
            >
              Iniciar Sesión
            </button>
            <button
              className="btn btn-dark"
              onClick={() => window.location.href = '/register'}
            >
              Registro
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
