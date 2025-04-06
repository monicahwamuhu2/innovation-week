import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const SectionTitle = ({ title, subtitle, description }) => {
  return (
    <Box sx={{ textAlign: 'center', mb: 6 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <Typography 
          variant="h6" 
          component="div"
          sx={{ 
            color: 'primary.main',
            fontWeight: 600,
            mb: 1,
            textTransform: 'uppercase',
            letterSpacing: 1,
          }}
        >
          {subtitle}
        </Typography>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <Typography 
          variant="h3" 
          component="h2"
          gutterBottom
          sx={{ 
            fontWeight: 700,
            mb: 2,
            position: 'relative',
            display: 'inline-block',
            '&::after': {
              content: '""',
              position: 'absolute',
              width: '60px',
              height: '4px',
              backgroundColor: 'primary.main',
              bottom: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
              borderRadius: '10px',
            }
          }}
        >
          {title}
        </Typography>
      </motion.div>
      
      {description && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Typography 
            variant="body1" 
            sx={{ 
              mt: 4,
              mx: 'auto', 
              maxWidth: '700px',
              color: 'text.secondary',
            }}
          >
            {description}
          </Typography>
        </motion.div>
      )}
    </Box>
  );
};

export default SectionTitle;