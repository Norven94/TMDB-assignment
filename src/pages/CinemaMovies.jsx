import React, { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import { getCinemaMovies } from '../services/API'
import Pagination from '../components/Pagination'
import MovieList from '../components/MovieList'
import { useUrlSearchParams } from 'use-url-search-params'

const CinemaMovies = () => {
    const [pageParams, setPageParams] = useUrlSearchParams({ page: 1}, {page: Number})
    const [page, setPage] = useState(pageParams.page)
    const { data, error, isError, isLoading, isPreviousData } = useQuery(['cinemaMovies', page], () => getCinemaMovies(page))

    useEffect(() => {
        setPageParams({ ...pageParams, page})
    }, [page])

    return (
        <div className="page-container">
            <h1>Cinema movies page</h1>
            <Pagination isPreviousData={isPreviousData} totalPages={data?.total_pages} page={page} setPage={setPage} />

            {isLoading && (<p className="my-3">Loading movies...</p>)}

            {isError && (<p className="my-3">Unable to get any data ({error})</p>)}

            {data?.results && (
                <>
                    <MovieList data={data} />
                    <Pagination isPreviousData={isPreviousData} totalPages={data?.total_pages} page={page} setPage={setPage} />
                </>
            )}                    
        </div>
    )
}

export default CinemaMovies
