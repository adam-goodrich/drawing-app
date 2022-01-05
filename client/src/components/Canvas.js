import React, { useEffect } from "react";
import { useCanvas } from "./CanvasContext";
import MyNavbar from "./Navbar";

export function Canvas(props) {
  const { canvasRef, prepareCanvas, startDrawing, finishDrawing, draw } =
    useCanvas();

  useEffect(() => {
    prepareCanvas();
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
      const offsetX = 100;
      const offsetY = 100;
      context.beginPath();
      context.moveTo(offsetX, offsetY);
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
