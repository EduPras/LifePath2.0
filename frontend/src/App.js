import React from 'react';
import Routes from './routes';
import { ThemeProvider } from '@material-ui/core/styles'
import './global.css'
import theme from './theme/provider';

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Routes/>]
      </ThemeProvider>
    </>
  );
}

export default App;