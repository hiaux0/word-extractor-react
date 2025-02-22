import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./index.css";
import { Provider } from "jotai";
import { PersistanceWrapper } from "./ui/organisms/PersistanceWrapper";
import { SidebarProvider } from "./components/ui/sidebar";
import { ThemeProvider } from "./components/theme-provider";
import { getAppContainer } from "./lib/modules/htmlModules";

createRoot(getAppContainer()!).render(
  <Provider>
    <PersistanceWrapper>
      <ThemeProvider defaultTheme="system" storageKey="word-extractor-theme">
        <SidebarProvider>
          <App root={getAppContainer()} />
        </SidebarProvider>
      </ThemeProvider>
    </PersistanceWrapper>
  </Provider>,
);
