import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { httpUpdateProduct } from "../api/productService";
import { useLocation, useNavigate } from "react-router-dom";
import { TextField, Button, Box, Card, CardContent, Typography } from "@mui/material";

function UpdateProduct() {
  let { register, handleSubmit, setValue } = useForm();
  let navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product;

  useEffect(() => {
    if (product) {
      setValue("name", product.name);
      setValue("descrabtion", product.descrabtion);
      setValue("price", product.price);
      setValue("imgUrl", product.imgUrl);
      setValue("imgUrlHover", product.imgUrlHover)
    }
  }, [product, setValue]);

  function save(data) {
    data._id = product._id;
    console.log(data);

    httpUpdateProduct(data)
      .then(() => {
        alert("Product updated successfully");
        navigate("/list");
      })
      .catch((err) => {
        console.log(err);
        alert("Error updating product");
      });
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: "100vh", width: "100%" }}>
      <Card sx={{ maxWidth: 600, width: "100%", p: 3, boxShadow: 3, bgcolor: "white" }}>
        <CardContent>
          <Typography variant="h5" textAlign="center" gutterBottom>
            Update Product
          </Typography>

          <form onSubmit={handleSubmit(save)}>
            {/* Name */}
            <TextField
              label="Name"
              fullWidth
              margin="normal"
              variant="filled"
              {...register("name", { required: "Name is required" })}
            />
            
            {/* Description */}
            <TextField
              label="Description"
              fullWidth
              margin="normal"
              variant="filled"
              {...register("descrabtion")}
            />

            {/* Price */}
            <TextField
              label="Price"
              type="number"
              fullWidth
              margin="normal"
              variant="filled"
              {...register("price", { min: 0 })}
            />

            {/* Image URL */}
            <TextField
              label="Image URL"
              fullWidth
              margin="normal"
              variant="filled"
              {...register("imgUrl")}
            />

             {/* Image URL Hover */}
             <TextField
              label="Image URL Hover"
              fullWidth
              margin="normal"
              variant="filled"
              {...register("imgUrlHover")}
            />

            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button type="submit" variant="contained" color="primary" sx={{ width: "48%" }}>
                Update
              </Button>
              <Button onClick={() => navigate("/list")} variant="outlined" color="secondary" sx={{ width: "48%" }}>
                Cancel
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default UpdateProduct;
