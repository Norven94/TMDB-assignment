import React from 'react'
import { useParams } from 'react-router'
import { useQuery } from 'react-query'
import { getActorDetails } from '../services/API'
import BackButton from '../components/BackButton'
import DetailsList from '../components/DetailsList'

const ActorDetails = () => {
    const { id } = useParams()
    const { data, error, isError, isLoading } = useQuery(['actorDetails', id], () => getActorDetails(id))

    return (
        <div className="page-container">
            {isLoading && (<p className="my-3">Loading movie details...</p>)}

            {isError && (<p className="my-3">Unable to get any data ({error})</p>)}

            {data && (
                <div className="details-page-container">
                    <div className="heading-container">
                        <h1>{data.name}</h1>
                        <BackButton />
                    </div>
                    <div className="actor-card">
                        <div className="details-image-container">
                            <img src={`https://image.tmdb.org/t/p/w500${data.profile_path}`} />
                        </div>
                        <div className="actor-details">
                            <span>Born {data.birthday} in {data.place_of_birth}</span>                
                            <p>{data.biography}</p>
                        </div>
                    </div>

                    <div>
                        <h2>Movies the actor have been a part of</h2>
                        <DetailsList details={data.credits.cast.sort((a, b) => b.popularity - a.popularity)} type="movies" />
                    </div>
                </div>
            )}
        </div>
    )
}

export default ActorDetails
