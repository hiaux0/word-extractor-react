import React, { useState } from "react";
import { DragButton } from "./DragButton";

export const DragButtonDemo = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [rel, setRel] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    const pos = e.currentTarget.getBoundingClientRect();
    setRel({
      x: e.pageX - pos.left,
      y: e.pageY - pos.top
    });
    setDragging(true);
    e.stopPropagation();
    e.preventDefault();
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragging) return;
    setPosition({
      x: e.pageX - rel.x,
      y: e.pageY - rel.y
    });
    e.stopPropagation();
    e.preventDefault();
  };

  React.useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  });

  return (
    <div
      onMouseDown={handleMouseDown}
      style={{
        width: 300,
        height: 300,
        backgroundColor: "darkblue",
        position: "absolute",
        left: position.x,
        top: position.y,
        cursor: "move"
      }}
    >
      <DragButton />
    </div>
  );
};
