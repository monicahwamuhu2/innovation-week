import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Card,
  CardContent,
  CardMedia,
  alpha,
 
  Button,
  Chip,
  Link
} from '@mui/material';
import { motion, useAnimation, useInView } from 'framer-motion';
import SectionTitle from './commons/SectionTitle';
import { useTheme } from '@mui/material/styles';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ArticleIcon from '@mui/icons-material/Article';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import SchoolIcon from '@mui/icons-material/School';

// Optimized Particle animation component with memoization
const ParticleBackground = React.memo(() => {
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  
  // Memoized resize handler
  const handleResize = useCallback(() => {
    if (canvasRef.current?.parentElement) {
      setDimensions({
        width: canvasRef.current.parentElement.offsetWidth,
        height: canvasRef.current.parentElement.offsetHeight
      });
    }
  }, []);
  
  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [handleResize]);
  
  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0) return;
    
    const ctx = canvasRef.current.getContext('2d');
    // Calculate particle count based on screen size - fewer particles for better performance
    const particleCount = Math.min(40, Math.floor(dimensions.width / 25));
    
    // Initialize particles only when dimensions change
    if (particlesRef.current.length === 0 || particlesRef.current.length !== particleCount) {
      particlesRef.current = Array.from({ length: particleCount }, () => ({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        radius: Math.random() * 1.5 + 0.5,
        color: `rgba(100, 255, 218, ${Math.random() * 0.4 + 0.1})`,
        speedX: Math.random() * 0.4 - 0.2,
        speedY: Math.random() * 0.4 - 0.2,
        directionChangeTimer: 0,
        directionChangeInterval: Math.random() * 200 + 100
      }));
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
      
      // Update and draw particles
      particlesRef.current.forEach(particle => {
        // Change direction less frequently for better performance
        particle.directionChangeTimer++;
        if (particle.directionChangeTimer >= particle.directionChangeInterval) {
          particle.speedX = Math.random() * 0.4 - 0.2;
          particle.speedY = Math.random() * 0.4 - 0.2;
          particle.directionChangeTimer = 0;
        }
        
        // Move particle
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = dimensions.width;
        if (particle.x > dimensions.width) particle.x = 0;
        if (particle.y < 0) particle.y = dimensions.height;
        if (particle.y > dimensions.height) particle.y = 0;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });
      
      // Optimize connections - only draw between particles that are likely to be close
      // and limit the number of connections checked
      for (let i = 0; i < particlesRef.current.length; i++) {
        const particleA = particlesRef.current[i];
        // Only check a subset of particles for connections to improve performance
        for (let j = i + 1; j < Math.min(i + 10, particlesRef.current.length); j++) {
          const particleB = particlesRef.current[j];
          const dx = particleA.x - particleB.x;
          const dy = particleA.y - particleB.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 80) { // Reduced connection distance
            ctx.beginPath();
            ctx.moveTo(particleA.x, particleA.y);
            ctx.lineTo(particleB.x, particleB.y);
            ctx.strokeStyle = `rgba(100, 255, 218, ${0.08 * (1 - distance / 80)})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        }
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions]);
  
  return (
    <canvas 
      ref={canvasRef} 
      width={dimensions.width} 
      height={dimensions.height}
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0
      }}
    />
  );
});

// Set display name for better debugging
ParticleBackground.displayName = 'ParticleBackground';

const Speakers = () => {
  const theme = useTheme();
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  const controls = useAnimation();
  
  // Memoized animation variants to prevent recreating objects on each render
  const animationVariants = useMemo(() => ({
    containerVariants: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.2
        }
      }
    },
    cardVariants: {
      hidden: { y: 50, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 15,
          duration: 0.8
        }
      }
    },
    pulseVariants: {
      hidden: { scale: 0.95, opacity: 0.8 },
      visible: {
        scale: 1,
        opacity: 1,
        transition: {
          yoyo: Infinity,
          duration: 2,
          ease: "easeInOut"
        }
      }
    },
    glowVariants: {
      hidden: { opacity: 0.5 },
      visible: {
        opacity: [0.5, 0.8, 0.5],
        transition: {
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut"
        }
      }
    }
  }), []);

  // Featured speaker data
  const featuredSpeaker = {
    name: "Univ.-Prof. Dr. Cristina Olaverri Monreal",
    role: "Full Professor, Head of Department Intelligent Transport Systems",
    organization: "JOHANNES KEPLER UNIVERSITY LINZ",
    image: "/images/christine.jpg",
    talk: "The Integration of Technology and Safety in Automated Vehicles",
    bio: "Cristina Olaverri-Monreal is a full professor and head of the Department Intelligent Transport Systems at the Johannes Kepler University Linz, in Austria. She served as the president of the IEEE Intelligent Transportation Systems Society (IEEE ITSS) for the years 2022 and 2023 and is the IEEE Division IX Director-Elect and member of the 2026-2027 IEEE Board of Directors.",
    linkedin: "https://www.linkedin.com/in/cristina-olaverri-monreal-06b41212/",
    awards: ["IEEE Educational Activities Board Meritorious Achievement Award", "2023 IEEE MGA Diversity & Inclusion Award"],
    time: "10:00 AM - 11:00 AM",
    day: "April 17th, 2025",
    extraInfo: "Distinguished Lecture Program"
  };
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);
  
  // Optimized scroll handler with throttling
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box 
      id="speakers" 
      component="section"
      ref={containerRef}
      aria-labelledby="speakers-title"
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
          backgroundImage: 'radial-gradient(circle at 30% 70%, rgba(100, 255, 218, 0.08) 0%, transparent 60%), radial-gradient(circle at 80% 30%, rgba(100, 255, 218, 0.05) 0%, transparent 50%)',
          backgroundSize: '120% 120%',
          backgroundPosition: `${-scrollY * 0.02}px ${-scrollY * 0.01}px`,
          zIndex: -1,
        }
      }}
    >
      <ParticleBackground />
      
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <SectionTitle 
          title="Featured Speakers" 
          subtitle="Visionaries & Industry Leaders"
          description="Connect with thought leaders shaping the future of technology and innovation."
        />
        
        <motion.div
          variants={animationVariants.containerVariants}
          initial="hidden"
          animate={controls}
        >
          {/* Featured Speaker Card */}
          <Grid container spacing={4} justifyContent="center" sx={{ mb: 6 }}>
            <Grid item xs={12} md={10}>
              <motion.div variants={animationVariants.cardVariants}>
                <Card
                  elevation={0}
                  component={motion.div}
                  whileHover={{ y: -5, boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)' }}
                  sx={{
                    borderRadius: 4,
                    overflow: 'hidden',
                    position: 'relative',
                    bgcolor: 'rgba(17, 34, 64, 0.7)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    transition: 'all 0.3s ease',
                    p: 0,
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '3px',
                      background: 'linear-gradient(90deg, rgba(100, 255, 218, 0), rgba(100, 255, 218, 1), rgba(100, 255, 218, 0))',
                      zIndex: 1,
                    },
                  }}
                >
                  <Grid container>
                    <Grid item xs={12} md={4}>
                      <Box sx={{ 
                        position: 'relative', 
                        height: { xs: '300px', md: '350px' },
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        bgcolor: 'rgba(10, 25, 47, 0.5)',
                        overflow: 'hidden'
                      }}>
                        <CardMedia
                          component="img"
                          image={featuredSpeaker.image}
                          alt={featuredSpeaker.name}
                          sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'top center',
                          }}
                        />
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: 'linear-gradient(to bottom, rgba(17, 34, 64, 0) 70%, rgba(17, 34, 64, 0.8) 100%)',
                          }}
                        />
                        <Box
                          component={motion.div}
                          variants={animationVariants.glowVariants}
                          sx={{
                            position: 'absolute',
                            bottom: 16,
                            left: 16,
                            zIndex: 2
                          }}
                        >
                          <Chip
                            label="Keynote Speaker"
                            color="primary"
                            size="small"
                            sx={{
                              fontWeight: 'bold',
                              backdropFilter: 'blur(5px)',
                              backgroundColor: alpha(theme.palette.primary.main, 0.8)
                            }}
                          />
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                        <Box>
                          <Typography
                            variant="h4"
                            component="h2"
                            id="speakers-title"
                            sx={{
                              fontWeight: 700,
                              mb: 1,
                              background: 'linear-gradient(90deg, #64ffda, #88cfff)',
                              backgroundClip: 'text',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              textShadow: '0 2px 10px rgba(100, 255, 218, 0.2)',
                              fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2.2rem' }
                            }}
                          >
                            {featuredSpeaker.name}
                          </Typography>
                          
                          <Typography
                            variant="subtitle1"
                            sx={{
                              color: 'primary.main',
                              fontWeight: 600,
                              mb: 0.5,
                              fontSize: { xs: '0.9rem', md: '1rem' }
                            }}
                          >
                            {featuredSpeaker.role}
                          </Typography>
                          
                          <Typography
                            variant="subtitle2"
                            sx={{
                              color: alpha(theme.palette.common.white, 0.7),
                              mb: 2,
                              fontSize: { xs: '0.8rem', md: '0.9rem' }
                            }}
                          >
                            {featuredSpeaker.organization}
                          </Typography>
                          
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 600,
                              color: alpha(theme.palette.common.white, 0.9),
                              mb: 2,
                              fontSize: { xs: '1rem', md: '1.2rem' }
                            }}
                          >
                            Topic: {featuredSpeaker.talk}
                          </Typography>
                          
                          <Typography
                            variant="body2"
                            sx={{
                              mb: 3,
                              color: alpha(theme.palette.common.white, 0.7),
                              lineHeight: 1.6,
                              fontSize: { xs: '0.8rem', md: '0.9rem' }
                            }}
                          >
                            {featuredSpeaker.bio}
                          </Typography>
                          
                          <Box 
                            sx={{ 
                              display: 'flex', 
                              flexWrap: 'wrap', 
                              alignItems: 'center', 
                              gap: 2, 
                              mb: 3 
                            }}
                          >
                            <Box 
                              sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                color: alpha(theme.palette.common.white, 0.7),
                                fontSize: '0.85rem'
                              }}
                            >
                              <EventAvailableIcon 
                                sx={{ fontSize: '1rem', mr: 0.5, color: 'primary.main' }} 
                              />
                              {featuredSpeaker.day} • {featuredSpeaker.time}
                            </Box>
                            
                            <Box 
                              sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                color: alpha(theme.palette.common.white, 0.7),
                                fontSize: '0.85rem'
                              }}
                            >
                              <ArticleIcon 
                                sx={{ fontSize: '1rem', mr: 0.5, color: 'primary.main' }} 
                              />
                              {featuredSpeaker.extraInfo}
                            </Box>
                          </Box>
                          
                          {/* Awards section */}
                          <Box sx={{ mb: 3 }}>
                            <Typography
                              variant="subtitle2"
                              sx={{
                                color: 'primary.main',
                                fontWeight: 600,
                                mb: 1
                              }}
                            >
                              Awards & Recognition:
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                              {featuredSpeaker.awards.map((award, idx) => (
                                <Chip
                                  key={idx}
                                  label={award}
                                  size="small"
                                  icon={<SchoolIcon />}
                                  variant="outlined"
                                  sx={{ 
                                    borderColor: alpha(theme.palette.primary.main, 0.5),
                                    color: alpha(theme.palette.common.white, 0.8)
                                  }}
                                />
                              ))}
                            </Box>
                          </Box>
                          
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Button
                              component={Link}
                              href={featuredSpeaker.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              startIcon={<LinkedInIcon />}
                              variant="outlined"
                              color="primary"
                              size="small"
                              sx={{
                                borderRadius: 2,
                                textTransform: 'none',
                                '&:hover': {
                                  backgroundColor: alpha(theme.palette.primary.main, 0.1)
                                }
                              }}
                            >
                              Connect on LinkedIn
                            </Button>
                            
                            {/* Session Details Button */}
                            <Button
                              component={Link}
                              href="#agenda"
                              variant="contained"
                              color="primary"
                              size="small"
                              sx={{
                                borderRadius: 2,
                                textTransform: 'none',
                                backgroundImage: 'linear-gradient(90deg, #64ffda, #1E88E5)',
                                color: '#0a192f',
                                '&:hover': {
                                  backgroundImage: 'linear-gradient(90deg, #1E88E5, #64ffda)',
                                }
                              }}
                            >
                              Session Details
                            </Button>
                          </Box>
                        </Box>
                      </CardContent>
                    </Grid>
                  </Grid>
                </Card>
              </motion.div>
            </Grid>
          </Grid>

          {/* Additional speakers coming soon section */}
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography 
              variant="h6"
              sx={{ 
                fontWeight: 600,
                mb: 2,
                color: 'primary.main'
              }}
            >
              More Speakers Coming Soon
            </Typography>
            <Typography 
              variant="body2"
              color="text.secondary"
              sx={{ 
                maxWidth: '700px',
                mx: 'auto',
                mb: 3,
                fontSize: { xs: '0.8rem', md: '0.9rem' }
              }}
            >
              We're assembling an exciting lineup of industry experts, thought leaders, and innovators
              from around the world. Stay tuned for more speaker announcements in the coming week.
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default React.memo(Speakers);