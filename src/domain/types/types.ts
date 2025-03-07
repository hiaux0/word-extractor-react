export type AnyObject = Record<PropertyKey, any>;

export interface ISelectItem {
  id: string;
  value: string;
  label: string;
}

export interface IMessagePayload<T = IDatabase> {
  action: string;
  payload?: T;
}

export interface IConnection {
  postMessage: (message: any) => void;
  onMessage: {
    addListener: (callback: (message: any) => void) => void;
  };
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
    connect: (options: { name: string }) => IConnection;
    onConnect: {
      addListener: (callback: (port: IConnection) => void) => void;
    };
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

export interface IDateAndTime {
  created: string;
  modified?: string;
  lastUsed?: string;
}

export type IWordEntry = {
  id: string;
  text: string;
  translation: string;
  comment: string;
  source: string;
  sheets: string[];
} & IDateAndTime;

export const defaultWordEntry: IWordEntry = {
  id: "",
  created: "",
  text: "",
  translation: "",
  comment: "",
  source: "",
  sheets: [],
};

export type ISheet = {
  id: string;
  name: string;
} & IDateAndTime;

export const defaultSheet: ISheet = {
  created: new Date().toISOString(),
  id: "",
  name: "",
};

export interface IDatabase {
  sheetsMap?: Record<string, IWordEntry[]>;
  words: IWordEntry[];
  sheets: ISheet[];
  selectedSheet: ISheet;
}
