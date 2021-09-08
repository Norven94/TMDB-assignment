import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import { getPopularMovies } from '../services/API'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Pagination from '../components/Pagination'
import { useUrlSearchParams } from 'use-url-search-params'

const PopularMovies = () => {
    const [pageParams, setPageParams] = useUrlSearchParams({ page: 1}, {page: Number})
    const [page, setPage] = useState(pageParams.page)
    const { data, error, isError, isLoading, isPreviousData } = useQuery(['popularMovies', page], () => getPopularMovies(page))

    useEffect(() => {
        setPageParams({ ...pageParams, page})
    }, [page])

    return (
        <div>
            <h1>Popular movies page</h1>

            {isLoading && (<p className="my-3">Loading movies...</p>)}

            {isError && (<p className="my-3">Unable to get any data ({error})</p>)}

            {data?.results && (
                <>
                    {data.results.map((result, i) => (
                        <Container key={i}>
                            <h2>{result.title}</h2>
                            <span>{result.vote_average}/10 - {result.release_date}</span>                
                            <p>{result.overview}</p>
                            <Link to={`/movies/${result.id}`} >
                                <Button>More info</Button>
                            </Link>
                            <div className="image-container">
                                <img src={`https://image.tmdb.org/t/p/w500${result.poster_path}`} />
                            </div>
                        </Container>
                    ))}
                </>
            )}
            
            <Pagination isPreviousData={isPreviousData} totalPages={data?.total_pages} page={page} setPage={setPage} />
        </div>
    )
}

export default PopularMovies
