import axios from 'axios';

// Define el tipo para las películas
export interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

const API = axios.create({
  baseURL: 'http://localhost:3000', // Cambia según tu servidor
});

export const fetchPopularMovies = async (): Promise<Movie[]> => {
  const { data } = await API.get<Movie[]>('/movies/popular');
  return data;
};