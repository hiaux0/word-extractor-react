import { Browser, IConnection, IMessagePayload } from "@/domain/types/types";
import { MESSAGES } from "./common/constants";

export declare var browser: Browser & typeof globalThis;

export interface ICommunicationService {
  initListeners: () => void;
  send: (data: IMessagePayload) => void;
}

class ContentScriptCommunicationService implements ICommunicationService {
  private port: IConnection;

  constructor(key?: string) {
    try {
      let myPort = browser.runtime.connect({ name: "port-from-cs" });
      this.port = myPort;
    } catch {}
  }

  public initListeners() {
    //this.port.postMessage({
    //  greeting: "[A1 Content] hello from content script",
    //});
    if (!this.port) return;
    this.port.onMessage.addListener((m) => {
      switch (m.action) {
        case MESSAGES["database:create"]: {
          console.log("[ ][C] Background message, so persist");
          /*prettier-ignore*/ console.log("[CommunicationService.ts,29] m: ", m);
          break;
        }
        default: {
          /*prettier-ignore*/ console.log("[BackgroundCommunicationService.ts,26] m: ", m);
          console.error("No known action: ", m.action);
        }
      }
      //console.log(
      //  "[A2 Content] In content script, received message from background script: ",
      //);
      //console.log("  ", m.greeting);
    });

    document.body.addEventListener("click", () => {
      //this.port.postMessage({
      //  greeting: "[A3 Content] they clicked the page!",
      //});
    });
  }

  public send(data: IMessagePayload) {
    /*prettier-ignore*/ console.log("[ ][C] Sending message from [CS]", data);
    this.port.postMessage(data);
    // this.port.postMessage(JSON.stringify(data));
  }
}

export const contentScriptCommunicationService =
  new ContentScriptCommunicationService();
