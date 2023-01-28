import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CartPage from '../pages/cartPage/CartPage'
import ProductPage from '../pages/ProductPage/ProductPage'


const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<ProductPage/>}/>
        <Route path='/cart' element={<CartPage/>}/>
      </Routes>
    </div>
  )
}

export default AllRoutes
