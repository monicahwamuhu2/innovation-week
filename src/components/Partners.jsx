import React, { useMemo } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Paper, 
  Avatar, 
  IconButton,
  Link
} from '@mui/material';
import { motion } from 'framer-motion';
import { PARTNERS } from '../utils/constants';
import SectionTitle from './commons/SectionTitle';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

// Animation variants - defined once outside component
const paperAnimation = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true }
};

const contactAnimation = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay: 0.5 },
  viewport: { once: true }
};

const Partners = () => {
  // Memoize the grid item animation to prevent recreation on each render
  const getPartnerAnimation = useMemo(() => (index) => ({
    initial: { opacity: 0, scale: 0.8 },
    whileInView: { opacity: 1, scale: 1 },
    transition: { 
      duration: 0.5, 
      delay: Math.min(index * 0.1, 1), // Cap the maximum delay at 1 second
      type: "spring",
      stiffness: 100
    },
    viewport: { once: true },
    whileHover: { 
      scale: 1.1,
      transition: { duration: 0.2 }
    }
  }), []);

  return (
    <Box 
      id="partners" 
      component="section"
      aria-labelledby="partners-title"
      sx={{ 
        py: 10,
        background: 'linear-gradient(180deg, #112240 0%, #0a192f 100%)',
      }}
    >
      <Container maxWidth="lg">
        <SectionTitle 
          title="Our Partners" 
          subtitle="Collaborators & Sponsors"
          description="Innovation Week 2025 is made possible through the support of our dedicated partners and sponsors."
        />

        <motion.div
          {...paperAnimation}
        >
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, sm: 3, md: 4 },
              borderRadius: 4,
              bgcolor: 'rgba(17, 34, 64, 0.8)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
            }}
          >
            <Grid 
              container 
              spacing={{ xs: 2, sm: 3, md: 4 }}
              justifyContent="center"
              alignItems="center"
            >
              {PARTNERS.map((partner, index) => (
                <Grid item xs={6} sm={4} md={2.4} key={index}>
                  <motion.div
                    {...getPartnerAnimation(index)}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        p: 2,
                      }}
                    >
                      <Avatar
                        src={partner.logo}
                        alt={`${partner.name} logo`}
                        variant="square"
                        imgProps={{ loading: 'lazy' }}
                        sx={{
                          width: { xs: 60, sm: 70, md: 80 },
                          height: { xs: 60, sm: 70, md: 80 },
                          mb: 2,
                          p: 2,
                          bgcolor: 'rgba(255, 255, 255, 0.15)',
                          borderRadius: 2,
                          border: '1px solid rgba(255, 255, 255, 0.3)',
                          boxShadow: '0 0 10px rgba(255, 255, 255, 0.1)',
                          filter: 'brightness(1.2) contrast(1.1)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            filter: 'brightness(1.3) contrast(1.2)',
                            transform: 'scale(1.05)',
                            boxShadow: '0 0 15px rgba(255, 255, 255, 0.2)',
                          },
                        }}
                      />
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          fontWeight: 500,
                          color: 'text.secondary',
                          mb: 1,
                          fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.875rem' }
                        }}
                      >
                        {partner.name}
                      </Typography>
                      {partner.linkedin && (
                        <IconButton 
                          href={partner.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          aria-label={`Visit ${partner.name} LinkedIn page`}
                          size="small"
                          sx={{ 
                            color: '#0A66C2',
                            '&:hover': {
                              backgroundColor: 'rgba(10, 102, 194, 0.1)'
                            }
                          }}
                        >
                          <LinkedInIcon fontSize="small" />
                        </IconButton>
                      )}
                    </Box>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </motion.div>
        
        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <motion.div
            {...contactAnimation}
          >
            <Typography 
              variant="h6" 
              id="partners-title"
              gutterBottom
              sx={{ 
                fontWeight: 600,
                mb: 2,
                color: 'primary.main'
              }}
            >
              Interested in Becoming a Partner?
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                maxWidth: '700px',
                mx: 'auto',
                mb: 3,
                color: 'text.secondary',
              }}
            >
              Join us in fostering innovation and supporting the next generation of tech leaders.
              Contact our partnership team to learn about sponsorship opportunities.
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', sm: 'row' }, 
              justifyContent: 'center',
              alignItems: 'center',
              gap: { xs: 1, sm: 2 },
              fontWeight: 600
            }}>
              <Link 
                href="mailto:partnerships@mmu.ac.ke" 
                underline="hover"
                sx={{ color: 'white' }}
              >
                partnerships@mmu.ac.ke
              </Link>
              <Box component="span" sx={{ display: { xs: 'none', sm: 'block' } }}>|</Box>
              <Link 
                href="tel:+254123456789" 
                underline="hover"
                sx={{ color: 'white' }}
              >
                +254 123 456 789
              </Link>
            </Box>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default React.memo(Partners);