import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
}


const ExploreMovies = () => {
  const [movies, setMovies] = useState([]);
  const [activeTab, setActiveTab] = useState("Mejor Calificadas");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const fetchMovies = async (endpoint: string) => {
    try {
      const { data } = await axios.get(`${endpoint}&api_key=${import.meta.env.VITE_TMDB_API_KEY}`);
      setMovies(data.results);
    } catch (error) {
      console.error("Error al obtener películas:", error);
    }
  };
  

  useEffect(() => {
    if (activeTab === "Mejor Calificadas") {
      fetchMovies(`https://api.themoviedb.org/3/movie/top_rated?${import.meta.env.VITE_TMDB_API_KEY}`);
    } else if (activeTab === "En Cartelera") {
      fetchMovies(`https://api.themoviedb.org/3/movie/now_playing?${import.meta.env.VITE_TMDB_API_KEY}`);
    } else if (activeTab === "Próximos") {
      fetchMovies(`https://api.themoviedb.org/3/movie/upcoming?${import.meta.env.VITE_TMDB_API_KEY}`);
    }
  }, [activeTab]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      fetchMovies(`https://api.themoviedb.org/3/search/movie?${import.meta.env.VITE_TMDB_API_KEY}&query=${searchQuery}`);
    }
  };

  return (
    <div className="bg-black text-white min-vh-100">
      <div className="p-3 bg-danger">
        <h1 className="text-center text-white">Explorar Películas</h1>
        <form onSubmit={handleSearch} className="d-flex mt-3">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar películas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="btn btn-light ms-2">
            <i className="bi bi-search"></i>
          </button>
        </form>
      </div>

      <div className="d-flex justify-content-center mt-3">
        <button
          className={`btn ${activeTab === "Mejor Calificadas" ? "btn-light" : "btn-outline-light"} mx-1`}
          onClick={() => setActiveTab("Mejor Calificadas")}
        >
          Mejor Calificadas
        </button>
        <button
          className={`btn ${activeTab === "En Cartelera" ? "btn-light" : "btn-outline-light"} mx-1`}
          onClick={() => setActiveTab("En Cartelera")}
        >
          En Cartelera
        </button>
        <button
          className={`btn ${activeTab === "Próximos" ? "btn-light" : "btn-outline-light"} mx-1`}
          onClick={() => setActiveTab("Próximos")}
        >
          Próximos
        </button>
      </div>

      <div className="p-3">
        <h2 className="text-center">{activeTab}</h2>
        <div className="row">
          {movies.length > 0 ? (
            movies.map((movie:Movie) => (
              <div
                key={movie.id}
                className="col-6 col-md-3 mb-3"
                onClick={() => navigate(`/movie/${movie.id}`)}
              >
                <div className="card bg-dark text-white">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{movie.title}</h5>
                    <p className="card-text">⭐ {movie.vote_average}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No se encontraron películas.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExploreMovies;
