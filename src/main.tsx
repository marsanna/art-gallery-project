import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import GalleryContextProvider from "./context/UseGalleryContext";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <GalleryContextProvider>
        <App />
      </GalleryContextProvider>
    </BrowserRouter>
  </StrictMode>,
);
