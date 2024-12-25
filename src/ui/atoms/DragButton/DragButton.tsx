import { Button } from "@/components/ui/button";
import { Grab } from "lucide-react";
import { ComponentProps, useCallback, useEffect, useState } from "react";

interface DragButtonProps extends ComponentProps<any> {
  onDrag?: (coords: { x: number; y: number }) => void;
}

// Implement a drag button component
export function DragButton(props: DragButtonProps) {
  const { onDrag } = props;

  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      setIsDragging(true);
      const coords = { x: e.clientX, y: e.clientY };
      setStartPosition(coords);
    },
    [setIsDragging, setStartPosition],
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        const dx = e.clientX - startPosition.x;
        const x = position.x + dx;
        const dy = e.clientY - startPosition.y;
        const y = position.y + dy;
        const coords = { x, y };
        setPosition(coords);
        onDrag?.({ x, y });
      }
    },
    [isDragging, startPosition],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    // setStartPosition(position);
  }, [setIsDragging, setStartPosition, position]);

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
      style={{
        position: "relative",
        top: position.y,
        left: position.x,
      }}
      onMouseDown={handleMouseDown}
    >
      <Button
        variant="outline"
        size="sm"
        style={{
          cursor: isDragging ? "grabbing" : "grab",
        }}
      >
        <Grab />
      </Button>
    </div>
  );
}
