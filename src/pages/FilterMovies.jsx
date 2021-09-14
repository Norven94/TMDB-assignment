import React , { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import { getGenreMovies } from '../services/API'
import Pagination from '../components/Pagination'
import MovieList from '../components/MovieList'
import Filter from '../components/Filter'
import PreviousMovies from '../components/PreviousMovies'
import { useUrlSearchParams } from 'use-url-search-params'

const FilterMovies = () => {
    const [genre, setGenre] = useState(27)
    const [pageParams, setPageParams] = useUrlSearchParams({ page: 1}, {page: Number})
    const [page, setPage] = useState(pageParams.page)
    const { data, error, isError, isLoading, isPreviousData } = useQuery(['genreMovies', genre, page], () => getGenreMovies(genre, page))  

    useEffect(() => {
        setPageParams({ ...pageParams, page})
    }, [page])

    return (
        <div className="page-container">
            <h1>The Movie Library</h1>
            <p>Use the filter to find your movie based on the genre</p>
            <div className="options-container">
                <Pagination isPreviousData={isPreviousData} totalPages={data?.total_pages} page={page} setPage={setPage} />

                <Filter setGenre={setGenre} />
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

export default FilterMovies
