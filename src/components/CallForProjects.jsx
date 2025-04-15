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
  useMediaQuery,
  Alert,
  AlertTitle,
  Chip
} from '@mui/material';
import { motion } from 'framer-motion';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import ScienceIcon from '@mui/icons-material/Science';
import DescriptionIcon from '@mui/icons-material/Description';
import InfoIcon from '@mui/icons-material/Info';
import AlarmOffIcon from '@mui/icons-material/AlarmOff';
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
      closed: true
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

        <Box sx={{ mb: 4 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Alert 
              severity="info" 
              variant="filled"
              icon={<AlarmOffIcon fontSize="inherit" />}
              sx={{ 
                borderRadius: 2,
                bgcolor: 'rgba(255, 87, 34, 0.85)',
                backdropFilter: 'blur(10px)',
                '& .MuiAlert-icon': {
                  color: 'white',
                },
                boxShadow: '0 8px 16px rgba(255, 87, 34, 0.25)'
              }}
            >
              <AlertTitle sx={{ fontWeight: 700, fontSize: '1.1rem' }}>Registration Closed</AlertTitle>
              <Typography variant="body1">
                The registration for project and paper submissions is now closed. Thank you for your interest.
                We look forward to showcasing the selected projects during the Innovation Week!
              </Typography>
            </Alert>
          </motion.div>
        </Box>

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
                  position: 'relative',
                }}
              >
                {/* Overlay with transparency on the paper content */}
                <Box sx={{ 
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(17, 34, 64, 0.4)',
                  backdropFilter: 'blur(3px)',
                  borderRadius: 3,
                  zIndex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Chip 
                    icon={<InfoIcon />} 
                    label="REGISTRATION CLOSED" 
                    color="error"
                    sx={{ 
                      fontWeight: 700, 
                      fontSize: '1rem',
                      py: 3,
                      border: '2px solid',
                      boxShadow: '0 4px 12px rgba(244, 67, 54, 0.3)'
                    }}
                  />
                </Box>

                <Box sx={{ position: 'relative', zIndex: 0 }}>
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
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                                <Typography 
                                  variant={isMobile ? "subtitle1" : "h6"}
                                  sx={{ 
                                    fontWeight: 600,
                                    mb: 0.25,
                                  }}
                                >
                                  {item.title}
                                </Typography>
                                {item.closed && (
                                  <Chip 
                                    size="small" 
                                    label="Closed" 
                                    color="error"
                                    sx={{ height: 20 }}
                                  />
                                )}
                              </Box>
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
                      disabled={true}
                      aria-label="Submit your project - registration closed"
                      sx={{ 
                        px: { xs: 3, md: 4 },
                        py: { xs: 1, md: 1.5 },
                        fontWeight: 'bold',
                        opacity: 0.6,
                        '&.Mui-disabled': {
                          bgcolor: 'rgba(255, 215, 0, 0.3)'
                        }
                      }}
                    >
                      Registration Closed
                    </Button>
                  </Box>
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
                  mt: { xs: 3, md: 0 },
                  filter: 'grayscale(30%)'
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