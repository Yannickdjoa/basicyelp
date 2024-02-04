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
            setSelectedRestaurant(response.data.data.restaurant)
        }
        fetchData()
    }, [id])
    return (
        <div>
            {selectedRestaurant && (
                <>
                    <h1 className="text-center display-1">{selectedRestaurant.name}</h1>
                    <div>
                        <StarsRating />
                    </div>
                    <div>
                        <ReviewsTab />
                    </div>
                    <AddReviewTab />
                </>
            )}
        </div>
    )
}

export default RestaurantDetailsPage
