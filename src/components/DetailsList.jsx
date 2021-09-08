import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

const DetailsList = ({details, type}) => {
    console.log(details)

    return (
        <ul>
            {details.map((data, i) => {
                    //Limit actors/movies to the top 10 most popular
                    if (i < 10) {
                        return (
                            <li key={i} >
                                {data.title ? (
                                    <>
                                        <p>{data.title}</p>
                                        <div className="image-container">
                                            <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} />
                                        </div>
                                    </>
                                ) : (
                                    <span>{data.name} acting as {data.character}</span>
                                )}
                                
                                <Link to={`/${type}/${data.id}`} >
                                    <Button>More info</Button>
                                </Link>
                            </li>
                        )
                    }
                    
                })}
        </ul>
    )
}

export default DetailsList
