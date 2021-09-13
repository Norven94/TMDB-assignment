import React, { useState, useEffect } from 'react'

const Pagination = ({isPreviousData, totalPages, page, setPage}) => {
    const [ pages, setPages ] = useState([page - 1, page, page + 1, page + 2 ,page + 3])

    //useEffect to avoid render to many pages and also move current page indicator
    useEffect(() => {
        if (page === 1) {
            setPages([page, page + 1, page + 2, page + 3, page + 4 ])
        } else if (page + 2 === totalPages) {
            setPages([page - 2, page - 1, page , page + 1 ,page + 2])
        } else if (page + 1 === totalPages) {
            setPages([page - 3, page - 2, page - 1 ,page ,page + 1])
        } else if (page === totalPages) {
            setPages([page - 4, page - 3, page - 2 ,page - 1 ,page])
        } else {
            setPages([page - 1, page, page + 1, page + 2 ,page + 3])
        }
    }, [page])

    return (
        <div className="pagination-container">
            <button
                className="primary-btn back-btn"
                onClick={() => setPage(currentPage => Math.max(currentPage - 1, 1))}
                disabled={page === 1}
            >
                Previous Page
            </button>

            <div className="pages-container">
            {pages.map((pageNum, i) => {
                if (pageNum === page) {
                    return ( 
                        <span 
                            className="page current" 
                            key={i} 
                            onClick={() => {
                                setPage(pageNum)
                            }} 
                        >{pageNum}</span> 
                    )
                } else {
                    return ( 
                        <span 
                            className="page" 
                            key={i} 
                            onClick={() => {
                                setPage(pageNum)
                            }} 
                        >{pageNum}</span> 
                    )
                }
            })}
            </div>

            <button
                className="primary-btn next-btn"
                onClick={() => {
                    if (!isPreviousData && page < totalPages) {
                        setPage(currentPage => Math.max(currentPage + 1))
                    }
                }}
                disabled={isPreviousData || totalPages === page}
            >
                Next Page
            </button>
        </div>
    )
}

export default Pagination
