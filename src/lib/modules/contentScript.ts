import { Browser } from "@/domain/types/types";
console.log(">>>>>>>>>>>>>>>>>>>> content-script.ts");

const $root = document.getElementById("root");
if (!$root) {
  const container = document.createElement("div");
  container.id = "root";
  container.dataset.isContent = "true";
  container.style.position = "absolute";
  container.style.top = "0";
  container.style.left = "0";
  //container.style.width = "100%";
  //container.style.height = "100px";
  //container.style.border = "1px solid red";

  document.body.appendChild(container);
}

console.log("Extension content script is active.");
export declare var browser: Browser & typeof globalThis;

function sendMessageToBackgroundScript(message: any) {
  return new Promise((resolve, reject) => {
    browser.runtime.sendMessage(message, (response) => {
      if (response && response.error) {
        reject(response.error);
      } else {
        resolve(response);
      }
    });
  });
}

export async function createEntry(entry: any) {
  const message = { action: "create", entry };
  return await sendMessageToBackgroundScript(message);
}

export async function readEntries() {
  const message = { action: "read" };
  return await sendMessageToBackgroundScript(message);
}

export async function updateEntry(entry: any) {
  const message = { action: "update", entry };
  return await sendMessageToBackgroundScript(message);
}

export async function deleteEntry(entryId: string) {
  const message = { action: "delete", entryId };
  return await sendMessageToBackgroundScript(message);
}
