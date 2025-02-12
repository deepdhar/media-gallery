import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Card, CardContent } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../redux/features/authSlice';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://my-media-app-backend.herokuapp.com/api/auth/login', {
        username,
        password,
      });
      const { token, user } = response.data;
  
      localStorage.setItem('token', token);  // Store token ✅
      dispatch(setCredentials({ user, token })); // Save in Redux
      navigate('/dashboard'); // Redirect
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };
  

  return (
    // <Container maxWidth="sm">
    //   <Box sx={{ mt: 8, textAlign: 'center' }}>
    //     <Typography variant="h4" gutterBottom>
    //       Login
    //     </Typography>
    //     {error && <Typography color="error">{error}</Typography>}
    //     <form onSubmit={handleSubmit}>
    //       <TextField
    //         fullWidth
    //         label="Username"
    //         variant="outlined"
    //         margin="normal"
    //         value={username}
    //         onChange={(e) => setUsername(e.target.value)}
    //         required
    //       />
    //       <TextField
    //         fullWidth
    //         label="Password"
    //         type="password"
    //         variant="outlined"
    //         margin="normal"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //         required
    //       />
    //       <Button
    //         type="submit"
    //         variant="contained"
    //         color="primary"
    //         fullWidth
    //         sx={{ mt: 3, mb: 2 }}
    //       >
    //         Login
    //       </Button>
    //     </form>
    //     <Typography>
    //       Don't have an account? <Button onClick={() => navigate('/register')}>Register here</Button>
    //     </Typography>
    //   </Box>
    // </Container>

    <Card sx={{ maxWidth: 400, margin: "auto", mt: 15, p: 2, boxShadow: 3 }}>
        <CardContent>
            <Typography variant="h5" textAlign="center">Login</Typography>
            {error && <Typography color="error">{error}</Typography>}
            <TextField fullWidth label="Email" variant="outlined" margin="normal" onChange={(e) => setUsername(e.target.value)} />
            <TextField fullWidth label="Password" type="password" variant="outlined" margin="normal" onChange={(e) => setPassword(e.target.value)} />
            <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleSubmit}>
                Login
            </Button>
            <Typography style={{textAlign: 'center', marginTop: 18, fontSize: 16}}>
                Don't have an account? <Button onClick={() => navigate('/register')}>Register here</Button>
            </Typography>
        </CardContent>
    </Card>
  );
};

export default Login;