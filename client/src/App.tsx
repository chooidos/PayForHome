import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';

import { actions } from './modules/realty/store';
import RealtyBoard from './components/RealtyBoard/RealtyBoard';
import AppBar from './components/AppBar/App.Bar';
import { RootState } from './store';

function App() {
  const defaultTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();

  useEffect(() => {
    dispatch(actions.getAllRealty());
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
