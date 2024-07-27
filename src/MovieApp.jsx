import { useState } from "react";
import './MovieApp.css'

function MovieApp() {
  const URL_BASE = import.meta.env.VITE_URL_BASE;
  const API_KEY = import.meta.env.VITE_API_KEY;
  const no_image = 'https://img.freepik.com/vector-premium/no-hay-foto-disponible-icono-vector-simbolo-imagen-predeterminado-imagen-proximamente-sitio-web-o-aplicacion-movil_87543-10615.jpg?w=826'

  const [search, setSearch] = useState('')
  const [moviesList, setMoviesList] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchMovies();
  }

  const handleInputChange = ({target}) => {
    setSearch(target.value)
  }

  const fetchMovies = async () => {
    try {
      const response = await fetch(`${URL_BASE}?query=${search}&api_key=${API_KEY}`)
      const data = await response.json();
      setMoviesList(data.results)
    } catch (error) {
      console.error('Error en el fetch de Movies: ', error)
    }
  }

  return (
    <div className="container">
      <h1>Buscador de peliculas</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Escribe una pelicula" onChange={handleInputChange}/>
        <button type="submit">Buscar</button>
      </form>
      {moviesList &&
        <div className="movie-list">
          {moviesList.map(movie => (
              <div key={movie.id} className="movie-card">
                <img src=
                  {
                    movie.poster_path 
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
                    : no_image
                  }
                    alt="movie img"
                    width={200}
                    height={300}
                />
                <h1>{movie.title}</h1>
                <p>{movie.overview}</p>
                <p><b>Estreno: </b>{movie.release_date}</p>
              </div>
          ))}
        </div>
      }
    </div>
  );
}

export default MovieApp;
