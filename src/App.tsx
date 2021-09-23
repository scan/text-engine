import React, { FunctionComponent } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';

const App: FunctionComponent = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            to="/"
            component={RouterLink}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Icon>home</Icon>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Text-Engine
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Typography variant="h1">Hello World</Typography>
      </Container>
    </>
  );
};

export default App;
