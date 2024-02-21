import { useMemo } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import LoginPage from "./scenes/login/index";
import Home from "./scenes/home/index";
import Layout from "./scenes/layout";
import Balance from "./scenes/balance";
import Transactions from "./scenes/transactions";
import Overview from "./scenes/overview";
import Operations from "./scenes/operations";
import Mortgages from "./scenes/mortgages";
import Performance from "./scenes/performance";
import Dashboard from "./scenes/dashboard";


function App() {
  const mode = "dark";
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/home" element={<Home />} />
              <Route path="/balance" element={<Balance />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/operations" element={<Operations />} />
              <Route path="/mortgages" element={<Mortgages />} />
              <Route path="/performance" element={<Performance />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
