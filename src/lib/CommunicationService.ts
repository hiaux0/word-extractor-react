import { Browser, IConnection } from "@/domain/types/types";

export declare var browser: Browser & typeof globalThis;

interface IMessagePayload {
  action: string;
  payload: any;
}

interface ICommunicationService {
  initListeners: () => void;
  send: (data: IMessagePayload) => void;
}

export class ContentScriptCommunicationService
  implements ICommunicationService
{
  private port: IConnection;

  constructor(key?: string) {
    let myPort = browser.runtime.connect({ name: "port-from-cs" });
    this.port = myPort;
  }

  public initListeners() {
    this.port.postMessage({
      greeting: "[A1 Content] hello from content script",
    });

    this.port.onMessage.addListener((m) => {
      console.log(
        "[A2 Content] In content script, received message from background script: ",
      );
      console.log("  ", m.greeting);
    });

    document.body.addEventListener("click", () => {
      this.port.postMessage({
        greeting: "[A3 Content] they clicked the page!",
      });
    });
  }

  public send(data: IMessagePayload) {
    /*prettier-ignore*/ console.log("[CommunicationService.ts,46] this.port: ", this.port);
    this.port.postMessage(data);
  }
}

export class BackgroundCommunicationService implements ICommunicationService {
  private port: IConnection;

  constructor() {
    const connected = (p: IConnection) => {
      this.port = p;
      this.port.postMessage({
        greeting: "[B1 Background] hi there content script!",
      });
      this.port.onMessage.addListener((m) => {
        this.port.postMessage({
          greeting: `[B2 Background] In background script, received message from content script: \n      ${m.greeting}`,
        });
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

export const contentScriptCommunicationService =
  new ContentScriptCommunicationService();
export const backgroundCommunicationService =
  new BackgroundCommunicationService();
