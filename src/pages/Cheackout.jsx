import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { httpAddOrder } from '../api/orderService';

function Cheackout() {
    let navig = useNavigate();
    let user = useSelector(state => state.user.currentUser);

    if (!user)
        navig("/login");
    let arr = useSelector(state => state.cart.arr);
    let [address, setAddress] = useState();

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            httpAddOrder({
                userId: user._id,
                products: arr,
                address: address
            }).then(res => {
                alert("ההזמנה בוצעה בהצלחחה!");
                console.log(res);
            }).catch(err => {
                console.log(err);
                alert("שגיאה בהזמנה");
            })
        }}>
            <input type="text" onChange={(e) => { setAddress(e.target.value) }} />
            <input type="submit" />

        </form>
    )
}

export default Cheackout
