import {
  Route,
  Routes,
  useParams,
  NavLink,
  useNavigate,
} from 'react-router-dom';
import { useState, useEffect, lazy, Suspense } from 'react';
import s from './MovieCard.module.css';
import navStyles from '../../Components/Navigation/Navigation.module.css';
import * as moviesAPI from '../../Services/MovieAPI';
const Cast = lazy(() => import('../Cast/Cast.js'));
const Reviews = lazy(() => import('../Reviews/Reviews.js'));

export default function MovieCard() {
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getMovie = async () => {
      const currentMovie = await moviesAPI.fetchMovieById(movieId);
      setMovie(currentMovie);
    };
    getMovie();
  }, [movieId]);

  return (
    <div>
      {movie && (
        <div>
          <button onClick={() => navigate('/movies')}>Go Back</button>
          <div className={s.shortInfo}>
            <div>
              <img
                src={
                  movie.poster_path !== null
                    ? `https://image.tmdb.org/t/p/w400${movie.poster_path}`
                    : 'https://i.postimg.cc/FKqRRtbF/No-Image.png'
                }
                alt={movie.title}
              />
            </div>
            <div className={s.shortInfoChild}>
              <h2>
                {movie.title} ({movie.release_date.slice(0, 4)})
              </h2>
              <p>User score: {movie.vote_average}</p>
              <h3>Overveiw</h3>
              <p>{movie.overview ? movie.overview : 'No overwies yet'}</p>
              <h3>Genres</h3>
              <p>{movie.genres.map(genre => genre.name).join(', ')}</p>
            </div>
          </div>
          <div>
            <h3>Additional Information</h3>
            <ul className={s.additionalInfoSet}>
              <li>
                <NavLink
                  to={{ pathname: 'cast' }}
                  className={navData =>
                    navData.isActive ? navStyles.activeLink : navStyles.link
                  }
                >
                  Cast
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={{ pathname: 'reviews' }}
                  className={navData =>
                    navData.isActive ? navStyles.activeLink : navStyles.link
                  }
                >
                  Reviews
                </NavLink>
              </li>
            </ul>
            <Suspense fallback={<h1>Loading...</h1>}>
              <Routes>
                <Route path="cast" element={<Cast movieId={movieId} />} />
                <Route path="reviews" element={<Reviews movieId={movieId} />} />
              </Routes>
            </Suspense>
          </div>
        </div>
      )}
      <hr />
    </div>
  );
}
