console.log("Extension background script is active.1");

browser.contextMenus.create({
  id: "collect-image",
  title: "Add to the collected images 1",
});

browser.browserAction.onClicked.addListener(() => {
  browser.tabs.create({ url: "/navigate-collection.html" });
});
