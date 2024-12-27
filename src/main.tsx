import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./index.css";
import { Provider } from "jotai";
import { PersistanceWrapper } from "./ui/organisms/PersistanceWrapper";
import { SidebarProvider } from "./components/ui/sidebar";
import { ThemeProvider } from "./components/theme-provider";

createRoot(document.getElementById("word-extractor-app")!).render(
  <Provider>
    <PersistanceWrapper>
      <ThemeProvider defaultTheme="light" storageKey="word-extractor-theme">
        <SidebarProvider>
          <App root={document.getElementById("word-extractor-app")} />
        </SidebarProvider>
      </ThemeProvider>
    </PersistanceWrapper>
  </Provider>,
);
