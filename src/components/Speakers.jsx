import React, { useEffect, memo, useState } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Divider,
  Link,
  useMediaQuery,
  useTheme
} from '@mui/material';
import SectionTitle from './commons/SectionTitle';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArticleIcon from '@mui/icons-material/Article';
import SchoolIcon from '@mui/icons-material/School';

// Optimized canvas animation with performance detection
const BackgroundAnimation = memo(() => {
  const [animationEnabled, setAnimationEnabled] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Detect performance capabilities
  useEffect(() => {
    // Check if device is low-end or battery is low
    if ('deviceMemory' in navigator) {
      if (navigator.deviceMemory < 4) {
        setAnimationEnabled(false);
        return;
      }
    }
    
    // Additional check for mobile devices to reduce battery drain
    if (isMobile && 'getBattery' in navigator) {
      navigator.getBattery().then(battery => {
        if (battery.level < 0.2 && !battery.charging) {
          setAnimationEnabled(false);
        }
      }).catch(() => {
        // Continue with animation if API not available
      });
    }
  }, [isMobile]);
  
  useEffect(() => {
    // Skip animation if disabled
    if (!animationEnabled) return;
    
    // Performance optimized animation
    let animationFrameId;
    let lastFrameTime = 0;
    const FPS_THROTTLE = 30; // Cap at 30 FPS
    const minFrameTime = 1000 / FPS_THROTTLE;
    
    // Create canvas element
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '0';
    
    // Append canvas to speakers section
    const speakersSection = document.getElementById('speakers');
    if (!speakersSection) return;
    
    speakersSection.appendChild(canvas);
    
    // Optimized resize handler with debounce
    let resizeTimeout;
    const resize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        canvas.width = speakersSection.offsetWidth;
        canvas.height = speakersSection.offsetHeight;
      }, 250);
    };
    
    resize();
    window.addEventListener('resize', resize, { passive: true });
    
    // Initialize particles - fewer on mobile
    const ctx = canvas.getContext('2d');
    const particles = [];
    const particleCount = isMobile 
      ? Math.min(15, Math.floor(canvas.width / 40)) 
      : Math.min(30, Math.floor(canvas.width / 30));
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        color: `rgba(255, 215, 0, ${Math.random() * 0.3 + 0.1})`,
        speedX: Math.random() * 0.3 - 0.15,
        speedY: Math.random() * 0.3 - 0.15,
        directionChangeTimer: 0,
        directionChangeInterval: Math.random() * 300 + 200 // Less frequent changes
      });
    }
    
    // Optimized animation loop with frame skipping
    const animate = (timestamp) => {
      // Throttle FPS
      if (timestamp - lastFrameTime < minFrameTime) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }
      
      lastFrameTime = timestamp;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach(particle => {
        // Change direction less frequently
        particle.directionChangeTimer++;
        if (particle.directionChangeTimer >= particle.directionChangeInterval) {
          particle.speedX = Math.random() * 0.3 - 0.15;
          particle.speedY = Math.random() * 0.3 - 0.15;
          particle.directionChangeTimer = 0;
        }
        
        // Move particle
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });
      
      // Optimized connections - only check a subset of particles
      // and only every second frame to improve performance
      if (Math.round(timestamp / minFrameTime) % 2 === 0) {
        // Use spatial partitioning for more efficient connection checking
        const gridSize = 100;
        const grid = {};
        
        // Place particles in grid cells
        particles.forEach(particle => {
          const cellX = Math.floor(particle.x / gridSize);
          const cellY = Math.floor(particle.y / gridSize);
          const cellKey = `${cellX},${cellY}`;
          
          if (!grid[cellKey]) {
            grid[cellKey] = [];
          }
          grid[cellKey].push(particle);
        });
        
        // Check connections only with particles in adjacent cells
        particles.forEach(particleA => {
          const cellX = Math.floor(particleA.x / gridSize);
          const cellY = Math.floor(particleA.y / gridSize);
          
          // Check cells in a 3x3 grid around current cell
          for (let x = cellX - 1; x <= cellX + 1; x++) {
            for (let y = cellY - 1; y <= cellY + 1; y++) {
              const cellKey = `${x},${y}`;
              if (!grid[cellKey]) continue;
              
              grid[cellKey].forEach(particleB => {
                if (particleA === particleB) return;
                
                const dx = particleA.x - particleB.x;
                const dy = particleA.y - particleB.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                // Reduced connection distance on mobile
                const maxDistance = isMobile ? 60 : 80;
                if (distance < maxDistance) {
                  ctx.beginPath();
                  ctx.moveTo(particleA.x, particleA.y);
                  ctx.lineTo(particleB.x, particleB.y);
                  ctx.strokeStyle = `rgba(255, 215, 0, ${0.04 * (1 - distance / maxDistance)})`;
                  ctx.lineWidth = 0.3;
                  ctx.stroke();
                }
              });
            }
          }
        });
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Start animation
    animationFrameId = requestAnimationFrame(animate);
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      if (speakersSection && speakersSection.contains(canvas)) {
        speakersSection.removeChild(canvas);
      }
      clearTimeout(resizeTimeout);
    };
  }, [animationEnabled, isMobile]);
  
  return null;
});

// Set display name for debugging
BackgroundAnimation.displayName = 'BackgroundAnimation';

// Optimized SpeakerCard component with memoization
const SpeakerCard = memo(({ speaker, index }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Animation delay based on index, shorter on mobile
  const animationDelay = isMobile 
    ? `${index * 0.15}s` 
    : `${index * 0.2}s`;
  
  // Preload speaker image
  useEffect(() => {
    const img = new Image();
    img.src = speaker.image;
  }, [speaker.image]);

  return (
    <Grid item xs={12} md={10}>
      <Box
        sx={{
          opacity: 0,
          transform: 'translateY(30px)',
          animation: 'fadeInUp 0.8s forwards',
          animationDelay: animationDelay,
          '@keyframes fadeInUp': {
            '0%': {
              opacity: 0,
              transform: 'translateY(30px)'
            },
            '100%': {
              opacity: 1,
              transform: 'translateY(0)'
            }
          }
        }}
      >
        <Card
          elevation={0}
          sx={{
            borderRadius: 4,
            overflow: 'hidden',
            position: 'relative',
            bgcolor: 'rgba(17, 34, 64, 0.7)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            p: 0,
            mb: 4,
            willChange: 'transform',
            '&:hover': {
              transform: 'translateY(-8px) scale(1.01)',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
            },
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
                height: { xs: '280px', md: '350px' },
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: 'rgba(10, 25, 47, 0.5)',
                overflow: 'hidden'
              }}>
                <CardMedia
                  component="img"
                  image={speaker.image}
                  alt={speaker.name}
                  loading="lazy"
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
                      backgroundColor: 'rgba(255, 215, 0, 0.8)'
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
                    component="h3"
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
                    {speaker.name}
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
                    {speaker.role}
                  </Typography>
                  
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      mb: 2,
                      fontSize: { xs: '0.8rem', md: '0.9rem' }
                    }}
                  >
                    {speaker.organization}
                  </Typography>
                  
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: 'rgba(255, 255, 255, 0.9)',
                      mb: 2,
                      fontSize: { xs: '1rem', md: '1.2rem' }
                    }}
                  >
                    Topic: {speaker.talk}
                  </Typography>
                  
                  <Typography
                    variant="body2"
                    sx={{
                      mb: 3,
                      color: 'rgba(255, 255, 255, 0.7)',
                      lineHeight: 1.6,
                      fontSize: { xs: '0.8rem', md: '0.9rem' }
                    }}
                  >
                    {speaker.bio}
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
                        color: 'rgba(255, 255, 255, 0.7)',
                        fontSize: '0.85rem'
                      }}
                    >
                      <EventAvailableIcon 
                        sx={{ fontSize: '1rem', mr: 0.5, color: 'primary.main' }} 
                      />
                      {speaker.day} • {speaker.time}
                    </Box>
                    
                    {speaker.extraInfo && (
                      <Box 
                        sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          color: 'rgba(255, 255, 255, 0.7)',
                          fontSize: '0.85rem'
                        }}
                      >
                        <ArticleIcon 
                          sx={{ fontSize: '1rem', mr: 0.5, color: 'primary.main' }} 
                        />
                        {speaker.extraInfo}
                      </Box>
                    )}
                    
                    {speaker.location && (
                      <Box 
                        sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          color: 'rgba(255, 255, 255, 0.7)',
                          fontSize: '0.85rem'
                        }}
                      >
                        <LocationOnIcon 
                          sx={{ fontSize: '1rem', mr: 0.5, color: 'primary.main' }} 
                        />
                        {speaker.location}
                      </Box>
                    )}
                  </Box>
                  
                  {/* Awards section - conditionally rendered */}
                  {speaker.awards && speaker.awards.length > 0 && (
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
                        {speaker.awards.map((award, idx) => (
                          <Chip
                            key={idx}
                            label={award}
                            size="small"
                            icon={<SchoolIcon />}
                            variant="outlined"
                            sx={{ 
                              borderColor: 'rgba(255, 215, 0, 0.5)',
                              color: 'rgba(255, 255, 255, 0.8)'
                            }}
                          />
                        ))}
                      </Box>
                    </Box>
                  )}
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                    <Button
                      component={Link}
                      href={speaker.linkedin}
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
                          backgroundColor: 'rgba(255, 215, 0, 0.1)'
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
      </Box>
    </Grid>
  );
});

// Set display name for debugging
SpeakerCard.displayName = 'SpeakerCard';

// Memoized floating shape component to reduce rerenders
const FloatingShape = memo(({ top, left, right, size, color, delay }) => (
  <Box
    sx={{
      position: 'absolute',
      top: top,
      ...(left ? { left } : {}),
      ...(right ? { right } : {}),
      width: size,
      height: size,
      borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
      background: `linear-gradient(45deg, ${color}05, ${color}00)`,
      animation: `floatAnimation ${delay}s infinite ease-in-out`,
      zIndex: 0,
      '@keyframes floatAnimation': {
        '0%': { transform: 'translate(0, 0) rotate(0deg)' },
        '33%': { transform: 'translate(-20px, 20px) rotate(5deg)' },
        '66%': { transform: 'translate(20px, -20px) rotate(-5deg)' },
        '100%': { transform: 'translate(0, 0) rotate(0deg)' },
      }
    }}
  />
));

FloatingShape.displayName = 'FloatingShape';

// Speakers component with performance optimizations
const Speakers = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Memoized speaker data to prevent recreation on renders
  const featuredSpeakers = React.useMemo(() => [
    {
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
    },
    {
      name: "Benson Kinoti",
      role: "Head of Education for Sub-Saharan Africa",
      organization: "Google",
      image: "/images/kinoti.jpg",
      talk: "Tech for Impact - Inspiring a Generation of Builders",
      bio: "Benson Kinoti is leading efforts to make learning more accessible, tech-powered, and future-proof for students and teachers across the region. From policy conversations to real-life impact in classrooms, Benson's work focuses on bridging the digital divide and ensuring no one gets left behind in the tech revolution.",
      linkedin: "https://www.linkedin.com/in/benson-kinoti-92b66b75/",
      time: "9:30 AM - 10:30 AM",
      day: "April 16th, 2025",
      location: "Pavillion B"
    },
    {
      name: "Eng. Margaret Ogai",
      role: "Registrar and CEO",
      organization: "Engineers Board of Kenya (EBK)",
      image: "/images/ogai.jpg",
      talk: "Keynote Address to Engineering Students",
      bio: "With over 30 years of experience in infrastructure and engineering, Eng. Margaret Ogai is a registered Consulting Engineer and a Fellow of the Institution of Engineers of Kenya (IEK). She leads EBK in regulating the engineering profession and championing initiatives like mentorship and gender inclusion in STEM. Eng. Ogai is passionate about using engineering to drive industrialization and economic growth in Kenya.",
      linkedin: "https://www.linkedin.com/in/eng-margaret-ogai-87529072/",
      time: "8:45 AM - 10:00 AM",
      day: "April 17th, 2025",
      location: "Pavillion B"
    }
  ], []);

  return (
    <Box 
      id="speakers" 
      component="section"
      sx={{ 
        py: { xs: 6, md: 8 }, // Reduced padding for better performance
        pb: { xs: 3, md: 6 },
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #112240 0%, #0a192f 100%)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'radial-gradient(circle at 30% 70%, rgba(100, 255, 218, 0.08) 0%, transparent 60%), radial-gradient(circle at 80% 30%, rgba(100, 255, 218, 0.05) 0%, transparent 50%)',
          zIndex: 0,
        }
      }}
    >
      {/* Background animation - conditionally rendered based on device capability */}
      <BackgroundAnimation />
      
      {/* Animated shapes - fewer on mobile */}
      {!isMobile && (
        <>
          <FloatingShape 
            top="15%" 
            right="5%" 
            size="200px" 
            color="rgba(255,215,0," 
            delay={15} 
          />
          <FloatingShape 
            top="auto" 
            bottom="20%" 
            left="10%" 
            size="250px" 
            color="rgba(30,136,229," 
            delay={18} 
          />
        </>
      )}
      
      {/* Main content */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <SectionTitle 
          title="Keynote Speakers" 
          subtitle="Visionaries & Industry Leaders"
          description="Connect with thought leaders shaping the future of technology and innovation."
        />
        
        {/* Featured Speakers Cards with windowing for performance */}
        <Grid container spacing={4} justifyContent="center" sx={{ mb: 4 }}>
          {featuredSpeakers.map((speaker, index) => (
            <SpeakerCard 
              key={speaker.name}
              speaker={speaker} 
              index={index}
            />
          ))}
        </Grid>

        <Divider 
          sx={{ 
            my: 4, // Reduced margin
            borderColor: 'rgba(255, 255, 255, 0.1)',
            width: '80%',
            mx: 'auto'
          }} 
        />

        {/* More speakers coming soon section */}
        <Box 
          sx={{ 
            textAlign: 'center', 
            mt: 1,
            opacity: 0,
            animation: 'fadeIn 1s forwards 1.2s',
            '@keyframes fadeIn': {
              from: { opacity: 0 },
              to: { opacity: 1 }
            }
          }}
        >
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
              mb: 2,
              fontSize: { xs: '0.8rem', md: '0.9rem' }
            }}
          >
            We're assembling an exciting lineup of industry experts, thought leaders, and innovators
            from around the world. Stay tuned for more speaker announcements in the coming weeks.
          </Typography>
          
          <Button
            component={Link}
            href="#agenda"
            variant="outlined"
            color="primary"
            sx={{
              mt: 1,
              px: 3,
              py: 1,
              borderRadius: 2,
              textTransform: 'none',
              position: 'relative',
              overflow: 'hidden',
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,215,0,0.2), transparent)',
                transition: 'all 0.5s ease',
              },
              '&:hover::after': {
                left: '100%',
              }
            }}
          >
            View Full Event Agenda
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

// Export memoized component to prevent unnecessary rerenders
export default memo(Speakers);