import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./index.css";
import { Provider } from "jotai";
import { PersistanceWrapper } from "./ui/organisms/PersistanceWrapper";

createRoot(document.getElementById("root")!).render(
  <Provider>
    <PersistanceWrapper>
      <App root={document.getElementById("root")} />
    </PersistanceWrapper>
  </Provider>,
);
