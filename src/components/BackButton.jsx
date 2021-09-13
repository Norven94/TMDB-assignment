import React from 'react'
import { useHistory } from 'react-router'

const BackButton = () => {
    const history = useHistory()

    return (
        <button className="btn" onClick={history.goBack}>Go back</button>
    )
}

export default BackButton