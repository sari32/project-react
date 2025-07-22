import React from 'react';
import { Box, Input, Button, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { httpAddUser } from '../api/userService';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userIn } from '../features/userSlice';

export default function SignUp() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.currentUser) || null;
  const isAdmin = user?.role === "ADMIN";

  const save = (data) => {
    httpAddUser(data)
      .then(res => {
        alert("משתמש נוסף בהצלחה");
        console.log(res.data);
        if (!user) // אם המשתמש לא מנהל
          dispatch(userIn(res.data));
        navigate("/list");
      })
      .catch(err => {
        console.log(err);
        alert("שגיאה בהרשמה");
      });
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', padding: 3 }}>
      <form noValidate onSubmit={handleSubmit(save)}>
        <Stack spacing={2}>

          {/* שם משתמש */}
          <Input
            placeholder="user name"
            {...register("userName", {
              required: "Username is required",
              minLength: { value: 3, message: "Username must be at least 3 characters long" }
            })}
          />
          {errors.userName && <div style={{ color: 'red' }}>{errors.userName.message}</div>}

          {/* סיסמה */}
          <Input
            type="password"
            placeholder="password"
            {...register("passWord", {
              required: "Password is required",
              minLength: { value: 6, message: "Password must be at least 6 characters long" }
            })}
          />
          {errors.passWord && <div style={{ color: 'red' }}>{errors.passWord.message}</div>}

          {/* אימייל */}
          <Input
            placeholder="email address"
            {...register("email", {
              required: "Email address is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email address"
              }
            })}
          />
          {errors.email && <div style={{ color: 'red' }}>{errors.email.message}</div>}

          {/* טלפון */}
          <Input
            placeholder="phone"
            {...register("phone", {
              required: "Phone is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Phone number must be 10 digits"
              }
            })}
          />
          {errors.phone && <div style={{ color: 'red' }}>{errors.phone.message}</div>}

          {/* Role - רק אם המשתמש מנהל */}
          {isAdmin && (
            <>
              <Input
                type="text"
                placeholder="role (ADMIN / USER)"
                {...register("role", {
                  required: "Role is required",
                  validate: value => (value === "ADMIN" || value === "USER") || "Role must be ADMIN or USER"
                })}
              />
              {errors.role && <div style={{ color: 'red' }}>{errors.role.message}</div>}
            </>
          )}

          {/* כפתור שליחה */}
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Signup
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
