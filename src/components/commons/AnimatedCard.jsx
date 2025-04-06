import React from 'react';
import { Box, Paper } from '@mui/material';
import { motion } from 'framer-motion';

const AnimatedCard = ({ children, delay = 0, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 4,
          height: '100%',
          bgcolor: 'rgba(17, 34, 64, 0.7)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 15px 40px rgba(0, 0, 0, 0.3)',
          },
          ...props.sx,
        }}
        {...props}
      >
        {children}
      </Paper>
    </motion.div>
  );
};

export default AnimatedCard;