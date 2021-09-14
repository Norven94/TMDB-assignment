import React, { useEffect } from 'react'
import { useHistory } from 'react-router'
import { useParams } from 'react-router'
import { useQuery } from 'react-query'
import { getMovieDetails } from '../services/API'
import BackButton from '../components/BackButton'
import DetailsList from '../components/DetailsList'
import useLocalStorage from '../hooks/useLocalStorage'

const MovieDetails = () => {
    const history = useHistory()
    const { id } = useParams()
    const { data, error, isError, isLoading } = useQuery(['movieDetails', id], () => getMovieDetails(id))
    const { previousMovies, setPreviousMovies } = useLocalStorage()

    useEffect(() => {
        if (data) {
            setPreviousMovies(
                {
                    id: data.id,
                    title: data.title,
                    overview: data.overview,
                    poster: data.poster_path,
                    release: data.release_date,
                    rating: data.vote_average
                }
            )
        }
    }, [data])

    return (
        <div className="page-container">

            {isLoading && (<p className="my-3">Loading movie details...</p>)}

            {isError && (<p className="my-3">Unable to get any data ({error})</p>)}

            {data && (
                <div className="details-page-container">
                    <div className="heading-container">
                        <h1>{data.title}</h1>
                        <BackButton />
                    </div>

                    <div className="details-image-container">
                        <img src={data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : "https://freepikpsd.com/media/2019/10/no-image-available-icon-png-8-Transparent-Images.png"} />
                    </div>
                    <div className="movie-details">
                        {data.poster_path ? "" : <h3>{data.title}</h3>}   
                        <span>{data.vote_average}/10 - {data.release_date}</span>
                        <p>{data.overview}</p>
                    </div>

                    <h2>Actors of the movie</h2>
                    <DetailsList details={data.credits.cast} type="actor" />

                    <h2>Similar Movies</h2>
                    <div className="details-container">
                        {data.similar_movies.results.map((data, i) => {
                            if (i < 9) {
                                return (
                                    <div className="movie-info-container" key={i} onClick={() => history.push(`/movies/${data.id}`)}>
                                        <div className="image-container">
                                            <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} />
                                        </div>
                                        <button className="movie-info-btn">i</button>
                                    </div>
                                )                            
                            }
                        })}
                    </div>
                </div>
            )}

        </div>
    )
}

export default MovieDetails
