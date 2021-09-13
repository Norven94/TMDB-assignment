import axios from 'axios'

axios.defaults.baseURL = 'https://api.themoviedb.org/3'

const get = async (endpoint) => {
	const response = await axios.get(`${endpoint}&api_key=f1e89b646c29ef43457791bba40aa76c`)
	return response.data
}

export const getTopMovies = async (page) => {
	return await get(`/movie/top_rated?region=se&page=${page}`)
}

export const getCinemaMovies = async (page) => {
	return await get(`/movie/now_playing?page=${page}`)
}

export const getPopularMovies = async (timeWindow, page) => {
	return await get(`/trending/movie/${timeWindow}?region=se&page=${page}`)
}

export const getGenres = async () => {
	return await get(`/genre/movie/list?language=en-US`)
}

export const getGenreMovies = async (genreId, page) => {
	return await get(`/discover/movie?with_genres=${genreId}&page=${page}`)
}

export const getMovieDetails = async (id) => {
	return await get(`movie/${id}?append_to_response=credits,similar_movies`)
}

export const getActorDetails =  async (id) => {
	return await get(`person/${id}?append_to_response=credits`)
}

export const searchForMovie = async (searchString, page) => {
	if(searchString) {
		return await get(`search/movie?page=${page}&query=${searchString}`)
	}
}



