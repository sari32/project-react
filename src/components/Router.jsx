import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ProductList from '../pages/ProductList'
import SignUp from '../pages/SignUp'
import Cheackout from '../pages/Cheackout'
import Cart from '../pages/Cart'
import Login from '../pages/Login'
import AddProduct from '../pages/AddProduct'
import Order from '../pages/Order'
import Details from '../pages/Details'
import { useSelector } from 'react-redux'
import "./Router.scss"
import UpdateProduct from '../pages/UpdateProduct'
import AdminRoute from './AdminRoute'

function Router() {

  return (
    <div className='pages'>
      <Routes>
        <Route path='/list' element={<ProductList />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/cheackout' element={<Cheackout />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/order' element={<Order />} />
        <Route path='/details/:id' element={<Details />} />
        <Route path='list/details/:id' element={<Details />} />
        <Route element={<AdminRoute />}>
          <Route path='/addProduct' element={<AddProduct />} />
          <Route path='/updateProduct' element={<UpdateProduct />} />
        </Route>
        <Route path='*' element={<ProductList />} />
      </Routes>
    </div>
  )
}

export default Router
