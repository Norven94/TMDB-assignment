import React from 'react'
import { useHistory } from 'react-router'
import useLocalStorage from '../hooks/useLocalStorage'

const PreviousMovies = () => {
    const { previousMovies } = useLocalStorage()
    const history = useHistory()

    return (
        <>
         {previousMovies && (
                <div className="previous-movies-container">
                    <h2>Some previous movies you have been looking at</h2>
                    <div className="details-container">
                        {previousMovies.map((movie, i) => (
                            <div className="movie-info-container" key={i} onClick={() => history.push(`/movies/${movie.id}`)}>
                                <div className="image-container">
                                    <img src={movie.poster ? `https://image.tmdb.org/t/p/w500${movie.poster}` : "https://freepikpsd.com/media/2019/10/no-image-available-icon-png-8-Transparent-Images.png"} />
                                    {movie.poster ? "" : <h3>{movie.title}</h3>}
                                </div>
                                <button className="movie-info-btn">i</button>
                            </div>
                        ))}
                    </div>
                </div>
            )}     
        </>
    )
}

export default PreviousMovies
