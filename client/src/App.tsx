import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import RealtyBoard from './components/RealtyBoard/RealtyBoard';
import AppBar from './components/AppBar/App.Bar';
import UtilitiesBoard from './components/UtilitiesBoard/UtilitiesBoard';

function App() {
  const defaultTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <BrowserRouter>
          <AppBar>
            <Routes>
              <Route path='/' element={<div>nnn</div>}></Route>
              <Route path='/realty' element={<RealtyBoard />}></Route>
              <Route path='/utilities' element={<UtilitiesBoard />}></Route>
            </Routes>
          </AppBar>
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
}

export default App;
