import React from 'react'
import { useParams } from 'react-router'
import { useQuery } from 'react-query'
import { getActorDetails } from '../services/API'
import Container from 'react-bootstrap/Container'
import BackButton from '../components/BackButton'
import DetailsList from '../components/DetailsList'

const ActorDetails = () => {
    const { id } = useParams()
    const { data, error, isError, isLoading } = useQuery(['actorDetails', id], () => getActorDetails(id))

    return (
        <div>
            <h1>This is the actor details page</h1>
            <BackButton />

            {isLoading && (<p className="my-3">Loading movie details...</p>)}

            {isError && (<p className="my-3">Unable to get any data ({error})</p>)}

            {data && (
                <>
                    <Container>
                        <h2>{data.name}</h2>
                        <span>Born {data.birthday} in {data.place_of_birth}</span>                
                        <p>{data.biography}</p>
                        <div className="image-container">
                            <img src={`https://image.tmdb.org/t/p/w500${data.profile_path}`} />
                        </div>
                    </Container>
                    <DetailsList details={data.credits.cast.sort((a, b) => b.popularity - a.popularity)} type="movies" />
                </>
            )}
        </div>
    )
}

export default ActorDetails
