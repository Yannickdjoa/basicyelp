import React, { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import RestaurantFinder from "../api/RestaurantFinder"
import { RestaurantsContext } from "../context/RestaurantsContext"

function RestaurantsList(props) {
    const { restaurants, setRestaurants } = useContext(RestaurantsContext)
    let navigate = useNavigate()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await RestaurantFinder.get("/")
                setRestaurants(response.data.data.restaurants)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [setRestaurants])
    const handleSelectedRestaurant= async (e, id)=>{
        e.stopPropagation()
        navigate(`/restaurants/${id}`)
    }

    const handleUpdate = async (e, id) => {
        e.stopPropagation()
        try {
            navigate(`/restaurants/${id}/update`)
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async (e, id) => {
        e.stopPropagation()
        try {
            await RestaurantFinder.delete(`/${id}`)
            setRestaurants(
                restaurants.filter((restaurant) => {
                    return restaurant.id !== id
                }),
            )
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="list-group">
            <table className="table table-hover table-dark">
                <thead>
                    <tr className="bg-primary">
                        <th className="col">Restaurant</th>
                        <th className="col">Location</th>
                        <th className="col">Price Range</th>
                        <th className="col">Ratings</th>
                        <th className="col">Edit</th>
                        <th className="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {restaurants &&
                        restaurants.map((restaurant) => {
                            return (
                                <tr
                                    key={restaurant.id}
                                    className="table-primary"
                                    onClick={(e)=>handleSelectedRestaurant(e, restaurant.id)}
                                >
                                    <td>{restaurant.name}</td>
                                    <td>{restaurant.location}</td>
                                    <td>
                                        {"$".repeat(restaurant.price_range)}
                                    </td>
                                    <td>Reviews</td>
                                    <td>
                                        <button
                                            onClick={(e) => {
                                                handleUpdate(e, restaurant.id)
                                            }}
                                            className="btn btn-warning"
                                        >
                                            Update
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            onClick={(e) =>
                                                handleDelete(e, restaurant.id)
                                            }
                                            type="button"
                                            className="btn btn-danger"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                </tbody>
            </table>
        </div>
    )
}

export default RestaurantsList
