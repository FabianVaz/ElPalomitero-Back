import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/AdminPanel.css";

const AdminPanel = () => {
  const [statistics, setStatistics] = useState({
    totalUsers: 0,
    totalReviews: 0,
    newUsers: 0,
    newReviews: 0,
  });

  // Función para obtener estadísticas del backend
  const fetchStatistics = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/statistics`);
      setStatistics(data);
    } catch (error) {
      console.error("Error al obtener estadísticas:", error);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  return (
    <div className="admin-panel bg-light min-vh-100">
      <header className="bg-danger text-white p-4">
        <h1 className="h3 mb-0">Panel de Administración</h1>
      </header>
      <div className="container mt-4">
        <h2 className="h4 mb-3">Estadísticas de Uso</h2>
        <p>Información sobre el uso de la aplicación</p>
        <div className="row g-3">
          <div className="col-md-6 col-lg-3">
            <div className="stat-card bg-white text-center p-3 shadow-sm rounded">
              <h3 className="h5">Usuarios Totales</h3>
              <p className="display-6 fw-bold">{statistics.totalUsers}</p>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="stat-card bg-white text-center p-3 shadow-sm rounded">
              <h3 className="h5">Reseñas Totales</h3>
              <p className="display-6 fw-bold">{statistics.totalReviews}</p>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="stat-card bg-white text-center p-3 shadow-sm rounded">
              <h3 className="h5">Nuevos Usuarios (Último Mes)</h3>
              <p className="display-6 fw-bold">{statistics.newUsers}</p>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="stat-card bg-white text-center p-3 shadow-sm rounded">
              <h3 className="h5">Reseñas Nuevas (Último Mes)</h3>
              <p className="display-6 fw-bold">{statistics.newReviews}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
