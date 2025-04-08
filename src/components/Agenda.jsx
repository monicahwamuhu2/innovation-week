import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Tabs, 
  Tab, 
  Paper, 
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  useMediaQuery,
  useTheme,
  alpha
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { AGENDA } from '../utils/constants';
import SectionTitle from './commons/SectionTitle';

const Agenda = () => {
  const [value, setValue] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  //const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  // Parallax effect for background
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getEventTypeColor = (type) => {
    const typeColors = {
      webinar: '#1976D2',
      registration: '#4CAF50',
      ceremony: '#9C27B0', 
      debate: '#FF5722',
      break: '#607D8B',
      track: '#F44336',
      visit: '#009688',
      panel: '#673AB7',
      presentation: '#2196F3',
      showcase: '#FFC107'
    };
    
    return typeColors[type] || '#757575';
  };

  const getEventTypeIcon = (type) => {
    return <Box 
      component={motion.div}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3 }}
      sx={{ 
        width: 10, 
        height: 10, 
        borderRadius: '50%', 
        backgroundColor: getEventTypeColor(type),
        mr: 1,
        boxShadow: `0 0 10px ${alpha(getEventTypeColor(type), 0.6)}`
      }} 
    />;
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <Box 
      id="agenda" 
      sx={{ 
        py: { xs: 6, md: 10 },
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(180deg, #112240 0%, #0a192f 100%)',
          zIndex: -2,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(36, 83, 166, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(66, 133, 244, 0.1) 0%, transparent 50%)',
          backgroundSize: '120% 120%',
          backgroundPosition: `${-scrollY * 0.02}px ${-scrollY * 0.01}px`,
          zIndex: -1,
        }
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        <SectionTitle 
          title="Event Agenda" 
          subtitle="Three Days of Innovation"
          description="Explore our packed schedule of workshops, panels, presentations, and networking opportunities."
        />

        <Box 
          sx={{ 
            mb: 3,
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Paper
            elevation={0}
            component={motion.div}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            sx={{
              borderRadius: 2,
              bgcolor: 'rgba(17, 34, 64, 0.75)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              width: { xs: '100%', md: 'auto' },
              overflow: 'hidden',
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              variant={isMobile ? "scrollable" : "fullWidth"}
              scrollButtons="auto"
              allowScrollButtonsMobile
              textColor="primary"
              indicatorColor="primary"
              aria-label="agenda days tabs"
              sx={{
                minHeight: 'unset',
                '& .MuiTab-root': {
                  fontWeight: 600,
                  py: 1.5,
                  minHeight: 'unset',
                  fontSize: { xs: '0.8rem', sm: '0.9rem' },
                  whiteSpace: 'nowrap',
                },
                '& .MuiTabs-indicator': {
                  height: 3,
                  borderRadius: '3px 3px 0 0'
                }
              }}
            >
              {AGENDA.map((day, index) => (
                <Tab 
                  key={index} 
                  label={isMobile ? `Day ${index + 1}` : `Day ${index + 1}: ${day.day.split('-')[1] || ''}`} 
                  icon={<EventIcon sx={{ fontSize: { xs: 16, md: 20 } }} />} 
                  iconPosition="start" 
                />
              ))}
            </Tabs>
          </Paper>
        </Box>

        <AnimatePresence mode="wait">
          <motion.div
            key={value}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, sm: 3, md: 4 },
                borderRadius: { xs: 3, md: 4 },
                bgcolor: 'rgba(17, 34, 64, 0.75)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.25)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <EventIcon sx={{ color: 'primary.main', mr: 1.5, fontSize: { xs: 20, md: 24 } }} />
                <Typography 
                  variant="h5" 
                  component="h3"
                  sx={{ 
                    fontWeight: 700,
                    color: 'primary.main',
                    fontSize: { xs: '1.2rem', md: '1.5rem' }
                  }}
                >
                  {AGENDA[value].day}
                </Typography>
              </Box>

              <List 
                component={motion.ul}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                sx={{ width: '100%', p: 0 }}
              >
                {AGENDA[value].events.map((event, index) => (
                  <React.Fragment key={index}>
                    <ListItem
                      component={motion.li}
                      variants={itemVariants}
                      alignItems="flex-start"
                      disableGutters
                      sx={{
                        px: { xs: 2, md: 3 },
                        py: { xs: 1.5, md: 2 },
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          bgcolor: 'rgba(255, 255, 255, 0.05)',
                          transform: 'translateX(5px)',
                          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                        },
                        borderRadius: 2,
                        mb: 1,
                      }}
                    >
                      <Grid container spacing={{ xs: 1, md: 2 }} alignItems="flex-start">
                        <Grid item xs={12} md={3} lg={2}>
                          <Box sx={{ 
                            display: 'flex', 
                            flexDirection: { xs: 'row', md: 'column' },
                            alignItems: { xs: 'center', md: 'flex-start' },
                            gap: 1
                          }}>
                            <Box sx={{ 
                              display: 'flex', 
                              alignItems: 'center',
                              bgcolor: alpha(theme.palette.primary.main, 0.1),
                              px: 1,
                              py: 0.5,
                              borderRadius: 1,
                            }}>
                              <AccessTimeIcon sx={{ color: 'primary.main', mr: 0.5, fontSize: 16 }} />
                              <Typography 
                                variant="body2" 
                                sx={{ 
                                  fontWeight: 600,
                                  whiteSpace: 'nowrap',
                                  fontSize: { xs: '0.75rem', md: '0.8rem' }
                                }}
                              >
                                {event.time}
                              </Typography>
                            </Box>
                            
                            {event.location && (
                              <Box sx={{ 
                                display: 'flex', 
                                alignItems: 'center',
                                mt: { xs: 0, md: 1 }
                              }}>
                                <LocationOnIcon sx={{ color: 'text.secondary', mr: 0.5, fontSize: 14 }} />
                                <Typography 
                                  variant="caption" 
                                  color="text.secondary"
                                  sx={{ fontSize: '0.7rem' }}
                                >
                                  {event.location}
                                </Typography>
                              </Box>
                            )}
                          </Box>
                        </Grid>
                        
                        <Grid item xs={12} md={9} lg={10}>
                          <ListItemText
                            primary={
                              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', mb: 0.5 }}>
                                {getEventTypeIcon(event.type)}
                                <Typography 
                                  variant="subtitle1" 
                                  component="span" 
                                  sx={{ 
                                    fontWeight: 600,
                                    fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' }
                                  }}
                                >
                                  {event.title}
                                </Typography>
                                <Chip 
                                  label={event.type} 
                                  size="small" 
                                  sx={{ 
                                    ml: { xs: 1, sm: 2 },
                                    bgcolor: getEventTypeColor(event.type),
                                    color: 'white',
                                    fontWeight: 500,
                                    fontSize: '0.65rem',
                                    height: 18,
                                    mt: { xs: 0.5, sm: 0 }
                                  }} 
                                />
                              </Box>
                            }
                            secondary={
                              event.description ? (
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  sx={{ 
                                    mt: 0.5,
                                    fontSize: { xs: '0.75rem', md: '0.8rem' },
                                    lineHeight: 1.5
                                  }}
                                >
                                  {event.description}
                                </Typography>
                              ) : null
                            }
                          />
                          
                          {event.speakers && (
                            <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                              {event.speakers.map((speaker, idx) => (
                                <Chip
                                  key={idx}
                                  label={speaker}
                                  variant="outlined"
                                  size="small"
                                  sx={{ 
                                    fontSize: '0.65rem', 
                                    height: 20,
                                    borderColor: alpha(theme.palette.primary.main, 0.3)
                                  }}
                                />
                              ))}
                            </Box>
                          )}
                        </Grid>
                      </Grid>
                    </ListItem>
                    {index < AGENDA[value].events.length - 1 && (
                      <Divider 
                        component={motion.li}
                        variants={itemVariants}
                        sx={{ 
                          borderColor: 'rgba(255, 255, 255, 0.08)',
                          mx: { xs: 1, md: 2 }
                        }} 
                      />
                    )}
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </motion.div>
        </AnimatePresence>
      </Container>
    </Box>
  );
};

export default Agenda;