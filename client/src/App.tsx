import { useMemo } from "react";
// import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
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


function App() {
  const mode = "dark";
  // const mode = useSelector((state) => state.mode);
  // const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  // const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route element={<Layout />}>
              <Route path="/home" element={<Home />} />
              <Route path="/balance" element={<Balance />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/operations" element={<Operations />} />
              <Route path="/mortgages" element={<Mortgages />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
