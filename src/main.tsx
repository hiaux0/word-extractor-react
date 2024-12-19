import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./index.css";
import { Provider } from "jotai";

const root = document.getElementById("root");
createRoot(root!).render(
  <Provider>
    <App root={root} />
  </Provider>,
);
