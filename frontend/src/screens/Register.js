import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Card, CardContent } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        username,
        password,
      });
      if (response.data.message) {
        navigate('/login'); // Redirect to login after successful registration
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <Card sx={{ maxWidth: 400, margin: "auto", mt: 15, p: 2, boxShadow: 3 }}>
        <CardContent>
            <Typography variant="h5" textAlign="center">Register</Typography>
            {error && <Typography color="error">{error}</Typography>}
            <TextField fullWidth label="Email" variant="outlined" margin="normal" onChange={(e) => setUsername(e.target.value)} />
            <TextField fullWidth label="Password" type="password" variant="outlined" margin="normal" onChange={(e) => setPassword(e.target.value)} />
            <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleSubmit}>
                Login
            </Button>
            <Typography style={{textAlign: 'center', marginTop: 18, fontSize: 16}}>
                Already have an account? <Button onClick={() => navigate('/login')}>Login now</Button>
            </Typography>
        </CardContent>
    </Card>
  );
};

export default Register;