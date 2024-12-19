import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

interface User {
  id: string;
  name: string;
  email: string;
}

interface Movie {
  title: string;
  poster_path: string;
}

const Review = () => {
  const { id } = useParams(); // ID de la película desde la URL
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [reviewContent, setReviewContent] = useState("");
  const [selectedRating, setSelectedRating] = useState<number>(0);

  // Cargar datos del usuario desde localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.id) {
        setUser(parsedUser);
      } else {
        console.error("El usuario no tiene un ID válido.");
        navigate("/login"); // Redirigir a login si no hay ID
      }
    } else {
      console.error("No se encontró ningún usuario en localStorage.");
      navigate("/login"); // Redirigir a login si no hay usuario
    }
  }, [navigate]);

  // Cargar detalles de la película
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}`,
          {
            params: { api_key: import.meta.env.VITE_TMDB_API_KEY },
          }
        );
        setMovie(data);
      } catch (error) {
        console.error("Error al obtener los detalles de la película:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  // Manejar envío de la reseña
  const handleSubmit = async () => {
    if (!user || !user.id) {
      console.error("El usuario no está autenticado.");
      return;
    }
    if (!movie) {
      console.error("La película no está cargada.");
      return;
    }

    try {
      console.log("ID de la película:", id);
      console.log("Nombre de la película:", movie.title);
      console.log("Datos del usuario:", user);

      const reviewData = {
        movieId: id,
        movieName: movie.title,
        posterPath: movie.poster_path,
        content: reviewContent,
        rating: selectedRating,
        userId: user.id,
      };

      console.log("Datos a enviar:", reviewData);

      await axios.post("http://localhost:3000/reviews", reviewData);
      alert("Reseña publicada exitosamente.");
      navigate(`/movie/${id}`);
    } catch (error) {
      console.error("Error al publicar la reseña:", error);
    }
  };

  if (!user || !movie) {
    return <p className="text-center text-white">Cargando...</p>;
  }

  return (
    <div className="bg-black text-white min-vh-100 d-flex flex-column align-items-center">
      <div className="container py-4">
        <h1 className="text-danger mb-4 text-center">Reseñar Película</h1>
        <div className="mb-3">
          <label className="form-label">Calificación</label>
          <div className="d-flex">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                className={`btn ${
                  selectedRating >= rating ? "btn-warning" : "btn-secondary"
                }`}
                onClick={() => setSelectedRating(rating)}
              >
                ★
              </button>
            ))}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="reviewContent" className="form-label">
            Tu Reseña
          </label>
          <textarea
            id="reviewContent"
            className="form-control"
            rows={3}
            value={reviewContent}
            onChange={(e) => setReviewContent(e.target.value)}
            placeholder="Escribe tu reseña aquí..."
          ></textarea>
        </div>
        <button className="btn btn-danger w-100" onClick={handleSubmit}>
          Publicar Reseña
        </button>
      </div>
    </div>
  );
};

export default Review;
