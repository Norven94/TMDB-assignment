import React from 'react'
import Button from 'react-bootstrap/Button'

const Pagination = ({isPreviousData, totalPages, page, setPage}) => {
    return (
        <div>
            <Button
                onClick={() => setPage(currentPage => Math.max(currentPage - 1, 1))}
                disabled={page === 1}
            >
                Previous Page
            </Button>

            <span>Current Page: {page}</span>

            <Button
                onClick={() => {
                    if (!isPreviousData && page < totalPages) {
                        setPage(currentPage => Math.max(currentPage + 1))
                    }
                }}
                disabled={isPreviousData || totalPages === page}
            >
                Next Page
            </Button>
        </div>
    )
}

export default Pagination
