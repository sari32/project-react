import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  Divider,
  Snackbar,
  Typography
} from "@mui/material";
import { httpAddOrder } from "../api/orderService";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../features/cartSlice";

const steps = ["Order summary", "Shipping details", "Order confirmation"];

function Order() {
  const cart = useSelector(state => state.cart.arr); 
  const user = useSelector(state => state.user.currentUser)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [activeStep, setActiveStep] = useState(0);
  const [address, setAddress] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // תאריך הזמנה - מוגדר אוטומטית לתאריך נוכחי
  const orderDate = new Date();
  // תאריך יעד - שבוע מתאריך ההזמנה
  const targetDate = new Date(orderDate);
  targetDate.setDate(orderDate.getDate() + 7);

  // חישוב סכום המוצרים
  const productsSum = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shippingCost = 30; // כפי שמוגדר במודל
  const totalSum = productsSum + shippingCost;

  // מעבר לשלב הבא
  const handleNext = () => {
    // אם המשתמש נמצא בשלב "פרטי משלוח", נוודא שהכתובת מוזנת
    if (activeStep === 1 && !address.trim()) {
      setSnackbarMessage("enter a shipping address");
      setSnackbarOpen(true);
      return;
    }
    setActiveStep(prev => prev + 1);
  };

  // חזרה לשלב הקודם
  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  // הפונקציה לטיפול בשליחת ההזמנה לשרת
  const handleOrder = async () => {
    // הכנת נתוני ההזמנה בהתאם למודל שלך
    const orderData = {
      orderDate: orderDate.toISOString(),
      targetDate: targetDate.toISOString(),
      address: address,
      userId: user._id, // יש להחליף במזהה המשתמש בפועל
      products: cart.map(item => ({
        name: item.name,
        price: item.price,
        count: item.qty, // בהתאם למודל minimalSchema
        _id: item._id
      })),
      isSent: false,
      priceSending: shippingCost,
      totalSum: totalSum
    };

    httpAddOrder(orderData)
      .then(() => {
        setSnackbarMessage("The order was placed successfully.");
        setTimeout(() => {   //מעבר לעמוד המוצרים לאחר 3 שניות
             navigate("/list");
        }, 3000);
       
        dispatch(clearCart());
      })
      .catch((error) => {
        console.error("Order error:", error);
        setSnackbarMessage("An error occurred while placing the order.");
      })
      .finally(() => {
        setSnackbarOpen(true);
      });
  };


  // תוכן עבור כל שלב
  const renderStepContent = step => {
    switch (step) {
      case 0:
        return (
          <div>
            <Typography variant="h6" gutterBottom>Order summary</Typography>
            <List>
              {cart.map(item => (
                <ListItem key={item._id}>
                  <ListItemText
                    primary={`${item.name} (x${item.qty})`}
                    secondary={`sum: $${item.price * item.qty}`}
                  />
                </ListItem>
              ))}
            </List>
            <Divider style={{ margin: "10px 0" }} />
            <Typography> total sum: ${productsSum}</Typography>
            <Typography>shipping cost: ${shippingCost}</Typography>
            <Typography variant="h6">total: ${totalSum}</Typography>
          </div>
        );
      case 1:
        return (
          <div>
            <Typography variant="h6" gutterBottom>Shipping details</Typography>
            <TextField
              label="address"
              fullWidth
              multiline
              rows={3}
              value={address}
              onChange={e => setAddress(e.target.value)}
              margin="normal"
            />
          </div>
        );
      case 2:
        return (
          <div>
            <Typography variant="h6" gutterBottom>Order confirmation</Typography>
            <Typography>order date : {orderDate.toLocaleDateString()}</Typography>
            <Typography>target date: {targetDate.toLocaleDateString()}</Typography>
            <Typography variant="subtitle1" style={{ margin: "10px 0" }}>
              enter to order
            </Typography>
          </div>
        );
      default:
        return "not found";
    }
  };

  return (
    <Paper style={{ padding: 20, maxWidth: 600, margin: "20px auto" }}>
      <Stepper activeStep={activeStep}>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div style={{ margin: "20px 0" }}>
        {renderStepContent(activeStep)}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {activeStep > 0 && (
          <Button variant="outlined" onClick={handleBack}>
            back
          </Button>
        )}
        {activeStep < steps.length - 1 && (
          <Button variant="contained" color="primary" onClick={handleNext}>
            continue
          </Button>
        )}
        {activeStep === steps.length - 1 && (
          <Button variant="contained" color="primary" onClick={handleOrder}>
           Make an order
          </Button>
        )}
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Paper>
  );
}

export default Order;
