import "@/lib/modules/polyfill";
import { Browser } from "@/domain/types/types";
import { backgroundCommunicationService } from "../BackgroundCommunicationService";

// Usage example

console.log("[B][ ] 0. Extension background script is active.");

declare let browser: Browser & typeof globalThis;

backgroundCommunicationService.initListeners();

//browser.contextMenus.create({
//  id: "collect-image",
//  title: "Add to the collected images 2",
//});
