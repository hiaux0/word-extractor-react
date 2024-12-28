import {
  ComponentProps,
  FC,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AddTranslationCard } from "../organisms/AddTranslationCard";
import {
  getTextFromSelection,
  removeNewLines,
} from "@/lib/modules/htmlModules";
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

export const WordExtractorError = () => {
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
      }}
    >
      [Word Extractor] There was an error. Try reload the page
    </div>
  );
};

export const ContentScriptPage: FC<ContentScriptPageProps> = ({ style }) => {
  const [rectCoords, setRectCoords] = useState({ x: -1, y: -1 });
  const [text, setText] = useState("");
  const [hasError, setHasError] = useState(false);
  const scrollTopRef = useRef(0);
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
      /*prettier-ignore*/ console.log("[ContentScriptPage.tsx,76] event: ", event);
      mouseDownCoords.current = { x: event.clientX, y: event.clientY };
      scrollTopRef.current = window.scrollY;
      // setRectCoords({ x: -1, y: -1 });
    };

    const handleMouseUp = (event: MouseEvent) => {
      if (!hiddenRef.current) return;

      let { x, y } = mouseDownCoords.current;

      const ax = Math.max(x, event.clientX);
      const maxY = Math.max(y, event.clientY);
      const ay = maxY + adjustY;
      const finalY = ay + scrollTopRef.current;

      const coords = {
        x: ax,
        y: finalY,
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
          try {
            contentScriptCommunicationService.send({
              action: MESSAGES["database:read"],
            });
          } catch {
            setHasError(true);
          }

          let selectedText = getTextFromSelection();
          if (!selectedText) return;
          selectedText = removeNewLines(selectedText);
          /*prettier-ignore*/ console.log("[ContentScriptPage.tsx,96] selectedText: ", selectedText);
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

  if (hasError) return <WordExtractorError />;

  return (
    <div
      className="ContentScriptPage"
      style={{
        position: "absolute",
        top: rectCoords.y,
        left: rectCoords.x,
        display: hidden ? "none" : "block",
        backgroundColor: "transparent",
        ...style,
        zIndex: 987_654,
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
