import React, { useState, useEffect, useRef } from 'react'
import { useQuery } from 'react-query'
import { searchForMovie } from '../services/API'
import Pagination from '../components/Pagination'
import MovieList from '../components/MovieList'
import PreviousMovies from '../components/PreviousMovies'
import { useUrlSearchParams } from 'use-url-search-params'

const HomePage = () => {
    const inputSearch = useRef()
    const [params, setParams] = useUrlSearchParams({search: "", page: 1}, { s: String, page: Number})
    const [search, setSearch] = useState(params.search)
    const [page, setPage] = useState(params.page)
    const { data, error, isError, isLoading, isPreviousData } = useQuery(['searchMovies', params.search, params.page], () => searchForMovie(params.search, params.page))

    useEffect(() => {
        setParams({...params, page, search})
    }, [page, search])

    const submitSearch = (e) => {
        e.preventDefault()
        setSearch(inputSearch.current.value)
    }

    return (
        <div className="page-container">
            <h1>The Movie Library</h1>
            <p>Please feel free to use the movie library to search for your favorite movies</p>
            <form onSubmit={submitSearch} className="search-container">
                <input type="text" defaultValue={params.search} placeholder="Search for a movie..." ref={inputSearch} />
                <button className="btn search-btn">Search</button>
            </form>
            {isLoading && (<p className="my-3">Loading movies...</p>)}

            {isError && (<p className="my-3">Unable to get any data ({error})</p>)}

            {data?.results && data?.results.length > 0 ? (
                <>
                    <div className="options-container">
                        <Pagination isPreviousData={isPreviousData} totalPages={data?.total_pages} page={params.page} setPage={setPage} />
                    </div>
                    <MovieList data={data} />
                    <div className="options-container">
                        <Pagination isPreviousData={isPreviousData} totalPages={data?.total_pages} page={params.page} setPage={setPage} />
                    </div>
                </>
            ) : data?.results && search ? (
                <>
                    <p>There were no movies matching your search</p>
                </>
            ) : ""}


            <PreviousMovies />
        </div>
    )
}

export default HomePage
