import { useState, useEffect } from 'react'

const useLocalStorage = () => {
    const [previousMovies, setPreviousMovies] = useState(() => {
        const jsonValue = localStorage.getItem("lastMovies")

		return jsonValue
			? JSON.parse(jsonValue)
			: undefined;
    }) 

    useEffect(() => {
		if (typeof previousMovies === 'undefined') {
			return;
		}

		let lastMovies = JSON.parse(localStorage.getItem("lastMovies"))
        if (lastMovies) {
            if (lastMovies.length !== previousMovies.length) {
                let matchFound = false
                lastMovies.map(movie => {                    
                    if (movie.title === previousMovies.title) {
                        matchFound = true                        
                    }
                })
                if (!matchFound) {
                    if (lastMovies.length == 10) {
                        lastMovies.shift()
                    }
                    localStorage.setItem("lastMovies", JSON.stringify([...lastMovies, previousMovies]));
                }          
            } 
        } else {
            localStorage.setItem("lastMovies", JSON.stringify([previousMovies]));
        }        
	}, [previousMovies])

    return {
        previousMovies,
        setPreviousMovies
    }
}

export default useLocalStorage