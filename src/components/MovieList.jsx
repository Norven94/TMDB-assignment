import React from 'react'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'

const MovieList = ({data}) => {
    return (
        <Row className="movie-list-container">
            {data.results.map((result, i) => (
                <Col md={4} sm={3} key={i}>
                    {result.poster_path ? ( 
                        <div className="movie-card">
                            <div className="image-container">
                                <img src={`https://image.tmdb.org/t/p/w500${result.poster_path}`} alt={`Image of ${result.title}`} />
                            </div>
                            <div className="movie-desc">                  
                                <span className="movie-details">{result.vote_average}/10 - {result.release_date}</span>                
                                <p>{result.overview}</p>
                                <Link to={`/movies/${result.id}`} >
                                    <button className="primary-btn">More info</button>
                                </Link>
                            </div>       
                        </div>             
                    
                    ) : ""}
                </Col>
            ))}
        </Row>
    )
}

export default MovieList
