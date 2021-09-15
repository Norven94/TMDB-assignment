import React, { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import { getTopMovies } from '../services/API'
import Pagination from '../components/Pagination'
import MovieList from '../components/MovieList'
import PreviousMovies from '../components/PreviousMovies'
import { useUrlSearchParams } from 'use-url-search-params'

const TopMovies = () => {
    const [pageParams, setPageParams] = useUrlSearchParams({ page: 1}, {page: Number})
    const [page, setPage] = useState(pageParams.page)
    const { data, error, isError, isLoading, isPreviousData } = useQuery(['topMovies', pageParams.page], () => getTopMovies(pageParams.page))

    useEffect(() => {
        setPageParams({ ...pageParams, page})
    }, [page])

    return (
        <div className="page-container">
            <h1>The Movie Library</h1>
            <p>Find the top ranked movies here!</p>
            <div className="options-container">
                <Pagination isPreviousData={isPreviousData} totalPages={data?.total_pages} page={pageParams.page} setPage={setPage} />
            </div>

            {isLoading && (<p className="my-3">Loading movies...</p>)}

            {isError && (<p className="my-3">Unable to get any data ({error})</p>)}

            {data?.results && (
                <>
                    <MovieList data={data} />
                    <div className="options-container">
                        <Pagination isPreviousData={isPreviousData} totalPages={data?.total_pages} page={pageParams.page} setPage={setPage} />
                    </div>
                </>
            )}  

            <PreviousMovies />             
        </div>
    )
}

export default TopMovies
