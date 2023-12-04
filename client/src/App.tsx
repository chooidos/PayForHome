import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { actions } from './modules/realty/store';
import RealtyBoard from './components/RealtyBoard/RealtyBoard';
import AppBar from './components/AppBar/App.Bar';

function App() {
  const defaultTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getAllRealty() as any);
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <BrowserRouter>
          <AppBar>
            <Routes>
              <Route path='/' element={<div>nnn</div>}></Route>
              <Route path='/realty' element={<RealtyBoard />}></Route>
              <Route path='/utilities' element={<RealtyBoard />}></Route>
            </Routes>
          </AppBar>
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
}

export default App;
