import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserActionApp } from "./BrowserActionApp";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserActionApp />
  </StrictMode>,
);
