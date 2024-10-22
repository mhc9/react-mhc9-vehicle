import React from 'react'

const TypeBadge = ({ type }) => {
    return (
        <span className={`badge rounded-pill ${type?.id === 1 ? 'bg-success' : (type?.id === 2 ? 'bg-primary' : 'bg-dark')} ml-1`}>
            {type?.name}
        </span>
    )
}

export default TypeBadge