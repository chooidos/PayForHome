import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { actions } from './modules/realty/store';
import RealtyBoard from './components/RealtyBoard/RealtyBoard';

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
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<Eee />}>
    //     </Route>
    //   </Routes>
    // </BrowserRouter >
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <RealtyBoard />
    </ThemeProvider>
  );
}

export default App;
