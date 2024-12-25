import React, { ComponentProps, useCallback, useEffect, useState } from "react";

interface DragWrapperProps extends ComponentProps<any> {
  children?: React.ReactNode;
}

// Implement a drag button component
export const DragWrapper = (props: DragWrapperProps) => {
  const { style, children } = props;

  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

  const handleMouseDown = useCallback(
    (event: React.MouseEvent) => {
      setIsDragging(true);
      const target = event.currentTarget;
      const pos = target.getBoundingClientRect();
      const x = event.clientX;
      const y = event.clientY;
      const coords = { x, y };
      setStartPosition(coords);
    },
    [setIsDragging, setStartPosition],
  );

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (isDragging) {
        const dx = event.clientX - startPosition.x;
        const x = position.x + dx;
        const dy = event.clientY - startPosition.y;
        const y = position.y + dy;
        const coords = { x, y };
        setPosition(coords);
      }
    },
    [isDragging, startPosition],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, [setIsDragging]);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseDown, handleMouseUp, isDragging]);

  return (
    <div
      className="DragWrapper"
      style={{
        position: "absolute",
        cursor: "move",
        ...style,
        top: position.y,
        left: position.x,
      }}
      onMouseDown={handleMouseDown}
    >
      {children}
    </div>
  );
};
