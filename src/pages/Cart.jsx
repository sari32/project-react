import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decreaseQty, increaseQty } from "../features/cartSlice";
import "./Product.scss"
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material';


function Cart() {
    const cartArr = useSelector(state => state.cart.arr) || [];
    let totalSum = useSelector(state => state.cart.totalSum) || 0
    let dispatch = useDispatch();
    let navigate = useNavigate();

    const user = useSelector(state => state.user.currentUser) || null;


    return (

        <div className="cart-container">
            <ul>
                {cartArr.map((item) => (
                    <li key={item._id}>
                        <img src={`images/${item.imgUrl}`} alt={item.name} />
                        <div className="details">
                            <strong>{item.name}</strong>
                            <p>{item.descrabtion}</p>
                            <p> ${item.price}</p>
                        </div>
                        <button onClick={() => {
                            dispatch(increaseQty(item._id));
                        }
                        }>+</button>
                        {item.qty}
                        <button onClick={() => dispatch(decreaseQty(item._id))}>-</button>
                        <div className="total-product">
                            Total: ${item.qty * item.price}
                        </div>
                    </li>
                ))}

            </ul>
            <div>Total cart: {totalSum}</div>

            {user != null && cartArr.length != 0 && <Button variant="contained" color="primary" type="submit" fullWidth onClick={() => navigate("/order")}>
                to order
            </Button>}
            {user == null && <p>to order please log in...</p>}
        </div>


    );
}

export default Cart;



{/* <ul>
                {cartArr.map(item => <li key={item._id}>
                    {item.name} : {item.qty}<br/>
                    descrabtion: {item.descrabtion}
                    
                    <button onClick={() => dispatch(increaseQty(item._id))}>➕</button>
                    <button onClick={() => dispatch(decreaseQty(item._id))}>➖</button>
                </li>
                )}
            </ul>
        </> */}