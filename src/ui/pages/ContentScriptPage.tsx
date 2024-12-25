import {
  ComponentProps,
  FC,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AddTranslationCard } from "../organisms/AddTranslationCard";
import { getTextFromSelection } from "@/lib/modules/htmlModules";
import { contentScriptCommunicationService } from "@/lib/CommunicationService";
import { MESSAGES } from "@/lib/common/constants";

interface ContentScriptPageProps extends ComponentProps<any> {}

const debug = false;

//document.addEventListener("DOMContentLoaded", () => {
//  console.log("DOMContentLoaded");
//});

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
  const [text, setText] = useState("");
  const [hasError, setHasError] = useState(false);
  const mouseDownCoords = useRef({ x: -1, y: -1 });
  const mouseUpCoords = useRef({ x: -1, y: -1 });
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

      const ax = Math.max(x, event.clientX);
      const maxY = Math.max(y, event.clientY);
      const ay = maxY + adjustY;
      const coords = {
        x: ax,
        y: ay,
      };
      mouseUpCoords.current = coords;
    };

    const handleKeydown = (event: KeyboardEvent) => {
      const key = event.key;
      switch (key) {
        case "Escape": {
          setRectCoords({ x: -1, y: -1 });
          break;
        }
        case "a": {
          console.clear();
          try {
            contentScriptCommunicationService.send({
              action: MESSAGES["database:read"],
            });
          } catch {
            setHasError(true);
          }

          const selectedText = getTextFromSelection();
          if (!selectedText) return;
          setText(selectedText);
          setRectCoords(mouseUpCoords.current);
          break;
        }
        default:
        // console.log("other key is pressed");
      }
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  if (hasError)
    return (
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: 30,
          textAlign: "center",
          backgroundColor: "#d67c7c",
          ...style,
        }}
      >
        [Word Extractor] There was an error. Try reload the page
      </div>
    );

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
      {debug && (
        <div>
          Mouse Coordinates: x: {rectCoords.x}, y: {rectCoords.y}
        </div>
      )}
      <AddTranslationCard
        text={text}
        onAdd={() => {
          setRectCoords({ x: -1, y: -1 });
        }}
      />
    </div>
  );
};
