import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userOut } from '../features/userSlice';
import { clearCart } from '../features/cartSlice';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import "./NavBar.scss";

function NavBar() {
  const user = useSelector(state => state.user.currentUser) || null;
  let cartCnt = useSelector(state => state.cart.totalCnt) || 0;

  const dispatch = useDispatch();
  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: 1,
      top: 5,
      backgroundColor: "black",
      padding: '0 4px',
    },
  }));

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className='navbar'>
      <AppBar position="fixed" sx={{ backgroundColor: '#1976d2', boxShadow: 3 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#fff' }}>
            <img src="images/logo2.png" alt="" height={30} />
          </Typography>

          {!user ? <h3>{getGreeting()}, guest</h3> : <h3>{getGreeting()}, {user.userName}</h3>}

          <Box sx={{ display: 'flex', gap: 2 }}>
            {user == null && (
              <IconButton aria-label="login" component={Link} to="/login">
                <PersonOutlineOutlinedIcon sx={{ fontSize: 30 }} />
              </IconButton>
            )}

            {user != null && (
              <IconButton
                aria-label="login"
                onClick={() => {
                  dispatch(userOut());
                  dispatch(clearCart());
                }}
              >
                <PersonOffIcon sx={{ fontSize: 30 }} />
              </IconButton>
            )}

            {user?.role !== "ADMIN" && (
              <IconButton aria-label="cart" component={Link} to="cart">
                <StyledBadge badgeContent={cartCnt} color="secondary">
                  <LocalMallOutlinedIcon sx={{ fontSize: 30 }} />
                </StyledBadge>
              </IconButton>
            )}

            <Button
              component={Link}
              to="/list"
              sx={{
                color: '#fff',
                '&:hover': { color: '#1976d2', backgroundColor: 'rgba(255, 255, 255, 0.1)' },
              }}
            >
              products
            </Button>

            {user?.role === "ADMIN" && (
              <Button
                component={Link}
                to="/AddProduct"
                sx={{
                  color: '#fff',
                  '&:hover': { color: '#1976d2', backgroundColor: 'rgba(255, 255, 255, 0.1)' },
                }}
              >
                add product
              </Button>
            )}

            {(user == null || user.role == "ADMIN") && (
              <Button
                component={Link}
                to="/signUp"
                sx={{
                  color: '#fff',
                  '&:hover': { color: '#1976d2', backgroundColor: 'rgba(255, 255, 255, 0.1)' },
                }}
              >
                sign up
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;






// import React from 'react'
// import { Link } from 'react-router-dom'

// function NavBar() {
//   return (<nav>
//     <ul>
//         <li><Link to="/list">לרשימה</Link></li>
//         <li><Link to="/signUp">להרשמה</Link></li>
//         <li><Link to="/cart">סל קניות</Link></li>
//         <li><Link to="/login">להתחברות</Link></li>
//     </ul>
//   </nav>

//   )
// }

// export default NavBar
