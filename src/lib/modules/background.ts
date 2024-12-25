import { Browser } from "@/domain/types/types";
import { backgroundCommunicationService } from "../BackgroundCommunicationService";

// Usage example

console.log("[B][ ] 0. Extension background script is active.");

export declare var browser: Browser & typeof globalThis;

backgroundCommunicationService.initListeners();

browser.contextMenus.create({
  id: "collect-image",
  title: "Add to the collected images 2",
});

self.addEventListener('install', (event) => {
  console.log('Service Worker installing.');
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activating.');
});

self.addEventListener('fetch', (event) => {
  console.log('Service Worker fetching.', event.request.url);
});
