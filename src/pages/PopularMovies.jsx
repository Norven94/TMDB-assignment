import React, { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import { getPopularMovies } from '../services/API'
import Pagination from '../components/Pagination'
import MovieList from '../components/MovieList'
import { useUrlSearchParams } from 'use-url-search-params'

const PopularMovies = () => {
    const [pageParams, setPageParams] = useUrlSearchParams({ page: 1}, {page: Number})
    const [page, setPage] = useState(pageParams.page)
    const [time, setTime] = useState("week")
    const { data, error, isError, isLoading, isPreviousData } = useQuery(['popularMovies', time, page], () => getPopularMovies(time, page))

    useEffect(() => {
        setPageParams({ ...pageParams, page})
    }, [page])

    return (
        <div className="page-container">
            <h1>Popular movies page</h1>
            <Pagination isPreviousData={isPreviousData} totalPages={data?.total_pages} page={page} setPage={setPage} />

            <select name="time" onChange={(e) => setTime(e.target.value)}>
                <option value="week">Week</option>
                <option value="day">Day</option>
            </select>

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

export default PopularMovies
