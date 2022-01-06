import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Container from './Components/Container/Container';
import AppBar from './Components/AppBar/AppBar';

const HomePage = lazy(() => import('./Pages/HomePage/HomePage.js'));
const MoviesPage = lazy(() => import('./Pages/MoviesPage/MoviesPage.js'));
const MovieCard = lazy(() => import('./Pages/MovieCard/MovieCard.js'));

export default function App() {
  return (
    <Container>
      <AppBar />
      <Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId/*" element={<MovieCard />} />
        </Routes>
      </Suspense>
    </Container>
  );
}
