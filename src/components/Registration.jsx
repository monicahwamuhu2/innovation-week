import React, { useCallback, memo } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Paper,
  Button,
  Link
} from '@mui/material';
import { motion } from 'framer-motion';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SectionTitle from './commons/SectionTitle';

// Define animation constants to avoid recreation on each render
const leftAnimationProps = {
  initial: { opacity: 0, x: -30 },
  whileInView: { opacity: 1, x: 0 },
  transition: { duration: 0.6 },
  viewport: { once: true }
};

const rightAnimationProps = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay: 0.2 },
  viewport: { once: true }
};

const buttonAnimationProps = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 }
};

// Benefits data array
const benefits = [
  {
    title: "Networks & Connections",
    description: "Connect with industry leaders, researchers, students, and innovators from across Kenya and beyond."
  },
  {
    title: "Learn & Discover",
    description: "Gain insights from expert speakers, hands-on workshops, and cutting-edge research presentations."
  },
  {
    title: "Showcase & Collaborate",
    description: "Present your ideas, get feedback, and find collaborators for your next innovation project."
  }
];

const Registration = () => {
  // Use callback to prevent recreation on each render
  const handleExternalRegistration = useCallback(() => {
    window.open('https://external-registration-link.com', '_blank', 'noopener,noreferrer');
  }, []);

  return (
    <Box 
      id="registration" 
      component="section"
      aria-labelledby="registration-title"
      sx={{ 
        py: 10,
        background: 'linear-gradient(180deg, #0a192f 0%, #112240 100%)',
      }}
    >
      <Container maxWidth="lg">
        <SectionTitle 
          title="Register for Innovation Week" 
          subtitle="Secure Your Spot"
          description="Join hundreds of innovators, researchers, and industry leaders for four days of inspiration and collaboration."
        />

        <Grid container spacing={6} justifyContent="center" alignItems="stretch">
          <Grid item xs={12} md={6}>
            <motion.div
              {...leftAnimationProps}
              style={{ height: '100%' }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: 4,
                  height: '100%',
                  bgcolor: 'rgba(17, 34, 64, 0.7)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography 
                  variant="h4" 
                  component="h3" 
                  id="why-attend-title"
                  gutterBottom
                  sx={{
                    mb: 3,
                    fontWeight: 700,
                    color: 'primary.main',
                  }}
                >
                  Why Attend?
                </Typography>

                {benefits.map((benefit, index) => (
                  <Box key={index} sx={{ mb: 4 }}>
                    <Typography 
                      variant="h6" 
                      gutterBottom
                      sx={{
                        fontWeight: 600,
                        mb: 2,
                      }}
                    >
                      {benefit.title}
                    </Typography>
                    <Typography variant="body2" paragraph sx={{ color: 'text.secondary' }}>
                      {benefit.description}
                    </Typography>
                  </Box>
                ))}

                <Box sx={{ mt: 'auto' }}>
                  <Typography 
                    variant="h6" 
                    gutterBottom
                    sx={{
                      fontWeight: 600,
                      mb: 2,
                    }}
                  >
                    Registration Details
                  </Typography>
                  <Typography 
                    component="ul" 
                    variant="body2" 
                    sx={{ 
                      color: 'text.secondary',
                      pl: 2,
                      listStyleType: 'disc'
                    }}
                  >
                    <li>Free for all Multimedia University students and faculty</li>
                    <li>All registrations include access to sessions, workshops, lunch, and refreshments</li>
                  </Typography>
                </Box>
              </Paper>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6}>
            <motion.div
              {...rightAnimationProps}
              style={{ height: '100%' }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 4, md: 6 },
                  borderRadius: 4,
                  height: '100%',
                  bgcolor: 'rgba(17, 34, 64, 0.7)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                }}
              >
                <Typography 
                  variant="h4" 
                  component="h3" 
                  id="registration-title"
                  gutterBottom
                  sx={{
                    mb: 4,
                    fontWeight: 700,
                    color: 'primary.main',
                  }}
                >
                  Ready to Join Innovation Week?
                </Typography>

                <Typography 
                  variant="body1" 
                  sx={{ 
                    mb: 6, 
                    maxWidth: '90%',
                    color: 'text.secondary'
                  }}
                >
                  Don't miss this opportunity to be part of Multimedia University's biggest innovation event of the year. Complete your registration through our secure external registration portal.
                </Typography>

                <Box sx={{ position: 'relative', mb: 2 }}>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      fontWeight: 600, 
                      mb: 2, 
                      color: '#64ffda',
                      textTransform: 'uppercase',
                      letterSpacing: 1
                    }}
                  >
                    Tell a friend to tell a friend
                  </Typography>
                </Box>

                <motion.div
                  {...buttonAnimationProps}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handleExternalRegistration}
                    endIcon={<ArrowForwardIcon />}
                    aria-label="Register for Innovation Week"
                    sx={{ 
                      px: 5,
                      py: 2,
                      fontWeight: 'bold',
                      fontSize: '1.1rem',
                      borderRadius: '30px',
                      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
                      transition: 'all 0.3s ease',
                      background: 'linear-gradient(90deg, #64ffda 0%, #0a192f 200%)',
                      '&:hover': {
                        boxShadow: '0 12px 28px rgba(0, 0, 0, 0.4)',
                      }
                    }}
                  >
                    Register Now
                  </Button>
                </motion.div>

                <Typography 
                  variant="body2" 
                  sx={{ 
                    mt: 4,
                    color: 'text.secondary',
                    fontStyle: 'italic'
                  }}
                >
                  For registration assistance, contact us at{' '}
                  <Link 
                    href="mailto:innovation@mmu.ac.ke"
                    sx={{ color: '#64ffda' }}
                    underline="hover"
                  >
                    innovation@mmu.ac.ke
                  </Link>
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default memo(Registration);