import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { httpLogin } from '../api/userService';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userIn } from '../features/userSlice';
import { Drawer, Button, Box, TextField } from '@mui/material';

function Login() {
  let dispatch = useDispatch();
  let navigate = useNavigate();

  // Manage Drawer state, it opens by default now
  const [open, setOpen] = useState(true);

  function login(data) {
    httpLogin(data)
      .then(res => {
        console.log(res.data);
        dispatch(userIn(res.data));
        alert("You have successfully connected");
        navigate("/list");
      })
      .catch(err => {
        console.log(err);
        alert("Connection error");
      });
  }

  let { register, handleSubmit, formState: { errors } } = useForm();

  // Automatically open Drawer on component mount
  useEffect(() => {
    setOpen(true);
  }, []);



  return (
    <div>
      <Drawer anchor="left" open={open} onClose={() => { setOpen(false); navigate(-1) }}>
        <Box sx={{ width: 300, p: 2 }}>
          <form noValidate onSubmit={handleSubmit(login)}>
            <TextField
              label="Username"
              fullWidth
              margin="normal"
              {...register("userName", {
                required: { value: true, message: "username is required" }
              })}
            />
            {errors.userName && <div className='err-msg'>{errors.userName.message}</div>}

            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              {...register("passWord", {
                required: { value: true, message: "password is required" }
              })}
            />
            {errors.passWord && <div className='err-msg'>{errors.passWord.message}</div>}

            <Button variant="contained" color="primary" type="submit" fullWidth>
              login
            </Button>

            {/* כפתור ניווט לרישום */}
            <Button variant="text" color="primary" onClick={() => navigate('/signup')} fullWidth sx={{ mt: 2 }}>
              to register
            </Button>
          </form>
        </Box>
      </Drawer>
    </div>
  );
}

export default Login;







// ללא דראור----------------------------------------
// import React from 'react'
// import { useForm } from 'react-hook-form'
// import { httpLogin } from '../api/userService';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { userIn } from '../features/userSlice';

// function Login() {
//     let dispatch=useDispatch();
//     let navigate=useNavigate();
//     function login(data) {
//         httpLogin(data).then(res => {
//             dispatch(userIn(res.data));
//             alert(" התחבר בהצלחה");
//             navigate("/list");
//         }).catch(err => {
//             console.log(err);
//             alert("שגיאה בהתחבות");
//         })
//     }
//     let { register, handleSubmit, formState: { errors } } = useForm()
//     return (
//         <form noValidate onSubmit={handleSubmit(login)}>
//             <input type="text" {...register("userName", {
//                 required: { value: true, message: "username is required" }
//             })} />
//             {errors.userName && <div className='err-msg'>
//                 {errors.userName.message}</div>}

//             <input type="password" {...register("passWord", {
//                 required: { value: true, message: "password is required" }
//             })} />
//             {errors.passWord && <div className='err-msg'>
//                 {errors.passWord.message}</div>}
//             <input type="submit" />
//         </form>
//     )
// }
// export default Login
