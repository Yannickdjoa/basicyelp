require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const db = require("./db")
const cors = require("cors")

const app = express()

app.use(morgan("tiny"))

//middleware
app.use(cors())
app.use(express.json())

//get all restaurants api
app.get("/api/v1/restaurants", async (req, res) => {
    try {
        const restaurantRatingData = await db.query(
            "SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*) AS num_reviews, TRUNC(AVG(rating), 1) AS average_rating FROM reviews GROUP BY restaurant_id)reviews ON restaurants.id= restaurant_id;",
        )
        res.status(200).json({
            status: "success",
            results: restaurantRatingData.rows.length,
            data: {
                restaurants: restaurantRatingData.rows,
            },
        })
    } catch (error) {
        console.log(error)
    }
})
//get a single restaurant

app.get("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const restaurant = await db.query(
            "SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*) AS num_reviews, TRUNC(AVG(rating), 1) AS average_rating FROM reviews GROUP BY restaurant_id)reviews ON restaurants.id= restaurant_id WHERE id=$1",
            [req.params.id],
        )
        const reviews = await db.query(
            "SELECT * FROM reviews WHERE restaurant_id=$1",
            [req.params.id],
        )
        res.status(200).json({
            status: "success",
            data: {
                restaurant: restaurant.rows[0],
                reviews: reviews.rows,
            },
        })
    } catch (error) {
        console.log(error)
    }
})

//api to update a restaurant
app.put("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const response = await db.query(
            "UPDATE restaurants SET name= $1, location=$2, price_range= $3 WHERE id=$4 returning *",
            [
                req.body.name,
                req.body.location,
                req.body.price_range,
                req.params.id,
            ],
        )
        res.status(201).json({
            status: "success",
            result: response.rows,
            data: {
                restaurant: response.rows,
            },
        })
    } catch (error) {
        console.log(error)
    }
})

//api for creating new restaurant

app.post("/api/v1/restaurants", async (req, res) => {
    try {
        const results = await db.query(
            "INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) returning *",
            [req.body.name, req.body.location, req.body.price_range],
        )
        res.status(201).json({
            status: "success",
            data: {
                restaurant: results.rows[0],
            },
        })
        console.log(results)
    } catch (error) {
        console.log(error)
    }
})

//post reviews
app.post("/api/v1/restaurants/:id/addReview", async (req, res) => {
    try {
        const results = await db.query(
            "INSERT INTO reviews (restaurant_id, name, rating, reviewText) VALUES ($1, $2, $3, $4) returning *",
            [
                req.params.id,
                req.body.name,
                req.body.rating,
                req.body.reviewText,
            ],
        )
        res.status(201).json({
            status: "success",
            data: {
                review: results.rows[0],
            },
        })
        console.log(results)
    } catch (error) {
        console.log(error)
    }
})

//api for deleting a specific restaurant

app.delete("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const response = await db.query("DELETE FROM restaurants WHERE id=$1", [
            req.params.id,
        ])
        res.status(204).json({
            status: "deleted",
        })
        console.log(response)
    } catch (error) {
        console.log(error)
    }
})

const port = process.env.PORT
app.listen(port, () => {
    console.log(`app is running and listening on port ${port}`)
})
