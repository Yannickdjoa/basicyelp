import React from "react"
import StarsRating from "./StarsRating"

function ReviewsTab({ reviews }) {
    console.log(reviews)
    return (
        <div className="row row-cols-3 mb-2">
            {reviews.map((review) => {
                return (
                    <div
                        key={review.id}
                        className="card text-white bg-primary mb-3 mr-4"
                        style={{ maxWidth: "30%" }}
                    >
                        <div className="card-header d-flex justify-content-between">
                            <span>{review.name}</span>
                            <span>
                                <StarsRating rating={review.rating} />
                            </span>
                        </div>
                        <div className="card-body">
                            <p className="card-text">{review.reviewtext}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default ReviewsTab
