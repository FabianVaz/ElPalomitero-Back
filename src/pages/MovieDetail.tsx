import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Html5QrcodeScanner } from "html5-qrcode";

interface Review {
  id: string;
  user: { name: string };
  content: string;
  rating: number;
}

interface Movie {
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
}

const MovieDetail = () => {
  const { id } = useParams(); // ID de la película desde la URL
  const [movie, setMovie] = useState<Movie | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [isScanning, setIsScanning] = useState(false);

  const navigate = useNavigate();

  // Función para obtener los detalles de la película
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

  // Función para obtener las reseñas de la película
  const fetchReviews = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/reviews/${id}`
      );
      setReviews(data);
    } catch (error) {
      console.error("Error al obtener las reseñas:", error);
    }
  };

  // Iniciar el escáner QR
  const startQrScanner = () => {
    setIsScanning(true);

    // Esperar un momento para asegurarse de que el DOM está listo
    setTimeout(() => {
      const scanner = new Html5QrcodeScanner("qr-reader", {
        fps: 10,
        qrbox: 250,
      });

      scanner.render(
        (decodedText) => {
          console.log(`QR escaneado: ${decodedText}`);
          scanner.clear();
          setIsScanning(false);
          navigate(`/review/${id}`);
        },
        (error) => {
          console.error("Error escaneando el QR:", error);
        }
      );
    }, 100); // Delay corto
  };

  useEffect(() => {
    fetchMovieDetails();
    fetchReviews();
    setLoading(false);
  }, [id]);

  if (loading || !movie) {
    return <p className="text-center text-white">Cargando...</p>;
  }

  return (
    <div className="bg-black text-white min-vh-100">
      <div className="position-relative">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-100"
          style={{ maxHeight: "300px", objectFit: "cover" }}
        />
        <div className="position-absolute bottom-0 start-0 p-3 w-100 bg-gradient-dark">
          <h1 className="h4 mb-0">{movie.title}</h1>
          <p className="mb-0">
            {movie.release_date} • {movie.vote_average.toFixed(1)} ★ (
            {movie.vote_count} reseñas)
          </p>
        </div>
      </div>

      <div className="p-4">
        <section>
          <h3 className="h5 mb-3">Sinopsis</h3>
          <p>{movie.overview || "Sin sinopsis disponible."}</p>
        </section>

        <section>
          <h3 className="h5 mb-3">Reseñas de Usuarios</h3>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div
                key={review.id}
                className="bg-dark rounded p-3 mb-3 d-flex justify-content-between"
              >
                <div>
                  <h4 className="h6 mb-1">{review.user.name}</h4>
                  <p className="mb-0">{review.content}</p>
                </div>
                <div className="text-warning">
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </div>
              </div>
            ))
          ) : (
            <p className="no-reviews">
              Esta película aún no tiene reseñas. ¡Sé el primero en escribir
              una!
            </p>
          )}
        </section>

        <div className="text-center">
          <button className="btn btn-danger w-100 mt-3" onClick={startQrScanner}>
            <i className="bi bi-qr-code-scan me-2"></i> Escanear QR y Reseñar
          </button>
        </div>

        {/* Renderizar el lector de QR solo si está habilitado */}
        {isScanning && <div id="qr-reader" className="mt-3"></div>}
      </div>
    </div>
  );
};

export default MovieDetail;
