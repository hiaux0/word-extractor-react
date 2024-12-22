import { Browser, IConnection, IMessagePayload } from "@/domain/types/types";
import { ICommunicationService } from "./CommunicationService";
import { browserMessageStorageService } from "./BrowserMessageStorageService";

export declare var browser: Browser & typeof globalThis;

export class BackgroundCommunicationService implements ICommunicationService {
  private port: IConnection;

  constructor() {
    const connected = (p: IConnection) => {
      this.port = p;
      //this.port.postMessage({
      //  greeting: "[B1 Background] hi there content script!",
      //});
      this.port.onMessage.addListener((m: IMessagePayload) => {
        /*prettier-ignore*/ console.log("[CommunicationService.ts,61] m: ", m);
        switch (m.action) {
          case "database:sync": {
            browserMessageStorageService.set(m.payload);
            break;
          }
          default: {
            console.error("No known action: ", m.action);
          }
        }
        //this.port.postMessage({
        //  greeting: `[B2 Background] In background script, received message from content script: \n      ${m.greeting??m.action}`,
        //});
      });
    };

    browser.runtime.onConnect.addListener(connected);
  }

  public initListeners() {
    browser.browserAction.onClicked.addListener(() => {
      this.port.postMessage({
        greeting: "[B3 Background] they clicked the button!",
      });
    });
  }

  public send(data: IMessagePayload) {
    this.port.postMessage(data);
  }
}

export const backgroundCommunicationService =
  new BackgroundCommunicationService();
