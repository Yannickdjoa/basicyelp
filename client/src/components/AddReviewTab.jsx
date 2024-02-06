import React, { useState } from "react"
import { useParams } from "react-router-dom"
import RestaurantFinder from "../api/RestaurantFinder"

function AddReviewTab() {
    const { id } = useParams()
    const [name, setName] = useState()
    const [rating, setRating] = useState("rating")
    const [reviewText, setReviewText] = useState()

    const handleSubmit = async() => {
        
            const response= await RestaurantFinder.post(`/${id}/addReview`, {
              name,
              rating,
              reviewText
            })
    }
    return (
        <div className="mb-2">
            <form action="">
                <div className="form-row">
                    <div className="form-group col-8">
                        <label htmlFor="name">Name</label>
                        <input
                            value={name}
                            id="name"
                            onChange={(e) => setName(e.target.value)}
                            placeholder="name"
                            className="form-control"
                            type="text"
                        />
                    </div>
                    <div className="form-group col-8">
                        <label htmlFor="rating">Rating</label>
                        <select
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            id="rating"
                            className="form-control"
                        >
                            <option disabled>rating</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="reviewText">Review</label>
                    <textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        id="reviewText"
                        className="form-control"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    onClick={handleSubmit}
                    className="btn btn-primary"
                >
                    Submit
                </button>
            </form>
        </div>
    )
}

export default AddReviewTab
