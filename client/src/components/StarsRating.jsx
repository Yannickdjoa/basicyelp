import React from "react"

function StarsRating({ rating }) {
    const stars = []
    for (let i = 0; i <= 5; i++) {
        if (i <= rating) {
            stars.push(<i key={i} className="fa-solid fa-star text-warning"></i>)
        } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
            stars.push(
                <i key={i} className="fa-regular fa-star-half-stroke text-warning"></i>,
            )
        } else {
            stars.push(<i key={i} className="fa-sharp fa-regular fa-star text-warning"></i>)
        }
    }
    return <div>{stars}</div>
}

export default StarsRating
