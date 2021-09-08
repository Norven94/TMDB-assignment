import React from 'react'
import { useParams } from 'react-router'
import { useQuery } from 'react-query'
import { getMovieDetails } from '../services/API'
import Container from 'react-bootstrap/Container'
import BackButton from '../components/BackButton'
import DetailsList from '../components/DetailsList'

const MovieDetails = () => {
    const { id } = useParams()
    const { data, error, isError, isLoading } = useQuery(['movieDetails', id], () => getMovieDetails(id))
    console.log(data)

    return (
        <div>
            <h1>This is the movie details page</h1>
            <BackButton />

            {isLoading && (<p className="my-3">Loading movie details...</p>)}

            {isError && (<p className="my-3">Unable to get any data ({error})</p>)}

            {data && (
                <>
                    <Container>
                        <h2>{data.title}</h2>
                        <span>{data.vote_average}/10 - {data.release_date}</span>                
                        <p>{data.overview}</p>
                        <div className="image-container">
                            <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} />
                        </div>
                    </Container>
                    <DetailsList details={data.credits.cast} type="actor" />
                </>
            )}

        </div>
    )
}

export default MovieDetails
