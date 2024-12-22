import { Browser, IConnection, IMessagePayload } from "@/domain/types/types";
import { ICommunicationService } from "./CommunicationService";
import { backgroundPersistanceService } from "./BackgroundPersistanceService";

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
        switch (m.action) {
          case "database:sync": {
            backgroundPersistanceService.set(m.payload);
            break;
          }
          default: {
            /*prettier-ignore*/ console.log("[BackgroundCommunicationService.ts,26] m: ", m);
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
    browser.browserAction.onClicked.addListener(async () => {
      browser.tabs.create({ url: "dist/index.html" });

      const data = await backgroundPersistanceService.get();
      /*prettier-ignore*/ console.log("[BackgroundCommunicationService.ts,41] data: ", data);
    });
  }

  public send(data: IMessagePayload) {
    this.port.postMessage(data);
  }
}

export const backgroundCommunicationService =
  new BackgroundCommunicationService();
