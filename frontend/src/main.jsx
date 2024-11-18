import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import Store from "./store/Store.js";
import persistStore from "redux-persist/es/persistStore";
import { PersistGate } from "redux-persist/integration/react";
import { NewsProvider } from "./components/newsContext/NewsContext.jsx";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

if (import.meta.env.VITE_MODE === "production") {
  disableReactDevTools();
}
const persistor = persistStore(Store);
createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider store={Store}>
    <PersistGate persistor={persistor}>
      <NewsProvider>
        <App />
      </NewsProvider>
    </PersistGate>
  </Provider>
  // {/* </StrictMode> */}
);
