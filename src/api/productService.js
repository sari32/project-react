import axios from "axios";
let baseUrl="https://lalinshop.onrender.com/api/product"
// let baseUrl="http://localhost:3000/api/product"

// let baseUrl="https://home-style.onrender.com/product"

export const httpGetAllProducts= async (page)=>{
    return axios.get(baseUrl+"?limit=4&page="+page);

    // return await axios.get(baseUrl);
}

export const httpGetProductById= async (prodId)=>{
    return axios.get(baseUrl+`/${prodId}`);

    // return await axios.get(baseUrl);
}

export const httpGetTotalPagesCount=()=>{
    return axios.get(baseUrl+"/total?limit=4");
}

export const httpAddProduct=(prod)=>{
    return axios.post(baseUrl, prod);
} 

export const httpUpdateProduct=(prod)=>{
    return axios.put(`${baseUrl}/${prod._id}`, prod);
}

export const httpRemoveProdutc=(prod)=>{
    return axios.delete(`${baseUrl}/${prod._id}`);
} 

