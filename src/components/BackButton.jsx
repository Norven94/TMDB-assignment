import React from 'react'
import { useHistory } from 'react-router'
import Button from 'react-bootstrap/Button'

const BackButton = () => {
    const history = useHistory()

    return (
        <Button onClick={history.goBack}>Go back</Button>
    )
}

export default BackButton