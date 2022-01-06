import React, { useEffect } from "react";
import { useCanvas } from "./CanvasContext";

export default function Canvas(props) {
  const { canvasRef, prepareCanvas, startDrawing, finishDrawing, draw } =
    useCanvas();

  useEffect(() => {
    prepareCanvas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const image = new Image();
    image.src = props.activeDrawing.image;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    image.onload = () => {
      context.drawImage(image, 0, 0);
    };

    if (props.currentUser.username === props.activeDrawing.usersWithAccess[0]) {
      context.strokeStyle = "black";
    }
    if (props.currentUser.username === props.activeDrawing.usersWithAccess[1]) {
      context.strokeStyle = "red";
    }
    if (props.currentUser.username === props.activeDrawing.usersWithAccess[2]) {
      context.strokeStyle = "green";
    }
    if (props.currentUser.username === props.activeDrawing.usersWithAccess[3]) {
      context.strokeStyle = "blue";
    }
    if (props.currentUser.username === props.activeDrawing.usersWithAccess[3]) {
      context.strokeStyle = "orange";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas
      id="canvas"
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseMove={draw}
      ref={canvasRef}
    />
  );
}
