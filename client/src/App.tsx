import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RealtyForm from "./components/RealtyForm/RealtyForm";

function App() {
  const defaultTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<Eee />}>
    //     </Route>
    //   </Routes>
    // </BrowserRouter >
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <RealtyForm />
      </Box>
    </ThemeProvider>
  );
}

export default App;
