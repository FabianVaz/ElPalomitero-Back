import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieHomePage from './pages/Home';
import Login from './pages/Login';
import MovieDetail from './pages/MovieDetail';
import Review from './pages/Review';
import Navbar from './components/Navbar';
import AdminPanel from './pages/AdminPanel';
import Register from './pages/Register';
import Profile from './pages/Profile';
import ExploreMovies from './pages/ExploreMovies';


const App = () => {

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Ruta de dashboard */}
        <Route path='/admin' element={<AdminPanel />} />
        {/* Ruta de inicio */}
        <Route path="/" element={<MovieHomePage />} />
        {/* Ruta de registro de usuarios*/}
        <Route path="/register" element={<Register />} />
        {/* Ruta de perfil */}
       <Route path="/profile" element={<Profile />}/> 
        {/* Ruta de inicio de sesión */}
        <Route path="/login" element={<Login />} />
        {/* Ruta para explorar las películas */}
        <Route path='/movies/explore' element={<ExploreMovies />} />

        {/* Detalles de película */}
        <Route path="/movie/:id" element={<MovieDetail />} />

        {/* Ruta para escribir reseñas */}
        <Route path='/review/:id' element={<Review />} />

        {/* Ruta para errores 404 */}
        <Route path="*" element={<h1>Página no encontrada (404)</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
