import React, { useEffect } from 'react';
import { Box, Typography, Container, Button, Grid, Paper} from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';
// Removed unused 'Link' import

// Simple Background Effects Component using CSS animations instead of Framer Motion
const BackgroundEffects = () => (
  <>
    <Box
      sx={{
        position: 'absolute',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,215,0,0.1) 0%, rgba(255,165,0,0) 70%)',
        top: '10%',
        right: '5%',
        animation: 'pulse 8s infinite ease-in-out'
      }}
    />
    
    <Box
      sx={{
        position: 'absolute',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(30,136,229,0.1) 0%, rgba(30,136,229,0) 70%)',
        bottom: '5%',
        left: '10%',
        animation: 'pulse2 10s infinite ease-in-out'
      }}
    />
    
    {/* Only 4 decorative particles instead of 8 */}
    {[...Array(4)].map((_, i) => (
      <Box
        key={i}
        sx={{
          position: 'absolute',
          width: 5 + Math.random() * 10,
          height: 5 + Math.random() * 10,
          borderRadius: '50%',
          background: i % 2 === 0 ? 'rgba(255,215,0,0.3)' : 'rgba(30,136,229,0.3)',
          filter: 'blur(1px)',
          top: `${Math.random() * 80 + 10}%`,
          left: `${Math.random() * 80 + 10}%`,
          animation: `float${i} ${3 + Math.random() * 5}s infinite alternate ease-in-out`
        }}
      />
    ))}
    
    <style jsx>{`
      @keyframes pulse {
        0% { transform: scale(1); opacity: 0.1; }
        50% { transform: scale(1.2); opacity: 0.2; }
        100% { transform: scale(1); opacity: 0.1; }
      }
      @keyframes pulse2 {
        0% { transform: scale(1); opacity: 0.1; }
        50% { transform: scale(1.3); opacity: 0.2; }
        100% { transform: scale(1); opacity: 0.1; }
      }
      @keyframes float0 {
        0% { transform: translate(0, 0); opacity: 0.3; }
        100% { transform: translate(20px, 20px); opacity: 0.7; }
      }
      @keyframes float1 {
        0% { transform: translate(0, 0); opacity: 0.3; }
        100% { transform: translate(-15px, 25px); opacity: 0.7; }
      }
      @keyframes float2 {
        0% { transform: translate(0, 0); opacity: 0.3; }
        100% { transform: translate(25px, -15px); opacity: 0.7; }
      }
      @keyframes float3 {
        0% { transform: translate(0, 0); opacity: 0.3; }
        100% { transform: translate(-20px, -20px); opacity: 0.7; }
      }
    `}</style>
  </>
);

const Hero = () => {
  const controls = useAnimation();
  
  useEffect(() => {
    controls.start('visible');
  }, [controls]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.7, 
        delay: custom * 0.1,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    })
  };

  const handleRegisterClick = () => {
    window.open('https://forms.gle/tevnykMUzSEidqQB8', '_blank');
  };

  return (
    <Box
      id="hero"
      sx={{
        backgroundImage: 'linear-gradient(rgba(10, 25, 47, 0.8), rgba(10, 25, 47, 0.9)), url(/images/hero-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '95vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        pt: '80px',
      }}
    >
      {/* Optimized background effects */}
      <BackgroundEffects />
      
      <Container maxWidth="lg" sx={{ py: 4, mt: { xs: 4, md: 2 } }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={7}>
            <Box sx={{ py: 3 }}>
              <motion.div
                custom={1}
                initial="hidden"
                animate={controls}
                variants={fadeInUp}
              >
                {/* Date information */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <EventIcon sx={{ color: 'primary.main', mr: 1, fontSize: '1.2rem' }} />
                  <Typography 
                    variant="h6" 
                    component="div"
                    sx={{ 
                      color: 'primary.main',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: 2,
                    }}
                  >
                    April 14-17, 2025
                  </Typography>
                </Box>
                
                {/* Enhanced Venue Information */}
                <Paper
                  elevation={0}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    py: 1.5,
                    px: 2,
                    mb: 3,
                    borderRadius: 2,
                    backgroundColor: 'rgba(255, 215, 0, 0.15)',
                    border: '2px solid',
                    borderColor: 'primary.main',
                    boxShadow: '0 0 15px rgba(255, 215, 0, 0.2)',
                    animation: 'pulse-venue 3s infinite ease-in-out',
                    '@keyframes pulse-venue': {
                      '0%': { boxShadow: '0 0 15px rgba(255, 215, 0, 0.2)' },
                      '50%': { boxShadow: '0 0 20px rgba(255, 215, 0, 0.4)' },
                      '100%': { boxShadow: '0 0 15px rgba(255, 215, 0, 0.2)' }
                    }
                  }}
                >
                  <LocationOnIcon sx={{ color: 'primary.main', mr: 1.5, fontSize: '1.8rem' }} />
                  <Box>
                    <Typography variant="subtitle2" sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.7rem', mb: 0.3 }}>
                      EVENT VENUE
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 1 }}>
                      Multimedia University of Kenya, Pavillion B
                    </Typography>
                  </Box>
                </Paper>
              </motion.div>
              
              <motion.div
                custom={2}
                initial="hidden"
                animate={controls}
                variants={fadeInUp}
              >
                <Typography 
                  variant="h1" 
                  component="h1"
                  sx={{ 
                    fontWeight: 800,
                    mb: 1.5,
                    backgroundImage: 'linear-gradient(90deg, #FFFFFF, #A8B2D1)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    textShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                    lineHeight: 1.1,
                  }}
                >
                  Multimedia University<br />
                  <Box 
                    sx={{ 
                      color: 'primary.main',
                      textShadow: '0px 4px 12px rgba(255, 215, 0, 0.3)',
                      display: 'inline-block',
                      animation: 'float 2s infinite alternate ease-in-out',
                      '@keyframes float': {
                        '0%': { transform: 'translateY(-5px)' },
                        '100%': { transform: 'translateY(5px)' }
                      }
                    }}
                  >
                    Innovation Week
                  </Box>
                </Typography>
              </motion.div>
              
              <motion.div
                custom={3}
                initial="hidden"
                animate={controls}
                variants={fadeInUp}
              >
                <Typography 
                  variant="h4" 
                  component="div"
                  sx={{ 
                    fontWeight: 600,
                    mb: 2,
                    color: 'text.secondary'
                  }}
                >
                  Empowering Change Through Technology and Innovation
                </Typography>
              </motion.div>
              
              <motion.div
                custom={4}
                initial="hidden"
                animate={controls}
                variants={fadeInUp}
              >
                <Typography 
                  variant="body1" 
                  paragraph
                  sx={{ 
                    fontSize: '1.1rem',
                    mb: 3,
                    maxWidth: '90%',
                    color: 'text.secondary'
                  }}
                >
                  Join us for an inspiring week dedicated to groundbreaking advancements,
                  transformative ideas, and the power of innovation to drive real change.
                  Connect with industry leaders, showcase your projects, and be part of
                  shaping the future of technology.
                </Typography>
              </motion.div>
              
              <motion.div
                custom={5}
                initial="hidden"
                animate={controls}
                variants={fadeInUp}
                style={{ display: 'flex', gap: '12px' }}
              >
                {/* Regular button with onClick handler */}
                <Button 
                  variant="contained" 
                  color="primary"
                  size="large"
                  onClick={handleRegisterClick}
                  sx={{ 
                    px: 3.5,
                    py: 1.2,
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                    borderRadius: '6px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: '0px 5px 15px rgba(255, 215, 0, 0.3)',
                    }
                  }}
                >
                  Register Now
                </Button>
                <Button 
                  component="a"
                  href="https://bit.ly/mmu_innovationweek_cfp_2025"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outlined" 
                  color="primary"
                  size="large"
                  sx={{ 
                    px: 3.5,
                    py: 1.2,
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: '0px 5px 15px rgba(30, 136, 229, 0.2)',
                    }
                  }}
                >
                  Submit Project
                </Button>
              </motion.div>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Box sx={{ 
              position: 'relative',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  transition: { 
                    duration: 0.8, 
                    delay: 0.6,
                    ease: [0.6, -0.05, 0.01, 0.99]
                  }
                }}
                style={{
                  position: 'relative',
                  zIndex: 2
                }}
              >
                {/* Optimized image animation using CSS instead of Framer Motion */}
                <Box
                  component="img"
                  src="/images/hero.jpg"
                  alt="Innovation Illustration"
                  sx={{
                    width: '100%',
                    maxWidth: '450px',
                    filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3))',
                    borderRadius: '12px',
                    display: 'block',
                    mx: 'auto',
                    animation: 'heroFloat 4s ease-in-out infinite alternate',
                    '@keyframes heroFloat': {
                      '0%': { transform: 'translateY(-8px) rotate(-1deg)' },
                      '100%': { transform: 'translateY(8px) rotate(1deg)' }
                    }
                  }}
                />
                
                {/* Optimized glow effect */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '380px',
                    height: '380px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(255,215,0,0.15) 0%, rgba(10,25,47,0) 70%)',
                    transform: 'translate(-50%, -50%)',
                    zIndex: -1,
                    animation: 'glow 5s ease-in-out infinite',
                    '@keyframes glow': {
                      '0%': { opacity: 0.4, transform: 'translate(-50%, -50%) scale(0.95)' },
                      '50%': { opacity: 0.7, transform: 'translate(-50%, -50%) scale(1.05)' },
                      '100%': { opacity: 0.4, transform: 'translate(-50%, -50%) scale(0.95)' }
                    }
                  }}
                />
              </motion.div>
              
              {/* Simplified decorative elements */}
              <Box
                sx={{
                  position: 'absolute',
                  top: '15%',
                  right: '5%',
                  width: '150px',
                  height: '150px',
                  borderRadius: '50%',
                  border: '2px dashed rgba(255,215,0,0.15)',
                  zIndex: 1,
                  animation: 'rotate 40s linear infinite',
                  '@keyframes rotate': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' }
                  }
                }}
              />
              
              {/* Simplified grid lines */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                  backgroundImage: 'linear-gradient(to right, rgba(30,136,229,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(30,136,229,0.1) 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                  zIndex: 0,
                  animation: 'fadeInOut 8s ease-in-out infinite',
                  '@keyframes fadeInOut': {
                    '0%': { opacity: 0.2 },
                    '50%': { opacity: 0.4 },
                    '100%': { opacity: 0.2 }
                  }
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Hero;