import React, { useMemo } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  IconButton
} from '@mui/material';
import { motion } from 'framer-motion';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { TEAM_MEMBERS } from '../utils/constants';
import SectionTitle from './commons/SectionTitle';

const Team = () => {
  // Memoize the animation configuration to prevent recreation on each render
  const getTeamMemberAnimation = useMemo(() => (index) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { 
      duration: 0.5, 
      delay: Math.min(index * 0.1, 0.8) // Cap delay at 0.8s to prevent excessive delays
    },
    viewport: { once: true },
    whileHover: { y: -10 }
  }), []);

  return (
    <Box 
      id="team" 
      component="section"
      aria-labelledby="team-title"
      sx={{ 
        py: { xs: 8, md: 10 },
        background: 'linear-gradient(180deg, #0a192f 0%, #112240 100%)',
      }}
    >
      <Container maxWidth="lg">
        <SectionTitle 
          title="Meet Our Team" 
          subtitle="The Organizers"
          description="Meet the dedicated team behind Innovation Week 2025, working tirelessly to make this event a success."
        />
        
        <Grid container spacing={{ xs: 3, md: 4 }} alignItems="stretch">
          {TEAM_MEMBERS.map((member, index) => (
            <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex' }}>
              <motion.div
                {...getTeamMemberAnimation(index)}
                style={{ width: '100%' }}
              >
                <Card
                  elevation={0}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 4,
                    overflow: 'hidden',
                    position: 'relative',
                    bgcolor: 'rgba(17, 34, 64, 0.7)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                    },
                  }}
                >
                  <Box 
                    sx={{
                      height: { xs: 250, sm: 280, md: 300 },
                      position: 'relative',
                      overflow: 'hidden',
                      backgroundImage: `linear-gradient(rgba(10, 25, 47, 0.1), rgba(10, 25, 47, 0.3))`,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={member.image}
                      alt={`${member.name}, ${member.role}`}
                      loading="lazy"
                      height="100%"
                      width="100%"
                      sx={{
                        height: '100%',
                        width: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        transition: 'transform 0.5s ease',
                        '&:hover': {
                          transform: 'scale(1.05)',
                        },
                      }}
                    />
                  </Box>
                  <CardContent 
                    sx={{ 
                      flexGrow: 1, 
                      textAlign: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      p: { xs: 2, md: 3 },
                      minHeight: { xs: 130, md: 150 },
                    }}
                  >
                    <Box>
                      <Typography 
                        variant="h5" 
                        component="h3"
                        gutterBottom
                        sx={{ 
                          fontWeight: 700,
                          mb: 0.5,
                          fontSize: { xs: '1.2rem', md: '1.5rem' }
                        }}
                      >
                        {member.name}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        color="primary.main"
                        sx={{ 
                          fontWeight: 600,
                          mb: 2,
                        }}
                      >
                        {member.role}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      <IconButton 
                        size="small" 
                        aria-label={`View ${member.name}'s LinkedIn profile`}
                        sx={{ 
                          color: '#0077B5',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            backgroundColor: 'rgba(0, 119, 181, 0.1)',
                            transform: 'translateY(-3px)',
                          },
                        }}
                        href={member.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <LinkedInIcon />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default React.memo(Team);