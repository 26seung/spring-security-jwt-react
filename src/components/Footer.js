import { Box, Container, CssBaseline, Typography } from '@mui/material';
import React from 'react';

const Footer = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <CssBaseline />
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) => theme.palette.grey[800],
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body1" color={'white'}>
            <div
              class="copy"
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                height: '100%',
              }}
            >
              <p
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  fontSize: '13px',
                  paddingTop: '2px',
                }}
              >
                © 2023 ** Programing from Euseung
              </p>
            </div>
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
