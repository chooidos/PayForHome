import { PaletteMode, createTheme } from '@mui/material';
import { useMemo, useState } from 'react';

const useTheme = () => {
  const storageMode = localStorage.getItem('theme');
  const initialMode =
    storageMode === 'light' || storageMode === 'dark' ? storageMode : 'light';
  const [mode, setMode] = useState<PaletteMode>(initialMode);
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === 'light' ? 'dark' : 'light';
          localStorage.setItem('theme', newMode);
          return newMode;
        });
      },
    }),
    [],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );
  return {
    colorMode,
    theme,
  };
};

export default useTheme;
