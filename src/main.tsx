import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./index.css";
import { Provider } from "jotai";
import { PersistanceWrapper } from "./ui/organisms/PersistanceWrapper";

const root = document.getElementById("root");
createRoot(root!).render(
  <Provider>
    <PersistanceWrapper>
      <App root={root} />
    </PersistanceWrapper>
  </Provider>,
);
