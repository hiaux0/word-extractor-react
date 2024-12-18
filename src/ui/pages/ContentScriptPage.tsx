import {
  ComponentProps,
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { CardWithForm } from "../organisms/CardWithForm";
import { CustomCard } from "../organisms/CustomCard";

interface ContentScriptPageProps extends ComponentProps<any> {}

//interface IWordData {
//    text: language;
//    word: string;
//    context: string;
//    comment: string;
//}

const CONSTANTS = {
  localStorageKey: "wordExtractor",
  tableContainerId: "wordExtractorContainer",
};
const adjust = 16;

document.addEventListener("DOMContentLoaded", () => {
  console.log("hi");
});

/**
 * @returns {string[]}
 */
function getLocalStorage() {
  const asString = window.localStorage.getItem(CONSTANTS.localStorageKey);
  if (!asString) return;
  const result = JSON.parse(asString);
  return result;
}

/**
 * @param {string[]} value
 */
function saveToLocalStorage(value: any) {
  const asString = JSON.stringify(value);
  window.localStorage.setItem(CONSTANTS.localStorageKey, asString);
}

function getTextRect(textNode: Text) {
  var range = document.createRange();
  range.selectNode(textNode);
  var rect = range.getBoundingClientRect();
  range.detach(); // frees up memory in older browsers
  return rect;
}

function createDiv(startX: number, startY: number) {
  const div = getTableContainer();
  div.style.width = "200px";
  div.style.height = "200px";
  div.style.backgroundColor = "red";
  div.style.position = "absolute";
  div.style.left = `${startX + adjust}px`;
  div.style.top = `${startY + adjust}px`;

  const $input = document.createElement("input");
  div.appendChild($input);
  // const $input2 = document.createElement("input");
  // div.appendChild($input2);
  $input.autofocus = true;

  return div;
}

function getTableContainer() {
  const table = document.getElementById(CONSTANTS.tableContainerId);
  if (!table) {
    const div = document.createElement("div");
    div.id = CONSTANTS.tableContainerId;
    return div;
  }
  return table;
}

function removeTable() {
  const table = document.getElementById(CONSTANTS.tableContainerId);
  if (table) {
    table.remove();
  }
}

document.addEventListener("keydown", (event) => {
  const key = event.key;
  switch (key) {
    case "c": {
      console.clear();
      break;
    }
    case "r":
      removeTable();
      console.log("reset");
      break;
    case "Enter":
      console.log("save");
      break;
    default:
      console.log("other key is pressed");
  }
});

function getTextFromSelection() {
  const selection = window.getSelection();
  if (!selection) return;
  const range = selection.getRangeAt(0);
  /*prettier-ignore*/ console.log("[content_script.js,71] range: ", range);
  const text = range.toString();
  return text;
}

const adjustY = 16;

export const ContentScriptPage: FC<ContentScriptPageProps> = ({ style }) => {
  const [rectCoords, setRectCoords] = useState({ x: -1, y: -1 });
  const mouseDownCoords = useRef({ x: -1, y: -1 });

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      mouseDownCoords.current = { x: event.clientX, y: event.clientY };
      setRectCoords({ x: -1, y: -1 });
    };

    const handleMouseUp = (event: MouseEvent) => {
      /*prettier-ignore*/ console.log("[ContentScriptPage.tsx,133] event: ", event);
      let { x, y } = mouseDownCoords.current;
      const sameX = x === event.clientX;
      const sameY = y === event.clientY;
      if (sameX && sameY) {
        setRectCoords({ x: -1, y: -1 });
        return;
      }

      const ax = Math.max(x, event.clientX);
      const maxY = Math.max(y, event.clientY);
      const ay = maxY + adjustY;
      setRectCoords({
        x: ax,
        y: ay,
      });
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const hide = rectCoords.x === -1 && rectCoords.y === -1;

  return (
    <div
      style={{
        position: "absolute",
        top: rectCoords.y,
        left: rectCoords.x,
        display: hide ? "none" : "block",
        backgroundColor: "white",
        ...style,
      }}
    >
      <CardWithForm />
      <div>
        Mouse Coordinates: x: {rectCoords.x}, y: {rectCoords.y}
      </div>
    </div>
  );
};
