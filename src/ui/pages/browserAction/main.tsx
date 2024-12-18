import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserActionApp } from "./BrowserActionApp";

const root = document.getElementById("root");
createRoot(root!).render(
  <StrictMode>
    <BrowserActionApp root={root} />
  </StrictMode>,
);
