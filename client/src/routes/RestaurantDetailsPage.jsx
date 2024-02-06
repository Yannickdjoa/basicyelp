import React, { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import { RestaurantsContext } from "../context/RestaurantsContext"
import RestaurantFinder from "../api/RestaurantFinder"
import StarsRating from "../components/StarsRating"
import AddReviewTab from "../components/AddReviewTab"
import ReviewsTab from "../components/ReviewsTab"

function RestaurantDetailsPage() {
    const { id } = useParams()
    const { selectedRestaurant, setSelectedRestaurant } =
        useContext(RestaurantsContext)
    useEffect(() => {
        const fetchData = async () => {
            const response = await RestaurantFinder.get(`/${id}`)
            console.log(response)
            setSelectedRestaurant(response.data.data)
        }
        fetchData()
    }, [id, setSelectedRestaurant])
    return (
        <div>
            {selectedRestaurant && (
                <>
                    <h1 className="text-center display-1">
                        {selectedRestaurant.restaurant.name}
                    </h1>
                    <div>
                        <StarsRating
                            rating={
                                selectedRestaurant.restaurant.average_rating
                            }
                        />
                    </div>
                    <span className="text-warning ml-1">
                        {selectedRestaurant.restaurant.num_reviews

                            ? `(${selectedRestaurant.restaurant.num_reviews})`
                            : "(0)"}
                    </span>
                    <div>
                        <ReviewsTab reviews={selectedRestaurant.reviews} />
                    </div>
                    <AddReviewTab />
                </>
            )}
        </div>
    )
}

export default RestaurantDetailsPage
