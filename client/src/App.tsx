// import { useMemo } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import LoginPage from "./scenes/login/index";
import Layout from "./scenes/layout";
import Balance from "./scenes/Finances/balance";
import Transactions from "./scenes/Finances/transactions";
import Overview from "./scenes/estates/overview";
import Operations from "./scenes/estates/operations";
import Mortgages from "./scenes/estates/mortgages";
import Performance from "./scenes/estates/performance";
import Dashboard from "./scenes/Finances/dashboard";

function App() {
  const theme = createTheme(themeSettings("dark"));

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
