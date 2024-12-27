import { Browser } from "@/domain/types/types";

console.log("[ ][C] 0. Extension content script is active.");

if (!document.getElementById("word-extractor-app")) {
  document.body.id = "word-extractor-app-body"
  const container = document.createElement("div");
  container.id = "word-extractor-app";
  container.dataset.isContent = "true";
  container.style.position = "absolute";
  container.style.top = "0";
  container.style.left = "0";
  //container.style.width = "100%";
  //container.style.height = "100px";
  //container.style.border = "1px solid red";

  document.body.appendChild(container);
}

export declare var browser: Browser & typeof globalThis;
