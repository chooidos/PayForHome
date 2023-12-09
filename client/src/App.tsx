import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createContext } from 'react';

import RealtyBoard from './components/RealtyBoard/RealtyBoard';
import AppBar from './components/AppBar/App.Bar';
import UtilitiesBoard from './pages/UtilitiesBoard/UtilitiesBoard';
import useTheme from './modules/hooks/ui/useTheme';

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

function App() {
  const { theme, colorMode } = useTheme();
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
