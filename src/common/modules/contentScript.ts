import { showPopup } from "../../ui/organisms/WordExtractorInput";
console.log(">>>>>>>>>>>>>>>>>>>> content-script.ts");

const container = document.createElement("div");
container.id = "root";
container.dataset.isContent = "true";
container.style.width = "100%";
container.style.height = "100px";
container.style.border = "1px solid red";

document.body.appendChild(container);

//// Put all the javascript code here, that you want to execute after page load.
//
//console.log("hiii");
//
////interface IWordData {
////    text: language;
////    word: string;
////    context: string;
////    comment: string;
////}
//
//const CONSTANTS = {
//  localStorageKey: "wordExtractor",
//  tableContainerId: "wordExtractorContainer",
//};
//const adjust = 16;
//
//document.addEventListener("DOMContentLoaded", () => {
//  console.log("hi");
//});
//
///**
// * @returns {string[]}
// */
//function getLocalStorage() {
//  const asString = window.localStorage.getItem(CONSTANTS.localStorageKey);
//  if (!asString) return;
//  const result = JSON.parse(asString);
//  return result;
//}
//
///**
// * @param {string[]} value
// */
//function saveToLocalStorage(value: any) {
//  const asString = JSON.stringify(value);
//  window.localStorage.setItem(CONSTANTS.localStorageKey, asString);
//}
//
//function getTextRect(textNode: Text) {
//  var range = document.createRange();
//  range.selectNode(textNode);
//  var rect = range.getBoundingClientRect();
//  range.detach(); // frees up memory in older browsers
//  return rect;
//}
//
//function createDiv(startX: number, startY: number) {
//  const div = getTableContainer();
//  div.style.width = "200px";
//  div.style.height = "200px";
//  div.style.backgroundColor = "red";
//  div.style.position = "absolute";
//  div.style.left = `${startX + adjust}px`;
//  div.style.top = `${startY + adjust}px`;
//
//  const $input = document.createElement("input");
//  div.appendChild($input);
//  // const $input2 = document.createElement("input");
//  // div.appendChild($input2);
//  $input.autofocus = true;
//
//  return div;
//}
//
//function getTableContainer() {
//  const table = document.getElementById(CONSTANTS.tableContainerId);
//  if (!table) {
//    const div = document.createElement("div");
//    div.id = CONSTANTS.tableContainerId;
//    return div;
//  }
//  return table;
//}
//
//function removeTable() {
//  const table = document.getElementById(CONSTANTS.tableContainerId);
//  if (table) {
//    table.remove();
//  }
//}
//
//document.addEventListener("keydown", (event) => {
//  const key = event.key;
//  switch (key) {
//    case "c": {
//      console.clear();
//      break;
//    }
//    case "r":
//      removeTable();
//      console.log("reset");
//      break;
//    case "Enter":
//      console.log("save");
//      break;
//    default:
//      console.log("other key is pressed");
//  }
//});
//
//function getTextFromSelection() {
//  const selection = window.getSelection();
//  if (!selection) return;
//  const range = selection.getRangeAt(0);
//  /*prettier-ignore*/ console.log("[content_script.js,71] range: ", range);
//  const text = range.toString();
//  return text;
//}
//
//document.addEventListener("dblclick", (event) => {
//  console.clear();
//  /*prettier-ignore*/ console.log("[content_script.js,112] dblclick: ", );
//  /*prettier-ignore*/ console.log("[content_script.js,69] event: ", event);
//  const text = getTextFromSelection();
//  /*prettier-ignore*/ console.log("[content_script.js,85] text: ", text);
//
//  // 2. create a div box 200x200 whose left top corner starts at the end of the selection
//  const div = createDiv(event.layerX - 50, event.layerY);
//  document.body.appendChild(div);
//  // 3. append the div to the body
//  // showPopup(text);
//
//  //
//});
