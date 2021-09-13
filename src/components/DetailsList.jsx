import React from 'react'
import { useHistory } from 'react-router'

const DetailsList = ({details, type}) => {
    const history = useHistory()

    return (
        <ul className="details-container">
            {details.map((data, i) => {
                    //Limit actors/movies to the top 9 most popular
                    //If there is no poster or profile image then dont render it
                    if (i < 9 && (data.poster_path || data.profile_path)) {
                        if (data.title) {
                            return (
                                <li className="movie-info-container" key={i} onClick={() => history.push(`/${type}/${data.id}`)} >                                       
                                    <div className="image-container">
                                        <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} />
                                    </div>
                                    <button className="movie-info-btn">i</button>
                                </li>
                            )
                        } else {
                            return (
                                <li className="actor-info-container" key={i} onClick={() => history.push(`/${type}/${data.id}`)} >
                                    <>
                                        <div className="image-container">
                                                <img src={`https://image.tmdb.org/t/p/w500${data.profile_path}`} />
                                        </div>
                                        <span>{data.name} acting as {data.character}</span>                                        
                                        <button className="info-btn">i</button>
                                    </>
                                </li> 
                            )
                        }
                    }         
                })}
        </ul>
    )
}

export default DetailsList
