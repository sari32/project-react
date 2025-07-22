import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, increaseQty } from '../features/cartSlice'
import UpdateProduct from './UpdateProduct';
import { Link, useNavigate } from 'react-router-dom';
import "./Product.scss";
import Cart from './Cart';
import MiniCart from './MiniCart';
import { Card, CardContent, Typography, Button, CardMedia, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';


function Product({ product, removeProduct }) {
    let dispatch = useDispatch();
    const navigate=useNavigate();
    const user = useSelector(state => state.user.currentUser) || null;
    let [showCart, setShowCart] = useState(false);
    function popCart() {
        setShowCart(true);
        setTimeout(() => {
            setShowCart(false);
        }, 4000);
    }

    function handleMouseEnter(e) {
        e.target.src=`images/${product.imgUrlHover||product.imgUrl}`;
    }

    function handleMouseLeave(e) {
        e.target.src=`images/${product.imgUrl}`;
    }

    return (
        <Card className="product-card" sx={{ maxWidth: 300, m: 2, boxShadow: 0, position: "relative" }}>
            <Link to={`details/${product._id}`}>
                <CardMedia
                    component="img"
                    height="420" // שינוי גובה התמונה
                    image={`images/${product.imgUrl}`} // תמונה ראשונית
                    alt={product.name}
                    sx={{
                        objectFit: "cover", // שינויים כדי שהתמונה תתמלא בגבולות ותכסה את כל המקום
                        backgroundColor: "#f5f5f5",
                        width: "100%", // לוודא שהתמונה מתפשטת לאורך כל הרוחב של הרכיב
                    }}
                onMouseEnter={handleMouseEnter} // אירוע כאשר העכבר נכנס
                onMouseLeave={handleMouseLeave} // אירוע כאשר העכבר עוזב
                />
            </Link>
            {user?.role != "ADMIN" &&
                <Fab
                    color="primary"
                    size="small"
                    sx={{
                        position: "absolute",
                        top: 400,
                        left: 10,
                        zIndex: 2,
                        backgroundColor: "#FFFFFF",
                        color: "#000000"
                    }}
                    onClick={() => {
                        dispatch(addToCart(product));
                        popCart();
                    }}
                >
                    <AddIcon />
                </Fab>
            }

            <CardContent sx={{ textAlign: "center", pt: 3 }}>
                <div className="card-txt">
                    <Typography variant="h7" component="div" className="product-name" sx={{ textDecoration: 'none' }}>
                        {product.name}
                    </Typography>
                    <Typography variant="h7" color="text.secondary" sx={{ textDecoration: 'none' }}>
                        {product.price} $
                    </Typography>
                </div>

                {user?.role === "ADMIN" && (
                    <Button
                        // variant="outlined"
                        startIcon={<DeleteIcon />}
                        sx={{ mt: 1 }}
                        onClick={() => removeProduct(product)}
                    >
                    </Button>
                )}
                {user?.role === "ADMIN" && (
                    <Button
                        // variant="outlined"
                        startIcon={<ModeEditOutlineOutlinedIcon />}
                        sx={{ mt: 1 }}
                        onClick={()=>navigate('/updateProduct', { state: { product } })}>
                    </Button>
                )}

                {showCart && <MiniCart />}
            </CardContent>
        </Card>


    )
}

export default Product

