import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./index.css";
import { Provider } from "jotai";
import { PersistanceWrapper } from "./ui/organisms/PersistanceWrapper";
import { SidebarProvider } from "./components/ui/sidebar";

localStorage.removeItem('[WE]storage-local')

createRoot(document.getElementById("root")!).render(
  <Provider>
    <PersistanceWrapper>
      <SidebarProvider open>
        <App root={document.getElementById("root")} />
      </SidebarProvider>
    </PersistanceWrapper>
  </Provider>,
);
