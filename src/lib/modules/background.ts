import { Browser } from "@/domain/types/types";
import { CRUDService } from "../CRUDService";

console.log("Extension background script is active.2");

export declare var browser: Browser & typeof globalThis;

browser.contextMenus.create({
  id: "collect-image",
  title: "Add to the collected images 2",
});

browser.browserAction.onClicked.addListener(() => {
  /*prettier-ignore*/ console.log("[background.ts,28] addListener: ", );
  browser.tabs.create({ url: "dist/index.html" });
});

const sharedDatabase = new CRUDService();
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.action) {
    case "create":
      sharedDatabase.create(message.entry);
      sendResponse({ success: true });
      break;
    case "read":
      const entries = sharedDatabase.readAll();
      sendResponse({ success: true, entries });
      break;
    case "update":
      sharedDatabase.update(message.entry);
      sendResponse({ success: true });
      break;
    case "delete":
      sharedDatabase.delete(message.entryId);
      sendResponse({ success: true });
      break;
    default:
      sendResponse({ error: "Unknown action" });
  }
});
