import React , { useState } from 'react'
import Filter from '../components/Filter'

const FilterMovies = () => {
    const [genre, setGenre] = useState('')
    
    const handleChange = (value) => {
        setGenre(value)
    }

    console.log(genre)

    return (
        <div>
            <h1>This is the filter movies page</h1>

            <Filter handleChange />
        </div>
    )
}

export default FilterMovies
