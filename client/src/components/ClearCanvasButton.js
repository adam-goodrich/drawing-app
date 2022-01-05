import React from "react";
import { useCanvas } from "./CanvasContext";

export const ClearCanvasButton = () => {
  const { clearCanvas } = useCanvas();

  return (
    <button onClick={clearCanvas} className="btn btn-danger mb-5 mt-3">
      Clear
    </button>
  );
};
