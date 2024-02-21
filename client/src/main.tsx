import "./index.css";
import React from "react";
import App from "./App.tsx";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { store } from "./state/store.ts";
import { persistStore } from "redux-persist";
import { setupListeners } from "@reduxjs/toolkit/query";
import { PersistGate } from "redux-persist/integration/react";


setupListeners(store.dispatch);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
