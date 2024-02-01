import React from "react"

function RestaurantsList() {
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
                    <tr className="table-primary">
                        <td>McDonalds</td>
                        <td>Yaounde</td>
                        <td>$$</td>
                        <td>Reviews</td>
                        <td>
                            <button>Update</button>
                        </td>
                        <td>
                            <button>Delete</button>
                        </td>
                    </tr>
                </tbody>
                <tbody>
                    <tr className="table-primary">
                        <td>Emy restaurant</td>
                        <td>Yaounde</td>
                        <td>$$$$$</td>
                        <td>Reviews</td>
                        <td>
                            <button>Update</button>
                        </td>
                        <td>
                            <button>Delete</button>
                        </td>
                    </tr>
                </tbody>
                <tbody>
                    <tr className="table-primary">
                        <td>Ndole Kmer</td>
                        <td>Douala</td>
                        <td>$$$$</td>
                        <td>Reviews</td>
                        <td>
                            <button>Update</button>
                        </td>
                        <td>
                            <button>Delete</button>
                        </td>
                    </tr>
                </tbody>
                <tbody>
                    <tr className="table-primary">
                        <td>Eru club</td>
                        <td>Yaounde</td>
                        <td>$$$</td>
                        <td>Reviews</td>
                        <td>
                            <button>Update</button>
                        </td>
                        <td>
                            <button>Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default RestaurantsList
