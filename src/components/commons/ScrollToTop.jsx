import React, { useState, useEffect } from 'react';
import { Fab, Zoom, useScrollTrigger } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { animateScroll as scroll } from 'react-scroll';

const ScrollToTop = () => {
  const [showButton, setShowButton] = useState(false);
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  useEffect(() => {
    setShowButton(trigger);
  }, [trigger]);

  const handleClick = () => {
    scroll.scrollToTop({
      duration: 800,
      smooth: 'easeInOutQuart',
    });
  };

  return (
    <Zoom in={showButton}>
      <Fab
        color="primary"
        size="small"
        aria-label="scroll back to top"
        onClick={handleClick}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 10,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 10px 20px rgba(255, 215, 0, 0.3)',
          },
        }}
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </Zoom>
  );
};

export default ScrollToTop;