import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Navigation from './components/Navigation'
import HomePage from './pages/HomePage'
import CinemaMovies from './pages/CinemaMovies'
import FilterMovies from './pages/FilterMovies'
import PopularMovies from './pages/PopularMovies'
import TopMovies from './pages/TopMovies'
import ActorDetails from './pages/ActorDetails'
import MovieDetails from './pages/MovieDetails'
import PageNotFound from './pages/PageNotFound'

function App() {

  return (
    <div className="App">
      <Navigation />
      <Switch>
					<Route exact path="/">
						<HomePage />
					</Route>

          <Route path="/cinema-movies">
						<CinemaMovies />
					</Route>

          <Route path="/popular-movies">
						<PopularMovies />
					</Route>

          <Route path="/top-movies">
						<TopMovies />
					</Route>

          <Route path="/movies/:id">
						<MovieDetails />
					</Route>

          <Route path="/movies">
						<FilterMovies />
					</Route>

          <Route path="/actor/:id">
						<ActorDetails />
					</Route>

					<Route>
						<PageNotFound />
					</Route>
				</Switch>
    </div>
  )
}

export default App
