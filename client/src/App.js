import React, { useContext } from "react"
import { RestaurantsContextProvider } from "./context/RestaurantsContext"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./routes/Home"
import RestaurantDetailsPage from "./routes/RestaurantDetailsPage"
import UpdatePage from "./routes/UpdatePage"

function App() {
    return (
        <RestaurantsContextProvider>
            <div className="container">
                <Router>
                    <Routes>
                        <Route exact path="/" Component={Home} />
                        <Route
                            exact
                            path="/restaurants/:id"
                            Component={RestaurantDetailsPage}
                        />
                        <Route
                            exact
                            path="/restaurants/:id/update"
                            Component={UpdatePage}
                        />
                    </Routes>
                </Router>
            </div>
        </RestaurantsContextProvider>
    )
}

export default App
