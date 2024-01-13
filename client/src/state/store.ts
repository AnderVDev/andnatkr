import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { api } from "./api.ts";
import globalReducer from "./index.ts";
import storage from "redux-persist/lib/storage";
import authReducer from "./";
import { pageSlice } from "./pages/index.ts";


// export const store = configureStore({
//   reducer: {},
// });
const persistConfig = { key: "root", storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    page: pageSlice.reducer,
    persisted: persistedReducer,
    global: globalReducer,
    [api.reducerPath]: api.reducer,
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
