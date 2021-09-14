import React from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const MovieList = ({data}) => {
    const history = useHistory()

    return (
        <Row className="movie-list-container">
            {data.results.map((result, i) => (
                <Col md={4} sm={3} key={i}>
                    <div className="movie-card" onClick={() => history.push(`/movies/${result.id}`)}>
                        <div className="image-container">
                            <img src={result.poster_path ? `https://image.tmdb.org/t/p/w500${result.poster_path}` : "https://freepikpsd.com/media/2019/10/no-image-available-icon-png-8-Transparent-Images.png"} alt={`Image of ${result.title}`} />
                        </div>
                        <div className="movie-desc">      
                            {result.poster_path ? "" : <h3>{result.title}</h3>}            
                            <span className="movie-details">{result.vote_average}/10 - {result.release_date ? result.release_date : "Unknown release date"}</span>                
                            <p>{result.overview}</p>
                            <Link to={`/movies/${result.id}`} >
                                <button className="primary-btn">More info</button>
                            </Link>
                        </div>       
                    </div>             
                </Col>
            ))}
        </Row>
    )
}

export default MovieList
