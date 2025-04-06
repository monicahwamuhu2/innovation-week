import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Avatar,
  Button,
  //useMediaQuery,
  //useTheme,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';

// We'll remove the HideOnScroll wrapper since we want the header to remain visible
// Instead, we'll just transform its appearance on scroll

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  //const theme = useTheme();
  // Keeping isMobile for future use, but it's now properly used
  //const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [scrolled, setScrolled] = useState(false);
  const [animated, setAnimated] = useState(false);
  
  // Trigger entrance animation after component mounts
  useEffect(() => {
    setTimeout(() => {
      setAnimated(true);
    }, 300);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const navItems = [
    { name: 'Home', to: 'hero' },
    { name: 'Agenda', to: 'agenda' },
    { name: 'Call for Projects', to: 'call-for-projects' },
    { name: 'Speakers', to: 'speakers' },
    { name: 'Registration', to: 'registration' },
    { name: 'Partners', to: 'partners' },
    { name: 'Team', to: 'team' },
  ];

  const drawerList = () => (
    <Box
      sx={{ 
        width: 280, 
        height: '100%',
        backgroundColor: 'rgba(10, 25, 47, 0.98)',
        color: 'white',
        padding: 2,
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <motion.div whileHover={{ rotate: 90 }} whileTap={{ scale: 0.9 }}>
          <IconButton sx={{ color: 'white' }} onClick={toggleDrawer(false)}>
            <CloseIcon />
          </IconButton>
        </motion.div>
      </Box>
      
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, pl: 1 }}>
        <Avatar
          src="/assets/images/logos/mmu-logo.png"
          alt="MMU Logo"
          sx={{ width: 45, height: 45, mr: 2 }}
        />
        <Typography variant="h6" sx={{ fontFamily: 'Montserrat', fontWeight: 700 }}>
          MMU Innovation Week
        </Typography>
      </Box>
      
      <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.2)', mb: 2 }} />
      
      <List>
        {navItems.map((item) => (
          <ListItem 
            key={item.name} 
            component={Link}
            to={item.to}
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            sx={{ 
              py: 1.5,
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)',
                pl: 2,
              },
              cursor: 'pointer'
            }}
          >
            <ListItemText 
              primary={item.name} 
              primaryTypographyProps={{ 
                fontFamily: 'Montserrat',
                fontWeight: 500,
                fontSize: '1rem'
              }} 
            />
          </ListItem>
        ))}
      </List>
      
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          component={Link}
          to="registration"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          sx={{
            py: 1.5,
            fontWeight: 'bold',
            borderRadius: '8px',
            boxShadow: '0 4px 14px 0 rgba(0,118,255,0.39)',
          }}
        >
          Register Now
        </Button>
        
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 3 }}>
          <CalendarTodayIcon sx={{ mr: 1, fontSize: 18 }} />
          <Typography variant="body2" sx={{ fontFamily: 'Montserrat' }}>
            April 14-17, 2025
          </Typography>
        </Box>
      </Box>
    </Box>
  );

  return (
      <AppBar 
        position="fixed" 
        elevation={scrolled ? 4 : 0}
        sx={{
          backgroundColor: scrolled 
            ? 'rgba(10, 25, 47, 0.95)' 
            : 'rgba(10, 25, 47, 0.7)',
          transition: 'all 0.4s ease',
          backdropFilter: 'blur(10px)',
          borderBottom: scrolled 
            ? 'none' 
            : '1px solid rgba(255,255,255,0.1)',
          height: scrolled ? '60px' : '70px',
          transform: scrolled ? 'translateY(0)' : 'translateY(0)',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar 
            disableGutters 
            sx={{ 
              py: { xs: 0.5, md: 0 },
              minHeight: { xs: '60px', md: '60px' },
              height: '100%'
            }}
          >
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: animated ? 1 : 0, x: animated ? 0 : -30 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
            >
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  mr: 2
                }}
              >
                <Avatar
                  src="/assets/images/logos/mmu-logo.png"
                  alt="MMU Logo"
                  sx={{ 
                    display: { xs: 'flex', md: 'flex' }, 
                    mr: { xs: 1, md: 1.5 },
                    width: { xs: 35, md: 40 },
                    height: { xs: 35, md: 40 },
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'rotate(10deg) scale(1.1)',
                    }
                  }}
                />
                
                <Box>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      fontFamily: 'Montserrat',
                      fontWeight: 700,
                      fontSize: { xs: '0.9rem', md: '1.1rem' },
                      color: '#fff',
                      letterSpacing: '0.5px',
                      lineHeight: 1.2,
                    }}
                  >
                    MMU Innovation Week
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      display: { xs: 'none', sm: 'block' },
                      fontFamily: 'Montserrat',
                      color: 'rgba(255,255,255,0.7)',
                      fontSize: '0.75rem',
                      mt: 0.2,
                      letterSpacing: '1px',
                    }}
                  >
                    APRIL 14-17, 2025
                  </Typography>
                </Box>
              </Box>
            </motion.div>

            <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center', flexGrow: 1 }}>
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Link
                    to={item.to}
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                  >
                    <Button
                      sx={{ 
                        my: 1, 
                        mx: 0.5,
                        px: 1.2,
                        color: 'white', 
                        display: 'block',
                        fontFamily: 'Montserrat',
                        fontWeight: 500,
                        position: 'relative',
                        fontSize: '0.9rem',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          width: '0',
                          height: '2px',
                          bottom: '6px',
                          left: '50%',
                          backgroundColor: (theme) => theme.palette.primary.main,
                          transition: 'all 0.3s ease',
                          transform: 'translateX(-50%)',
                          opacity: 0,
                        },
                        '&:hover': {
                          backgroundColor: 'rgba(255,255,255,0.05)',
                        },
                        '&:hover::after': {
                          width: '70%',
                          opacity: 1,
                        }
                      }}
                    >
                      {item.name}
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </Box>

            <Box sx={{ flexGrow: { xs: 1, md: 0 }, display: 'flex', justifyContent: 'flex-end' }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: animated ? 1 : 0, scale: animated ? 1 : 0.8 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="contained" 
                  color="primary"
                  component={Link}
                  to="registration"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  sx={{ 
                    display: { xs: 'none', md: 'flex' },
                    fontWeight: 600,
                    py: 0.7,
                    px: 2,
                    borderRadius: '8px',
                    ml: 2,
                    textTransform: 'none',
                    fontSize: '0.9rem',
                    boxShadow: '0 4px 14px 0 rgba(0,118,255,0.39)',
                    '&:hover': {
                      boxShadow: '0 6px 20px rgba(0,118,255,0.45)',
                    },
                    transition: 'all 0.2s ease',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                      transition: 'all 0.4s ease',
                    },
                    '&:hover::after': {
                      left: '100%',
                    }
                  }}
                >
              
                Register Now
                </Button>
              </motion.div>
              
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ 
                  display: { xs: 'flex', md: 'none' },
                  ml: 1,
                }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
        
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {drawerList()}
        </Drawer>
      </AppBar>
    
  );
};

export default Header;