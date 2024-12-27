// const browser = require("../../extension/webextension-polyfill/dist/browser-polyfill.min.js");
// const browser = require("browser-polyfill.min.js");
import "@/lib/modules/polyfill"
import { Browser, IConnection, IMessagePayload } from "@/domain/types/types";
import { MESSAGES } from "./common/constants";
// import * as browser from "../../extension/webextension-polyfill/dist/browser-polyfill.min.js";
// @ts-ignore

// var browser = require("../../extension/webextension-polyfill/dist/browser-polyfill.min");
// /*prettier-ignore*/ console.log("[CommunicationService.ts,8] browser: ", browser);

// export declare var browser: Browser & typeof globalThis;
// declare var chrome: Browser & typeof globalThis;
const chrome: Browser & typeof globalThis = browser;

// Add polyfill for Chrome compatibility
//if (
//  typeof browser === "undefined" ||
//  Object.getPrototypeOf(browser) !== Object.prototype
//) {
//  var browser = require("webextension-polyfill");
//}

export interface ICommunicationService {
  initListeners: () => void;
  send: (data: IMessagePayload) => void;
}

class ContentScriptCommunicationService implements ICommunicationService {
  private port: IConnection;

  constructor(key?: string) {
    try {
      const myPort = chrome.runtime.connect({ name: "port-from-cs" });
      /*prettier-ignore*/ console.log("0. [CommunicationService.ts,17] myPort: ", myPort);
      this.port = myPort;
    } catch (error) {
      /*prettier-ignore*/ console.error("[CommunicationService.ts,21] error: ", error);
    }
  }

  public initListeners() {
    if (!this.port) return;
    this.port.onMessage.addListener((m: IMessagePayload) => {
      switch (m.action) {
        case MESSAGES["database:read"]: {
          const database = m.payload;
          /*prettier-ignore*/ console.log(">>>>> [CommunicationService.ts,27] database: ", database);
          break;
        }
        case MESSAGES["database:create"]: {
          console.log("[ ][C] Background message, so persist");
          /*prettier-ignore*/ console.log("[CommunicationService.ts,29] m: ", m);
          // TODO: create database
          break;
        }
        default: {
          /*prettier-ignore*/ console.log("[BackgroundCommunicationService.ts,26] m: ", m);
          console.error("No known action: ", m.action);
        }
      }
    });

    document.body.addEventListener("click", () => {
      //this.port.postMessage({
      //  greeting: "[A3 Content] they clicked the page!",
      //});
    });
  }

  public send(data: IMessagePayload) {
    if (!this.port) return;
    /*prettier-ignore*/ console.log("[ ][C] Sending message from [CS]", data);
    this.port.postMessage(data);
    // this.port.postMessage(JSON.stringify(data));
  }

  public on(
    message: keyof typeof MESSAGES,
    callback: (data: IMessagePayload) => void,
  ) {
    if (!this.port) return;
    this.port.onMessage.addListener((m: IMessagePayload) => {
      if (m.action === message) callback(m);
    });
  }
}

export const contentScriptCommunicationService =
  new ContentScriptCommunicationService();
