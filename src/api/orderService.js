import axios from "axios";
let baseUrl="https://lalinshop.onrender.com/api/order"
// let baseUrl="http://localhost:3000/api/order"

// let baseUrl="https://home-style.onrender.com/order"

export const httpAddOrder=(order)=>{
    return axios.post(baseUrl, order);
} 