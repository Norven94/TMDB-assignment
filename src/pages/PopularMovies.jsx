import React, { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import { getPopularMovies } from '../services/API'
import Pagination from '../components/Pagination'
import MovieList from '../components/MovieList'
import PreviousMovies from '../components/previousMovies'
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
            <h1>The Movie Library</h1>
            <p>Find the most popular movies of the day or of the week!</p>

            <div className="options-container">
                <Pagination isPreviousData={isPreviousData} totalPages={data?.total_pages} page={page} setPage={setPage} />
            
                <select name="time" onChange={(e) => setTime(e.target.value)}>
                    <option value="week">Week</option>
                    <option value="day">Day</option>
                </select>
            </div>

            {isLoading && (<p className="my-3">Loading movies...</p>)}

            {isError && (<p className="my-3">Unable to get any data ({error})</p>)}

            {data?.results && (
                <>
                    <MovieList data={data} />
                    <div className="options-container">
                        <Pagination isPreviousData={isPreviousData} totalPages={data?.total_pages} page={page} setPage={setPage} />
                    </div>
                </> 
            )}   

            <PreviousMovies />     
        </div>
    )
}

export default PopularMovies
