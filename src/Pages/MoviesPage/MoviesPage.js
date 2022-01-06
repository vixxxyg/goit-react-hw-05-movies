import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import * as moviesAPI from '../../Services/MovieAPI';

export default function MoviesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = event => {
    event.preventDefault();
    if (searchQuery.trim() === '') {
      alert('Please enter search query');
      return;
    }
    onSubmit(searchQuery);
  };

  function onSubmit(searchQuery) {
    navigate({ ...location, search: `query=${searchQuery}` });
    try {
      moviesAPI.fetchMoviesByQuery(searchQuery).then(setMovies);
    } catch (error) {
      console.log(error);
    }
  }
  const handleQueryChange = event => {
    setSearchQuery(event.currentTarget.value.toLowerCase());
    if (event.currentTarget.value === '') {
      navigate({ ...location, search: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search movies"
        autoComplete="off"
        autoFocus
        value={searchQuery}
        onChange={handleQueryChange}
      />
      <button>Search</button>
      {movies &&
        (movies.results.length === 0 ? (
          <h3>Nothing has been found...</h3>
        ) : (
          movies.results.map(res => (
            <nav key={res.id}>
              <Link to={`/movies/${res.id}`}>{res.title}</Link>
            </nav>
          ))
        ))}
    </form>
  );
}
