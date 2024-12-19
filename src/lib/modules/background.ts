console.log("Extension background script is active.2");

declare var browser: Browser & typeof globalThis;
interface Browser {
  browserAction: {
    onClicked: {
      addListener: (callback: () => void) => void;
    };
    // [ "onClicked", "setTitle", "getTitle", "getUserSettings", "setIcon", "setPopup", "getPopup", "setBadgeText", "getBadgeText", "setBadgeBackgroundColor", "getBadgeBackgroundColor", "setBadgeTextColor", "getBadgeTextColor", "enable", "disable", "isEnabled", "openPopup", "Details", "ColorArray", "ImageDataType", "ColorValue", "OnClickData"]
  };
  contextMenus: {
    create: (options: any) => void;
  };
  tabs: {
    create: (options: { url: string }) => void;
  };
  // [ "manifest", "events", "types", "bookmarks", "browsingData", "captivePortal", "commands", "devtools", "find", "history", "identity", "contextMenus", "menus", "omnibox", "pageAction", "pkcs11", "geckoProfiler", "search", "sessions", "sidebarAction", "topSites", "tabs", "windows", "extensionTypes", "browserSettings", "clipboard", "alarms", "contextualIdentities", "contentScripts", "dns", "cookies", "declarativeNetRequest", "activityLog", "downloads", "idle", "management", "networkStatus", "notifications", "permissions", "privacy", "proxy", "scripting", "telemetry", "theme", "userScripts", "webNavigation", "experiments", "webRequest", "normandyAddonStudy", "i18n", "extension", "runtime", "test", "storage", "menusInternal", "pictureInPictureChild", "aboutConfigPrefs", "browserAction" ]
}

browser.contextMenus.create({
  id: "collect-image",
  title: "Add to the collected images 2",
});

browser.browserAction.onClicked.addListener(() => {
  /*prettier-ignore*/ console.log("[background.ts,28] addListener: ", );
  browser.tabs.create({ url: "dist/index.html" });
});
