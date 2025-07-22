import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import ProductList from './pages/ProductList.jsx'
import NavBar from './components/NavBar'
import Router from './components/Router'
import Cart from './pages/Cart'
import Login from './pages/Login'
import AddProduct from './pages/AddProduct.jsx'
import { useDispatch } from 'react-redux'
import { userIn } from './features/userSlice.js'



function App() {

  let dispatch = useDispatch();
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("currentUser"));
    if (user)
      dispatch(userIn(user));
  }, [])

  return (
    <>
      <NavBar />
      <Router />
    </>
  )
}

export default App
