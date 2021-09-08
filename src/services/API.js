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
	return await get(`/movie/now_playing?region=se&page=${page}`)
}

export const getPopularMovies = async (page) => {
	return await get(`/trending/movie/week?region=se&page=${page}`)
}

export const getGenres = async () => {
	return await get(`/genre/movie/list?language=en-US`)
}


export const getMovieDetails = async (id) => {
	return await get(`movie/${id}?append_to_response=credits,similar_movies`)
}

export const getActorDetails =  async (id) => {
	return await get(`person/${id}?append_to_response=credits`)
}

