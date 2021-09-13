import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router'
import { useQuery } from 'react-query'
import { searchForMovie } from '../services/API'
import Pagination from '../components/Pagination'
import MovieList from '../components/MovieList'
import { useUrlSearchParams } from 'use-url-search-params'
import useLocalStorage from '../hooks/useLocalStorage'

const HomePage = () => {
    const history = useHistory()
    const inputSearch = useRef()
    const [searchParams, setSearchParams] = useUrlSearchParams({ search: "" }, { s: String })
    const [pageParams, setPageParams] = useUrlSearchParams({ page: 1 }, { page: Number })
    const [search, setSearch] = useState(searchParams.search)
    const [page, setPage] = useState(pageParams.page)
    const { data, error, isError, isLoading, isPreviousData } = useQuery(['searchMovies', search, page], () => searchForMovie(search, page))
    const { previousMovies } = useLocalStorage()

    useEffect(() => {
        setPageParams({ ...pageParams, page })
        setSearchParams({ ...searchParams, search })
    }, [page, search])

    const submitSearch = (e) => {
        e.preventDefault()
        setSearch(inputSearch.current.value)
    }

    console.log(previousMovies)

    return (
        <div className="page-container">
            <h1>This is the home page</h1>
            <form onSubmit={submitSearch}>
                <input type="text" defaultValue={search} placeholder="Search" ref={inputSearch} />
                <button>Search</button>
            </form>
            {isLoading && (<p className="my-3">Loading movies...</p>)}

            {isError && (<p className="my-3">Unable to get any data ({error})</p>)}

            {data?.results && data?.results.length > 0 ? (
                <>
                    <div className="options-container">
                        <Pagination isPreviousData={isPreviousData} totalPages={data?.total_pages} page={page} setPage={setPage} />
                    </div>
                    <MovieList data={data} />
                    <div className="options-container">
                        <Pagination isPreviousData={isPreviousData} totalPages={data?.total_pages} page={page} setPage={setPage} />
                    </div>
                </>
            ) : data?.results && search ? (
                <>
                    <p>There were no movies matching your search</p>
                </>
            ) : ""}


            {previousMovies && (
                <div className="previous-movies-container">
                    <h2>Some previous movies you have been looking at</h2>
                    <div className="details-container">
                        {previousMovies.map((movie, i) => (
                            <div className="movie-info-container" key={i} onClick={() => history.push(`/movies/${movie.id}`)}>
                                <div className="image-container">
                                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster}`} />
                                </div>
                                <button className="movie-info-btn">i</button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default HomePage
