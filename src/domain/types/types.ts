export type AnyObject = Record<PropertyKey, any>;

export interface ISelectItem {
  value: string;
  label: string;
}

export interface Browser {
  browserAction: {
    onClicked: {
      addListener: (callback: () => void) => void;
    };
    // [ "onClicked", "setTitle", "getTitle", "getUserSettings", "setIcon", "setPopup", "getPopup", "setBadgeText", "getBadgeText", "setBadgeBackgroundColor", "getBadgeBackgroundColor", "setBadgeTextColor", "getBadgeTextColor", "enable", "disable", "isEnabled", "openPopup", "Details", "ColorArray", "ImageDataType", "ColorValue", "OnClickData"]
  };
  contextMenus: {
    create: (options: any) => void;
  };
  runtime: {
    onMessage: {
      addListener: (
        callback: (
          message: any,
          sender: any,
          sendResponse: (response: any) => void,
        ) => void,
      ) => void;
    };
    sendMessage: (message: any, callback: (response: any) => void) => void;
  };
  tabs: {
    create: (options: { url: string }) => void;
  };
  // [ "manifest", "events", "types", "bookmarks", "browsingData", "captivePortal", "commands", "devtools", "find", "history", "identity", "contextMenus", "menus", "omnibox", "pageAction", "pkcs11", "geckoProfiler", "search", "sessions", "sidebarAction", "topSites", "tabs", "windows", "extensionTypes", "browserSettings", "clipboard", "alarms", "contextualIdentities", "contentScripts", "dns", "cookies", "declarativeNetRequest", "activityLog", "downloads", "idle", "management", "networkStatus", "notifications", "permissions", "privacy", "proxy", "scripting", "telemetry", "theme", "userScripts", "webNavigation", "experiments", "webRequest", "normandyAddonStudy", "i18n", "extension", "runtime", "test", "storage", "menusInternal", "pictureInPictureChild", "aboutConfigPrefs", "browserAction" ]
}
