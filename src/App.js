import React, { useState, useEffect } from 'react';
import { Box, CssBaseline } from '@mui/material';
import Header from './components/Header';
import Hero from './components/Hero';
import Agenda from './components/Agenda';
import CallForProjects from './components/CallForProjects';
import Partners from './components/Partners';
import Countdown from './components/Countdown';
import Registration from './components/Registration';
import Speakers from './components/Speakers';
import Team from './components/Team';
import Footer from './components/Footer';
import ScrollToTop from './components/commons/ScrollToTop';
import { Particles } from '@tsparticles/react';
import { loadFull } from 'tsparticles';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const particlesInit = React.useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          background: 'linear-gradient(135deg, #0a192f 0%, #112240 100%)',
          color: 'white',
        }}
      >
        <Box
          component="img"
          src="/images/poster.jpg"
          alt="MMU Innovation Week"
          sx={{
            width: 150,
            animation: 'pulse 2s infinite',
          }}
        />
      </Box>
    );
  }

  return (
    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
      <CssBaseline />
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: 'transparent',
            },
          },
          fpsLimit: 60,
          particles: {
            color: {
              value: '#ffffff',
            },
            links: {
              color: '#ffffff',
              distance: 150,
              enable: true,
              opacity: 0.1,
              width: 1,
            },
            move: {
              direction: 'none',
              enable: true,
              outMode: 'bounce',
              random: false,
              speed: 0.5,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                value_area: 800,
              },
              value: 50,
            },
            opacity: {
              value: 0.2,
            },
            size: {
              random: true,
              value: 3,
            },
          },
          detectRetina: true,
        }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
        }}
      />
      <Header />
      <Hero />
      <Countdown />
      <Agenda />
      <CallForProjects />
      <Speakers />
      <Registration />
      <Partners />
      <Team />
      <Footer />
      <ScrollToTop />
    </Box>
  );
}

export default App;