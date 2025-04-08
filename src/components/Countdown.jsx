import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography, Container, Grid, Paper, Button } from '@mui/material';
import CountUp from 'react-countup';
import EventIcon from '@mui/icons-material/Event';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { Link as ScrollLink } from 'react-scroll';

const Countdown = () => {
  const eventDate = new Date('April 14, 2025 00:00:00').getTime();
  const [eventStarted, setEventStarted] = useState(false);
  
  const calculateTimeLeft = useCallback(() => {
    const now = new Date().getTime();
    const difference = eventDate - now;

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
    };
  }, [eventDate]);
  
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    // Check if event has already started when component mounts
    const initialTimeLeft = calculateTimeLeft();
    const hasStarted = initialTimeLeft.days === 0 && 
                        initialTimeLeft.hours === 0 && 
                        initialTimeLeft.minutes === 0 && 
                        initialTimeLeft.seconds === 0;
    
    if (hasStarted) {
      setEventStarted(true);
    }

    const timer = setInterval(() => {
      const timeLeftValues = calculateTimeLeft();
      setTimeLeft(timeLeftValues);
      
      // Check if countdown has reached zero
      const allZeros = timeLeftValues.days === 0 && 
                       timeLeftValues.hours === 0 && 
                       timeLeftValues.minutes === 0 && 
                       timeLeftValues.seconds === 0;
      
      if (allZeros) {
        setEventStarted(true);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  const countdownItems = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <Box
      id="countdown"
      sx={{
        py: 6,
        background: 'linear-gradient(135deg, #0a192f 0%, #112240 50%, #1a365d 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {!eventStarted ? (
          // Countdown UI when event hasn't started yet
          <>
            <Box textAlign="center" mb={4}>
              <Typography 
                variant="h6" 
                component="div"
                sx={{ 
                  color: 'primary.main',
                  fontWeight: 600,
                  mb: 0.5,
                  textTransform: 'uppercase',
                  letterSpacing: 1.5,
                  background: 'linear-gradient(90deg, #FFD700, #FFA500)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block',
                }}
              >
                Mark Your Calendar
              </Typography>
              
              <Typography 
                variant="h3" 
                component="h2"
                gutterBottom
                sx={{ 
                  fontWeight: 800,
                  mb: 1.5,
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                }}
              >
                Innovation Week Starts In
              </Typography>
            </Box>

            <Grid container spacing={2} justifyContent="center">
              {countdownItems.map((item) => (
                <Grid item xs={6} sm={3} key={item.label}>
                  <Paper
                    elevation={0}
                    sx={{
                      py: 3,
                      px: 1.5,
                      borderRadius: 4,
                      textAlign: 'center',
                      background: 'rgba(17, 34, 64, 0.6)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      boxShadow: '0 15px 25px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.1)',
                      position: 'relative',
                    }}
                  >
                    <Typography
                      variant="h2"
                      component="div"
                      sx={{
                        fontWeight: 800,
                        color: 'primary.main',
                        mb: 0.5,
                        fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
                        position: 'relative',
                        zIndex: 1,
                      }}
                    >
                      <CountUp end={item.value} duration={0.5} preserveValue={true} />
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 500,
                        textTransform: 'uppercase',
                        letterSpacing: 1,
                        fontSize: { xs: '0.9rem', sm: '1rem' },
                        position: 'relative',
                        zIndex: 1,
                      }}
                    >
                      {item.label}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>

            <Box 
              mt={4} 
              sx={{ 
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography 
                variant="h5" 
                component="div"
                sx={{ 
                  fontWeight: 700,
                  mb: 1.5,
                  position: 'relative',
                  display: 'inline-block',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    width: '50%',
                    height: '3px',
                    bottom: '-8px',
                    left: '25%',
                    background: 'linear-gradient(90deg, transparent, #FFD700, transparent)',
                    borderRadius: '2px',
                  }
                }}
              >
                April 14 - 17, 2025
              </Typography>
              
              <Typography 
                variant="body1" 
                sx={{ 
                  maxWidth: '650px',
                  mx: 'auto',
                  color: 'rgba(255, 255, 255, 0.8)',
                  mt: 2,
                  lineHeight: 1.5,
                }}
              >
                Three days of innovation, networking, and groundbreaking ideas at Multimedia University of Kenya.
                Don't miss this opportunity to be part of the future of technology and innovation.
              </Typography>
            </Box>
          </>
        ) : (
          // UI when event has started
          <Box textAlign="center" py={4}>
            <Box 
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 2,
                mb: 3,
                borderRadius: '50%',
                bgcolor: 'rgba(255, 215, 0, 0.1)',
                border: '2px solid rgba(255, 215, 0, 0.3)',
              }}
            >
              <EventIcon color="primary" sx={{ fontSize: { xs: 40, md: 64 } }} />
            </Box>
            
            <Typography 
              variant="h2" 
              component="h2"
              sx={{ 
                fontWeight: 800, 
                color: 'primary.main', 
                mb: 2,
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
              }}
            >
              Innovation Week is Happening Now!
            </Typography>
            
            <Typography 
              variant="h5" 
              sx={{ 
                mb: 3,
                color: 'rgba(255, 255, 255, 0.9)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
              }}
            >
              <CalendarTodayIcon fontSize="small" />
              April 14 - 17, 2025
            </Typography>
            
            <Typography 
              variant="body1" 
              sx={{ 
                maxWidth: '750px',
                mx: 'auto',
                mb: 4,
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: { xs: '1rem', md: '1.1rem' },
              }}
            >
              The moment has arrived! Multimedia University's Innovation Week is now in progress.
              Join us for today's exciting sessions, workshops, and networking opportunities.
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button 
                component={ScrollLink}
                to="agenda"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                variant="contained" 
                color="primary"
                size="large"
                sx={{ 
                  px: 4,
                  py: 1.5,
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  borderRadius: '8px',
                }}
              >
                View Today's Events
              </Button>
              
              <Button 
                component={ScrollLink}
                to="registration"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                variant="outlined" 
                color="primary"
                size="large"
                sx={{ 
                  px: 4,
                  py: 1.5,
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  borderRadius: '8px',
                }}
              >
                Register Now
              </Button>
            </Box>
            
            <Paper
              elevation={0}
              sx={{
                mt: 6,
                p: 3,
                borderRadius: 4,
                background: 'rgba(255, 215, 0, 0.05)',
                border: '1px solid rgba(255, 215, 0, 0.2)',
                textAlign: 'left',
                maxWidth: '800px',
                mx: 'auto'
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', fontWeight: 600 }}>
                Today's Highlights:
              </Typography>
              <Typography variant="body2" paragraph>
                • Opening ceremonies and keynote addresses
              </Typography>
              <Typography variant="body2" paragraph>
                • Live panel discussions on emerging technologies
              </Typography>
              <Typography variant="body2" paragraph>
                • Interactive workshops and demonstrations
              </Typography>
              <Typography variant="body2">
                • Networking sessions with industry professionals
              </Typography>
            </Paper>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Countdown;