import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { httpAddProduct } from "../api/productService";
import { TextField, Button, Card, CardContent, Typography, Box } from "@mui/material";

function AddProduct() {
  let navigate = useNavigate();

  function save(data) {
    data.categories = data.categories.split(",").map((c) => c.trim());
    httpAddProduct(data)
      .then(() => {
        alert("Product successfully added");
        console.log(data);
        navigate("/list");
      })
      .catch((err) => {
        console.log(err);
        alert("Error adding product");
      });
  }

  let { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Card sx={{ maxWidth: 600, width: "100%", p: 3, boxShadow: 3, bgcolor: "white" }}>
        <CardContent>
          <Typography variant="h5" textAlign="center" gutterBottom>
            Add Product
          </Typography>

          <form onSubmit={handleSubmit(save)}>
            <TextField
              label="Name"
              fullWidth
              margin="normal"
              variant="filled"
              {...register("name", { required: "Name is required" })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />

            <TextField
              label="Description"
              fullWidth
              margin="normal"
              variant="filled"
              {...register("descrabtion", { 
                required: "Description is required",
                minLength: { value: 2, message: "Description must be at least 2 characters" }
              })}
              error={!!errors.descrabtion}
              helperText={errors.descrabtion?.message}
            />

            <TextField
              label="Production Date"
              type="date"
              fullWidth
              margin="normal"
              variant="filled"
              InputLabelProps={{ shrink: true }}
              {...register("productionDate", {
                validate: (value) =>
                  !value || new Date(value) <= new Date() || "Production date cannot be in the future",
              })}
              error={!!errors.productionDate}
              helperText={errors.productionDate?.message}
            />

            <TextField
              label="Image URL"
              fullWidth
              margin="normal"
              variant="filled"
              {...register("imgUrl", {
                required: "Image URL is required",
                pattern: {
                  value: /\.(png|jpg|jpeg|gif|webp)$/i,
                  message: "Invalid image file type (must be .png, .jpg, .jpeg, .gif, or .webp)",
                },
              })}
              error={!!errors.imgUrl}
              helperText={errors.imgUrl?.message}
            />

<TextField
              label="Image URL Hover"
              fullWidth
              margin="normal"
              variant="filled"
              {...register("imgUrlHover", {
                pattern: {
                  value: /\.(png|jpg|jpeg|gif|webp)$/i,
                  message: "Invalid image file type (must be .png, .jpg, .jpeg, .gif, or .webp)",
                },
              })}
              error={!!errors.imgUrlHover}
              helperText={errors.imgUrlHover?.message}
            />


            <TextField
              label="Price"
              type="number"
              step="0.01"
              fullWidth
              margin="normal"
              variant="filled"
              {...register("price", {
                required: "Price is required",
                min: { value: 0, message: "Price must be a positive number" },
              })}
              error={!!errors.price}
              helperText={errors.price?.message}
            />

            <TextField
              label="Categories (comma separated)"
              fullWidth
              margin="normal"
              variant="filled"
              {...register("categories", {
           
              })}
              error={!!errors.categories}
            />

            <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
              Add Product
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default AddProduct;
