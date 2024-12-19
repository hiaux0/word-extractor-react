console.log("Extension background script is active.");

declare global {
  interface Browser {
    contextMenus: {
      create: (options: any) => void;
    };
  }
}

// @ts-ignore
let browser = browser as Browser;

browser.contextMenus.create({
  id: "collect-image",
  title: "Add to the collected images",
});
