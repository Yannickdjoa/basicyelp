import React from 'react'
import Header from '../components/Header'
import AddRestaurant from '../components/AddRestaurant'
import RestaurantsList from '../components/RestaurantsList'

function Home() {
  return (
    <div>
      <Header/>
      <AddRestaurant/>
      <RestaurantsList/>
    </div>
  )
}

export default Home
