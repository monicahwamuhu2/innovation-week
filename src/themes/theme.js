import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FFD700', // Gold
      light: '#FFEB3B',
      dark: '#FFA000',
    },
    secondary: {
      main: '#1E88E5', // Blue
      light: '#64B5F6',
      dark: '#0D47A1',
    },
    background: {
      default: '#0a192f',
      paper: '#112240',
    },
    text: {
      primary: '#E6F1FF',
      secondary: '#A8B2D1',
    },
  },
  typography: {
    fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 800,
      fontSize: '3.5rem',
      '@media (max-width:600px)': {
        fontSize: '2.5rem',
      },
    },
    h2: {
      fontWeight: 700,
      fontSize: '2.5rem',
      '@media (max-width:600px)': {
        fontSize: '2rem',
      },
    },
    h3: {
      fontWeight: 600,
      fontSize: '2rem',
      '@media (max-width:600px)': {
        fontSize: '1.5rem',
      },
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.25rem',
    },
    h6: {
      fontWeight: 500,
      fontSize: '1rem',
    },
    button: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 20px',
          textTransform: 'none',
          fontWeight: 600,
          transition: 'all 0.3s ease',
        },
        containedPrimary: {
          backgroundImage: 'linear-gradient(90deg, #FFD700, #FFA500)',
          color: '#0a192f',
          '&:hover': {
            backgroundImage: 'linear-gradient(90deg, #FFA500, #FFD700)',
          },
        },
        outlinedPrimary: {
          borderColor: '#FFD700',
          color: '#FFD700',
          '&:hover': {
            backgroundColor: 'rgba(255, 215, 0, 0.08)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backdropFilter: 'blur(5px)',
          backgroundColor: 'rgba(17, 34, 64, 0.8)',
          boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0px 15px 35px rgba(0, 0, 0, 0.3)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(10, 25, 47, 0.8)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingTop: '80px',
          paddingBottom: '80px',
        },
      },
    },
  },
});

export default theme;