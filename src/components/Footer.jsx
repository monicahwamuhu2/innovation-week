import React from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Link,
  Divider,
  Stack
} from '@mui/material';
import { motion } from 'framer-motion';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import { Link as ScrollLink } from 'react-scroll';

const Footer = () => {
  const footerLinks = [
    {
      title: 'Quick Links',
      links: [
        { name: 'Home', to: 'hero' },
        { name: 'Agenda', to: 'agenda' },
        { name: 'Speakers', to: 'speakers' },
        { name: 'Registration', to: 'registration' },
        { name: 'Call for Projects', to: 'call-for-projects' },
      ],
    },
    {
      title: 'Contact Us',
      links: [
        { 
          name: 'Multimedia University of Kenya, Magadi Road', 
          icon: <LocationOnIcon fontSize="small" /> 
        },
        { 
          name: '+254 123 456 789', 
          href: 'tel:+254123456789',
          icon: <PhoneIcon fontSize="small" /> 
        },
        { 
          name: 'innovationweek@mmu.ac.ke', 
          href: 'mailto:innovationweek@mmu.ac.ke',
          icon: <EmailIcon fontSize="small" /> 
        },
      ],
    },
  ];



  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: 'background.paper',
        pt: 5,
        pb: 2,
        background: 'linear-gradient(180deg, #112240 0%, #0a192f 100%)',
        position: 'relative',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Box sx={{ mb: 2 }}>
                <Box
                  component="img"
                  src="/images/poster.jpg"
                  alt="MMU Innovation week"
                  sx={{ 
                    height: 60,
                    mb: 1,
                  }}
                />
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 700,
                    mb: 1,
                  }}
                >
                  Innovation Week 2025
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    mb: 2,
                    color: 'text.secondary',
                    maxWidth: 350,
                  }}
                >
                  Join us for an inspiring week dedicated to groundbreaking advancements,
                  transformative ideas, and the power of innovation to drive real change.
                </Typography>

              </Box>
            </motion.div>
          </Grid>

          {footerLinks.map((section, index) => (
            <Grid item xs={12} sm={6} md={index === 1 ? 4 : 4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Typography 
                  variant="h6" 
                  gutterBottom
                  sx={{ 
                    fontWeight: 600,
                    mb: 2,
                  }}
                >
                  {section.title}
                </Typography>
                <Stack spacing={2}>
                  {section.links.map((link, linkIndex) => (
                    <Box key={linkIndex} sx={{ display: 'flex', alignItems: 'center' }}>
                      {link.icon && (
                        <Box sx={{ mr: 1, color: 'primary.main' }}>
                          {link.icon}
                        </Box>
                      )}
                      {link.to ? (
                        <ScrollLink
                          to={link.to}
                          spy={true}
                          smooth={true}
                          offset={-70}
                          duration={500}
                          style={{ cursor: 'pointer' }}
                        >
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              color: 'text.secondary',
                              transition: 'color 0.3s ease',
                              '&:hover': {
                                color: 'primary.main',
                              },
                            }}
                          >
                            {link.name}
                          </Typography>
                        </ScrollLink>
                      ) : (
                        <Link 
                          href={link.href || '#'} 
                          color="inherit"
                          underline="none"
                          target={link.href ? "_blank" : ""}
                          rel={link.href ? "noopener noreferrer" : ""}
                          sx={{ 
                            color: 'text.secondary',
                            transition: 'color 0.3s ease',
                            '&:hover': {
                              color: 'primary.main',
                            },
                          }}
                        >
                          <Typography variant="body2">
                            {link.name}
                          </Typography>
                        </Link>
                      )}
                    </Box>
                  ))}
                </Stack>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography 
            variant="body2" 
            color="text.secondary"
          >
            © {new Date().getFullYear()} Multimedia University of Kenya. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mt: { xs: 2, sm: 0 } }}>
            <Link 
              href="https://www.mmu.ac.ke/privacy" 
              color="inherit"
              underline="none"
              sx={{ 
                color: 'text.secondary',
                fontSize: '0.875rem',
                transition: 'color 0.3s ease',
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            >
              Privacy Policy
            </Link>
            <Link 
              href="https://www.mmu.ac.ke/terms" 
              color="inherit"
              underline="none"
              sx={{ 
                color: 'text.secondary',
                fontSize: '0.875rem',
                transition: 'color 0.3s ease',
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            >
              Terms of Service
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;