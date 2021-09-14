import React, { useState, useEffect, useRef } from 'react'
import { useQuery } from 'react-query'
import { searchForMovie } from '../services/API'
import Pagination from '../components/Pagination'
import MovieList from '../components/MovieList'
import PreviousMovies from '../components/previousMovies'
import { useUrlSearchParams } from 'use-url-search-params'

const HomePage = () => {
    const inputSearch = useRef()
    const [searchParams, setSearchParams] = useUrlSearchParams({ search: "" }, { s: String })
    const [pageParams, setPageParams] = useUrlSearchParams({ page: 1 }, { page: Number })
    const [search, setSearch] = useState(searchParams.search)
    const [page, setPage] = useState(pageParams.page)
    const { data, error, isError, isLoading, isPreviousData } = useQuery(['searchMovies', search, page], () => searchForMovie(search, page))

    useEffect(() => {
        setPageParams({ ...pageParams, page })
        setSearchParams({ ...searchParams, search })
    }, [page, search])

    const submitSearch = (e) => {
        e.preventDefault()
        setSearch(inputSearch.current.value)
    }

    return (
        <div className="page-container">
            <h1>This is the home page</h1>
            <form onSubmit={submitSearch}>
                <input type="text" defaultValue={search} placeholder="Search for a movie..." ref={inputSearch} />
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


            <PreviousMovies />
        </div>
    )
}

export default HomePage
