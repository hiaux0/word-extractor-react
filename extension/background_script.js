// Put all the javascript code here, that you want to execute in background.

console.log("Extension background script is active.");


browser.contextMenus.create({
  id: "collect-image",
  title: "Add to the collected images",
});
