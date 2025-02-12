import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4'; // Moon icon for dark mode
import Brightness7Icon from '@mui/icons-material/Brightness7'; 
import Login from './screens/Login';
import Register from './screens/Register';
import Dashboard from './screens/Dashboard';


const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Define light and dark themes
  const lightTheme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#1976d2',
      },
      background: {
        default: '#ffffff',
        paper: '#f5f5f5',
        filter:  '#fff'
      },
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#90caf9',
      },
      background: {
        default: '#121212',
        paper: '#1e1e1e',
        filter:  '#121212'
      },
    },
  });

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Router>
        {/* Dark mode toggle button */}
        <IconButton
          onClick={() => setDarkMode(!darkMode)}
          color="inherit"
          sx={{ position: 'absolute', top: 16, right: 16, zIndex: 9999 }} // Position the button
        >
          {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Login />} /> {/* Default route */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;