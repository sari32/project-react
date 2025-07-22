import React from "react";
import { useSelector } from "react-redux";
import { Card, CardContent, Typography, List, ListItem, Box, Divider, Fade } from "@mui/material";
import ProductMiniCart from "./ProductMiniCart";

function MiniCart() {
  let cartArr = useSelector((state) => state.cart.arr) || [];
  let totalSum = useSelector((state) => state.cart.totalSum) || 0;
  let totalCnt = useSelector((state) => state.cart.totalCnt) || 0;

  return (
    <Fade in timeout={500}>
      <Card
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          width: 250,
          boxShadow: 5,
          borderRadius: 2,
          bgcolor: "white",
          zIndex: 1000,
        }}
      >
        <CardContent>
          <Typography variant="h6" textAlign="center" gutterBottom>
            {totalCnt} items in cart
          </Typography>

          <List sx={{ maxHeight: 150, overflowY: "auto" }}>
            {cartArr.length > 0 ? (
              cartArr.map((item) => (
                <ListItem key={item._id} sx={{ display: "flex", justifyContent: "space-between" }}>
                  <ProductMiniCart product={item} />
                </ListItem>
              ))
            ) : (
              <Typography variant="body2" textAlign="center">
                Cart is empty
              </Typography>
            )}
          </List>

          <Divider sx={{ my: 1 }} />

          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2">Total: ${totalSum}</Typography>
            <Typography variant="body2">Items: {totalCnt}</Typography>
          </Box>
        </CardContent>
      </Card>
    </Fade>
  );
}

export default MiniCart;







// import React from 'react'
// import { useSelector } from 'react-redux'
// import Product from './Product';
// import ProductMiniCart from './ProductMIniCart';

// function MiniCart() {
//   let cartArr = useSelector(state => state.cart.arr) || [];
//   let totalSum = useSelector(state => state.cart.totalSum) || 0;
//   let totalCnt = useSelector(state => state.cart.totalCnt) || 0;

//   return (
//     <>
//   <h1>the product in cart</h1>
//       <ul>
//         {cartArr.map(item =>
//           <li key={item._id}><ProductMiniCart product={item} /></li>
//         )}
//       </ul>
//       <h3>sum: {totalSum}</h3>
//       <h3>count products: {totalCnt}</h3>

//     </>
//   )
// }

// export default MiniCart
