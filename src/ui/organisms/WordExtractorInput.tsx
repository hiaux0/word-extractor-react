import { useEffect } from "react";
import { createRoot } from "react-dom/client";

const popupStyle: React.CSSProperties = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: "rgba(0,0,0,0.8)",
  padding: "1em",
  zIndex: 1000,
  color: "white",
  borderRadius: "8px",
};

const popupContentStyle: React.CSSProperties = {
  position: "relative",
};

const closeButtonStyle: React.CSSProperties = {
  position: "absolute",
  top: "0",
  right: "0",
  background: "transparent",
  border: "none",
  color: "white",
  cursor: "pointer",
};

const Popup = ({ text, onClose }: any) => {
  useEffect(() => {
    const handleEscape = (e: any) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div style={popupStyle}>
      <div style={popupContentStyle}>
        <button style={closeButtonStyle} onClick={onClose}>
          X
        </button>
        <p>{text}</p>
      </div>
    </div>
  );
};

export const showPopup = (text: string | undefined) => {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container); // createRoot(container!) if you use TypeScript

  const close = () => {
    root.unmount();
    document.body.removeChild(container);
  };

  root.render(<Popup text={text} onClose={close} />);
  // root.render(<App tab="home" />);
};

export const WordExtractorInput = () => {
  return (
    <div style={{ color: "black", background: "red", width: 300, height: 300 }}>
      Red
    </div>
  );
};
