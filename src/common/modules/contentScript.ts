import { showPopup } from "../../ui/organisms/WordExtractorInput";
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

