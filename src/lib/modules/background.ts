import { Browser } from "@/domain/types/types";
import { CRUDService } from "../CRUDService";
import { getData, openDatabase, saveData } from "../CommunicationService";

// Usage example

export declare var browser: Browser & typeof globalThis;

browser.contextMenus.create({
  id: "collect-image",
  title: "Add to the collected images 2",
});

browser.browserAction.onClicked.addListener(() => {
  /*prettier-ignore*/ console.log("[background.ts,28] addListener: ", );
  browser.tabs.create({ url: "dist/index.html" });

  openDatabase()
    .then((db) => {
      /*prettier-ignore*/ console.log("[CommunicationService.ts,59] db: ", db);
      //const data = { id: 1, name: "John Doe", preferences: { theme: "dark" } };
      //return saveData(db, data);
    })
    .then(() => openDatabase())
    .then((db) => getData(db))
    .then((data) => {
      console.log("Retrieved data:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  console.log("Extension background script is active.2");
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
