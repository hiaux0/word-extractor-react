import { Browser, IConnection, IMessagePayload } from "@/domain/types/types";
import { ICommunicationService } from "./CommunicationService";
import { backgroundPersistanceService } from "./BackgroundPersistanceService";
import { MESSAGES } from "./common/constants";

export declare var browser: Browser & typeof globalThis;

console.clear();
export class BackgroundCommunicationService implements ICommunicationService {
  private port: IConnection;

  constructor() {
    console.log("[B][ ] Background constructor");
    const connected = (p: IConnection) => {
      this.port = p;
      //this.port.postMessage({
      //  greeting: "[B1 Background] hi there content script!",
      //});
      this.port.onMessage.addListener(async (m: IMessagePayload) => {
        switch (m.action) {
          case MESSAGES["database:read"]: {
            const data = await backgroundPersistanceService.get();
            if (!data) return;
            this.send({ action: MESSAGES["database:read"], payload: data });
            break;
          }
          case MESSAGES["database:sync"]: {
            console.log("[B][ ] Background message, so persist");
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

    try {
      browser.runtime.onConnect.addListener(connected);
    } catch {}
  }

  public initListeners() {
    browser.browserAction.onClicked.addListener(async () => {
      browser.tabs.create({ url: "dist/index.html" });

      const data = await backgroundPersistanceService.get();
      /*prettier-ignore*/ console.log("[B][ ] [BackgroundCommunicationService.ts,41] data: ", data);
    });
  }

  public send<T>(data: IMessagePayload<T>) {
    /*prettier-ignore*/ console.log("[B][ ] Sending message from [B]", data);
    this.port.postMessage(data);
  }
}

export const backgroundCommunicationService =
  new BackgroundCommunicationService();
