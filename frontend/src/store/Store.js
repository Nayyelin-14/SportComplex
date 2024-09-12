import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import UserReducer from "./userSlice";
import { persistReducer } from "redux-persist";
import loaderReducer from "./loaderSlice";
const persistConfig = {
  key: "root",
  version: 1,
  storage: storage,
};

const combined_Reducer = combineReducers({
  user: UserReducer,
  loader: loaderReducer,
});

const persist_Reducer = persistReducer(persistConfig, combined_Reducer);

const Store = configureStore({
  reducer: persist_Reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default Store;
