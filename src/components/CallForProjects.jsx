import React, { useMemo } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Paper, 
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useMediaQuery
} from '@mui/material';
import { motion } from 'framer-motion';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import ScienceIcon from '@mui/icons-material/Science';
import DescriptionIcon from '@mui/icons-material/Description';
import SectionTitle from './commons/SectionTitle';
import { useTheme } from '@mui/material/styles';

const CallForProjects = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Using useMemo to prevent recreating these arrays on each render
  const projectSubmissionInfo = useMemo(() => [
    {
      icon: <ScienceIcon />,
      title: 'Innovative Projects',
      description: 'Showcase your groundbreaking technology innovations, prototypes, and solutions.',
    },
    {
      icon: <DescriptionIcon />,
      title: 'Research Papers',
      description: 'Present your research findings, methodologies, and discoveries in technology and innovation.',
    },
    {
      icon: <EventAvailableIcon />,
      title: 'Submission Deadline',
      description: 'All projects and papers must be submitted by April 11th, 2025.',
    }
  ], []);

  const eligibilityPoints = useMemo(() => [
    'Open to all undergraduate and postgraduate students',
    'Faculty members and researchers from Multimedia University',
    'Industry professionals with innovative solutions',
    'Startups with disruptive technologies',
    'Projects must align with the theme "Empowering Change Through Technology and Innovation"'
  ], []);

  // Animation variants - defined once, not on each render
  const leftAnimation = {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6 }
  };

  const rightAnimation = {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, delay: 0.2 }
  };
  
  return (
    <Box 
      id="call-for-projects" 
      component="section"
      aria-labelledby="call-for-projects-title"
      sx={{ 
        py: { xs: 6, md: 8 },
        background: 'linear-gradient(180deg, #0a192f 0%, #112240 100%)',
      }}
    >
      <Container maxWidth="lg">
        <SectionTitle 
          title="Call for Projects & Papers" 
          subtitle="Showcase Your Innovation"
          description="Have an innovative project or groundbreaking research? This is your chance to showcase your ideas at Multimedia University of Kenya Innovation Week 2025!"
        />

        <Grid container spacing={isMobile ? 2 : 4} alignItems="center">
          <Grid item xs={12} md={6}>
            <motion.div
              initial={leftAnimation.initial}
              whileInView={leftAnimation.animate}
              transition={leftAnimation.transition}
              viewport={{ once: true }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2.5, sm: 3, md: 4 },
                  borderRadius: 3,
                  height: '100%',
                  backgroundColor: 'rgba(17, 34, 64, 0.7)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                }}
              >
                <Typography 
                  variant={isMobile ? "h5" : "h4"} 
                  component="h3" 
                  id="call-for-projects-title"
                  sx={{
                    mb: 2,
                    fontWeight: 700,
                    color: 'primary.main',
                  }}
                >
                  Submit Your Work
                </Typography>

                <List sx={{ mb: 2 }}>
                  {projectSubmissionInfo.map((item, index) => (
                    <React.Fragment key={index}>
                      <ListItem 
                        alignItems="flex-start"
                        disableGutters
                        sx={{ 
                          mb: 1.5,
                        }}
                      >
                        <ListItemIcon sx={{ color: 'primary.main', minWidth: 36 }}>
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography 
                              variant={isMobile ? "subtitle1" : "h6"}
                              sx={{ 
                                fontWeight: 600,
                                mb: 0.25,
                              }}
                            >
                              {item.title}
                            </Typography>
                          }
                          secondary={
                            <Typography variant="body2" color="text.secondary">
                              {item.description}
                            </Typography>
                          }
                        />
                      </ListItem>
                      {index < projectSubmissionInfo.length - 1 && (
                        <Divider 
                          variant="inset" 
                          component="li" 
                          sx={{ borderColor: 'rgba(255, 255, 255, 0.08)', mb: 1.5 }} 
                        />
                      )}
                    </React.Fragment>
                  ))}
                </List>

                <Typography 
                  variant={isMobile ? "subtitle1" : "h6"}
                  component="h4"
                  sx={{
                    mb: 1.5,
                    fontWeight: 600,
                  }}
                >
                  Eligibility Criteria
                </Typography>

                <List dense={isMobile}>
                  {eligibilityPoints.map((point, index) => (
                    <ListItem 
                      key={index}
                      disableGutters
                      sx={{ 
                        mb: 0.75,
                      }}
                    >
                      <ListItemIcon sx={{ color: 'primary.main', minWidth: 28 }}>
                        <CheckCircleOutlineIcon fontSize={isMobile ? "small" : "medium"} />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant="body2">
                            {point}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>

                <Box sx={{ mt: 3, display: 'flex', justifyContent: isMobile ? 'center' : 'flex-start' }}>
                  <Button 
                    variant="contained" 
                    color="primary"
                    size={isMobile ? "medium" : "large"}
                    href="http://bit.ly/mmu_innovationweek_cfp_2025"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Submit your project"
                    sx={{ 
                      px: { xs: 3, md: 4 },
                      py: { xs: 1, md: 1.5 },
                      fontWeight: 'bold',
                    }}
                  >
                    Submit Your Project Now
                  </Button>
                </Box>
              </Paper>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
            <motion.div
              initial={rightAnimation.initial}
              whileInView={rightAnimation.animate}
              transition={rightAnimation.transition}
              viewport={{ once: true }}
            >
              <Box
                component="img"
                src="/images/cfp.jpg"
                alt="Innovation project presentation"
                loading="lazy"
                width="100%"
                height="auto"
                sx={{
                  width: { xs: '85%', sm: '70%', md: '60%' },
                  maxHeight: { xs: '300px', md: 'auto' },
                  objectFit: 'cover',
                  borderRadius: 3,
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                  mt: { xs: 3, md: 0 }
                }}
              />
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default React.memo(CallForProjects);