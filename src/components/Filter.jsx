import React from 'react'
import { useQuery } from 'react-query'
import { getGenres } from '../services/API'

const Filter = ({handleChange}) => {
    const { data, error, isError, isLoading, isPreviousData } = useQuery(['genre'], () => getGenres())

    const handleGenreChange = (e) => {
        handleChange(e.target.value)
    }
    

    return (
        <div>
            <p>Filter Component</p>

            {isLoading && (<p className="my-3">Loading movies...</p>)}

            {isError && (<p className="my-3">Unable to get any data ({error})</p>)}

            {data && (
                <select name="genre" onChange={handleGenreChange}>
                    {data.genres.map((genre, i) => (                        
                        <option key={i} value={genre.id}>{genre.name}</option>                        
                    ))}
                </select>
            )}
        </div>
    )
}

export default Filter
