import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import RealtyBoard from './components/RealtyBoard/RealtyBoard';
import AppBar from './components/AppBar/App.Bar';
import UtilitiesBoard from './pages/UtilitiesBoard/UtilitiesBoard';
import useTheme from './modules/hooks/ui/useTheme';
import { actions as realtyActions } from './modules/realty/store';
import { AppDispatch } from './store';
import { actions as utilityActions } from './modules/utilities/store';

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

function App() {
  const dispatch: AppDispatch = useDispatch();

  const { theme, colorMode } = useTheme();

  useEffect(() => {
    dispatch(utilityActions.getAllUtilities());
    dispatch(realtyActions.getAllRealty());
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
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
    </ColorModeContext.Provider>
  );
}

export default App;
