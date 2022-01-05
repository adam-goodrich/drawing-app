import express from "express";
import {
  getDrawings,
  createDrawing,
  deleteDrawing,
  updateDrawing
} from "../controllers/drawing.js";
import drawing from "../models/drawing.js";

const router = express.Router();

router.get("/", getDrawings);
router.post("/", createDrawing);
router.delete("/:id", deleteDrawing);
router.put("/:id", updateDrawing);

export default router;
