import React from 'react'
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import useScrollTrigger from '@mui/material/useScrollTrigger';

const ScrollTop = ({ children, window }) => {
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
      });
    
    const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
        '#back-to-top-anchor',
    );

    if (anchor) {
        anchor.scrollIntoView({
        block: 'center',
        });
    }
    };

    return (
        <Fade in={trigger}>
          <Box
            onClick={handleClick}
            role="presentation"
            sx={{ position: 'fixed', bottom: 16, right: 16 }}
          >
            {children}
          </Box>
        </Fade>
      );
}

export default ScrollTop
