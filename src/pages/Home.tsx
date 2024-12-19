import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Navbar from '../components/Navbar';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();


  // Obtener las películas populares
  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/movies/popular`);
        setMovies(data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchPopularMovies();
  }, []);

  // Manejar la búsqueda
  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/movies/search`, {
        params: { query: searchTerm },
      });
      setMovies(data);
    } catch (error) {
      console.error('Error searching movies:', error);
    }
  };

  return (
    <div className="bg-black text-white min-vh-100 d-flex flex-column">
      {/* Header */}
      <Header />

      {/* Barra de búsqueda */}
      <div className="p-3">
        <div className="input-group">
          <input
            type="search"
            className="form-control"
            placeholder="Buscar películas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-danger" onClick={handleSearch}>
            Buscar
          </button>
        </div>
      </div>

      {/* Contenido Principal */}
      <main className="p-3 flex-grow-1">
        <section>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h2 className="h5 fw-bold">PELÍCULAS POPULARES</h2>
            <button
              className="btn btn-link text-danger p-0"
              onClick={() => navigate('/movies/explore')}
            >
              Explorar películas
            </button>
          </div>
          <div className="row">
            {movies.map((movie) => (
              <div key={movie.id} className="col-6 col-sm-4 col-md-3 col-lg-2 mb-4">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="img-fluid rounded"
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/movie/${movie.id}`)}
                />
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Navbar */}
      <Navbar />
    </div>
  );
}
