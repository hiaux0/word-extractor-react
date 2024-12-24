import {
  ComponentProps,
  FC,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AddTranslationCard } from "../organisms/AddTranslationCard";

interface ContentScriptPageProps extends ComponentProps<any> {}

const CONSTANTS = {
  localStorageKey: "wordExtractor",
  tableContainerId: "wordExtractorContainer",
};
const adjust = 16;

//document.addEventListener("DOMContentLoaded", () => {
//  console.log("DOMContentLoaded");
//});

function getTextRect(textNode: Text) {
  var range = document.createRange();
  range.selectNode(textNode);
  var rect = range.getBoundingClientRect();
  range.detach(); // frees up memory in older browsers
  return rect;
}

document.addEventListener("keydown", (event) => {
  const key = event.key;
  switch (key) {
    case "c": {
      console.clear();
      break;
    }
    default:
    // console.log("other key is pressed");
  }
});

const adjustY = 16;

export const ContentScriptPage: FC<ContentScriptPageProps> = ({ style }) => {
  const [rectCoords, setRectCoords] = useState({ x: -1, y: -1 });
  const mouseDownCoords = useRef({ x: -1, y: -1 });
  const hiddenRef = useRef(true);

  const hidden = useMemo(
    () => rectCoords.x === -1 && rectCoords.y === -1,
    [rectCoords.x, rectCoords.y],
  );

  useEffect(() => {
    hiddenRef.current = hidden;
  }, [hidden]);

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      mouseDownCoords.current = { x: event.clientX, y: event.clientY };
      // setRectCoords({ x: -1, y: -1 });
    };

    const handleMouseUp = (event: MouseEvent) => {
      if (!hiddenRef.current) return;

      let { x, y } = mouseDownCoords.current;
      const sameX = x === event.clientX;
      const sameY = y === event.clientY;
      const isSame = sameX && sameY;
      //if (isSame) {
      //  setRectCoords({ x: -1, y: -1 });
      //  return;
      //}

      const ax = Math.max(x, event.clientX);
      const maxY = Math.max(y, event.clientY);
      const ay = maxY + adjustY;
      const coords = {
        x: ax,
        y: ay,
      };
      setRectCoords(coords);
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        top: rectCoords.y,
        left: rectCoords.x,
        display: hidden ? "none" : "block",
        backgroundColor: "white",
        ...style,
      }}
    >
      <div>
        Mouse Coordinates: x: {rectCoords.x}, y: {rectCoords.y}
      </div>
      <AddTranslationCard />
    </div>
  );
};
