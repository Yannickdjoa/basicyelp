import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import RestaurantFinder from "../api/RestaurantFinder"

function UpdateRestaurant(props) {
    const { id } = useParams()
    const [name, setName] = useState("")
    const [location, setLocation] = useState("")
    const [priceRange, setPriceRange] = useState("")
    const navigate= useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            const response = await RestaurantFinder.get(`/${id}`)
            setName(response.data.data.restaurant.name)
            setLocation(response.data.data.restaurant.location)
            setPriceRange(response.data.data.restaurant.price_range)
        }
        fetchData()
    }, [id])
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await RestaurantFinder.put(`/${id}`, {
                name: name,
                location: location,
                price_range: priceRange,
            })
        } catch (error) {
            console.log(error)
        }
        navigate("/")
    }
    return (
        <div>
            <form action="">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        value={name}
                        id="name"
                        onChange={(e) => setName(e.target.value)}
                        className="form-control"
                        type="text"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        id="location"
                        className="form-control"
                        type="text"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price_range">Price Range</label>
                    <input
                        value={priceRange}
                        onChange={(e) => setPriceRange(e.target.value)}
                        id="price_range"
                        className="form-control"
                        type="number"
                    />
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

export default UpdateRestaurant
