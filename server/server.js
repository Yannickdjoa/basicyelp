require('dotenv').config();
const express= require("express");
const morgan = require('morgan');
const db = require ("./db");


const app= express();
const port = process.env.PORT;
//middleware
app.use(morgan("tiny"));
app.use(express.json());

//get all restaurants api
app.get("/api/v1/restaurants", async(req, res)=>{
try {
    const response= await db.query("SELECT * FROM restaurants;");
res.status(200).json({
    status: "success",
    results: response.rows.length,
    data: {
restaurants: response.rows
    }
});  
} catch (error) {
    console.log(error)
}
});
//get a single restaurant 

app.get("/api/v1/restaurants/:id", async (req, res)=>{
    try {
        const response= await db.query(`SELECT * FROM restaurants WHERE id=$1`, [req.params.id]);
res.status(200).json({
    status: "success",
    result: response.rows,
    data: {
        restaurant: response.rows
    }
});
    } catch (error) {
        console.log(error)
    };

});

//api to update a restaurant
app.put("/api/v1/restaurants/:id", async (req, res)=>{
    try {
        const response= await db.query("UPDATE restaurants SET name= $1, location=$2, price_range= $3 WHERE id=$4", [req.body.name, req.body.location, req.body.price_range, req.params.id]);
res.status(201).json({
    status: "success",
    result: response.rows,
    data: {
        restaurant: response.rows
    }
})
    } catch (error) {
        console.log(error);
    }

});

//api for creating new restaurant

app.post("/api/v1/restaurants", async(req, res)=>{
    try {
        const response= await db.query("INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3)", [req.body.name, req.body.location, req.body.price_range]);
        res.status(204).json({
            status: "created",
            data: {
                restaurant: response.rows[0]
            }
        });
        console.log(response);
    } catch (error) {
        console.log(error)
    }
    
});

//api for deleting a specific restaurant

app.delete("/api/v1/restaurants/:id", async (req, res)=>{
    try {
        const response= await db.query("DELETE FROM restaurants WHERE id=$1", [req.params.id]);
        res.status(204).json({
            status: "deleted"
        });
        console.log(response);
    } catch (error) {
        console.log(error);
    }
    
})

app.listen(port, ()=>{
    console.log(`app is running and listening on port ${port}`);
});

