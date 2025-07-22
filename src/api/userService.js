import axios from "axios";
let baseUrl="https://lalinshop.onrender.com/api/user"
// let baseUrl="http://localhost:3000/api/user"

// let baseUrl="https://home-style.onrender.com/user"

export const httpAddUser=(user)=>{
    return axios.post(baseUrl, user);
} 

export const httpLogin=(user)=>{
    return axios.post(baseUrl+"/login", user);
}