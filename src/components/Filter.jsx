import React from 'react'
import { useQuery } from 'react-query'
import { getGenres } from '../services/API'

const Filter = ({setGenre}) => {
    const { data, error, isError } = useQuery(['genre'], () => getGenres())    

    return (
        <div>
            {isError && (<p className="my-3">Unable to get any genres for filter ({error})</p>)}

            {data && (
                <select name="genre" onChange={(e) => setGenre(e.target.value)}>
                    {data.genres.map((genre, i) => (                        
                        <option key={i} value={genre.id}>{genre.name}</option>                        
                    ))}
                </select>
            )}
        </div>
    )
}

export default Filter
