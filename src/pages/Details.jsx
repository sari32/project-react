import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Details.scss";
// import { Button } from "@mui/material"
import { useDispatch } from "react-redux";
import { httpGetProductById } from "../api/productService";


function Details() {

    let params = useParams();
    let [product, setProduct] = useState(null);
    let navig = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        httpGetProductById(params.id)
            .then(res => setProduct(res.data))
            .catch(err => {
                console.error("Error fetching product:", err);
                alert(err.response?.data?.message || "Failed to fetch product");
            });
    }, [params.id]);

  return (
    <div className="Details">
    <button className="close-button" onClick={() => navig(-1)}>X</button>
    {product && (
        <div className="details-content">
            <img src={`/images/${product.imgUrl}`} alt={product.name} className="image" />
            <div className="product-details">
                <h2>{product.name}</h2>
                <p>{product.descrabtion}</p>
                <strong>{product.price} $</strong>

                {/* <Button variant="contained"
                 className="btn-cart" 
                 onClick={() => dispatch(increaseAmount(product))}>
                    Add to cart</Button> */}
            </div>
        </div>
    )}
</div>
);
  
}

export default Details
