import React, { useEffect, useState } from "react";
import axios from "axios";

interface Review {
  id: string;
  movieId: string;
  movieName: string;
  rating: number;
  posterPath: string;
  content: string;
}

const Profile = () => {
  const [user, setUser] = useState<{ id: string; name: string; email: string } | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      // Fetch reviews
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/reviews/user/${parsedUser.id}`)
        .then((response) => {
          setReviews(response.data.slice(0, 3)); // Mostrar solo las últimas 3 reseñas
        })
        .catch((error) => {
          console.error("Error al obtener reseñas:", error);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/"; // Redirige al usuario a la página principal
  };

  return (
    <div className="container min-vh-100 bg-black text-white">
      <div className="text-center py-4">
        <div
          className="rounded-circle bg-secondary d-flex align-items-center justify-content-center mx-auto"
          style={{ width: "80px", height: "80px" }}
        >
          <i className="bi bi-person" style={{ fontSize: "40px", color: "#fff" }}></i>
        </div>
        <h2 className="h5 mt-3 text-white">{user?.name || "Usuario"}</h2>
        <p className="text-white">{user?.email || "email@example.com"}</p>
      </div>
      <div>
        <h3 className="h5 text-danger">Mis Reseñas</h3>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div
              key={review.id}
              className="bg-dark rounded p-3 mb-3 d-flex align-items-center"
            >
              <img
                src={
                  review.posterPath
                    ? `https://image.tmdb.org/t/p/w92/${review.posterPath}`
                    : "/placeholder.png" // Imagen de respaldo si no hay poster
                }
                alt={review.movieName}
                className="rounded me-3"
                style={{ width: "60px", height: "90px", objectFit: "cover" }}
              />
              <div>
                <h4 className="h6 mb-1 text-white">{review.movieName}</h4>
                <div className="text-warning">
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                  <p className="mb-0">{review.content}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-reviews">No tienes reseñas todavía.</p>
        )}
      </div>
      <div className="mt-auto">
        <button className="btn btn-danger w-100 mt-3" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default Profile;
