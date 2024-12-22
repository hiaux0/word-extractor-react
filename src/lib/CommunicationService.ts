import { Browser, IConnection, IMessagePayload } from "@/domain/types/types";

export declare var browser: Browser & typeof globalThis;

export interface ICommunicationService {
  initListeners: () => void;
  send: (data: IMessagePayload) => void;
}

class ContentScriptCommunicationService implements ICommunicationService {
  private port: IConnection;

  constructor(key?: string) {
    let myPort = browser.runtime.connect({ name: "port-from-cs" });
    this.port = myPort;
  }

  public initListeners() {
    //this.port.postMessage({
    //  greeting: "[A1 Content] hello from content script",
    //});

    this.port.onMessage.addListener((m) => {
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
