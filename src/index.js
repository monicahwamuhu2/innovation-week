import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import App from './App';
import { ThemeProvider } from '@mui/material/styles';
import theme from './themes/theme';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Initialize AOS animation library
AOS.init({
  duration: 1000,
  once: false,
  mirror: true,
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);