import drawingData from "../models/drawing.js";

export const getDrawings = async (req, res) => {
  try {
    const allDrawings = await drawingData.find();
    res.status(200).json(allDrawings);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createDrawing = async (req, res) => {
  const drawing = req.body;

  const newDrawing = new drawingData(drawing);

  try {
    await newDrawing.save();
    res.status(201).json(newDrawing);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteDrawing = async (req, res) => {
  const id = req.params.id;
  try {
    await drawingData.findByIdAndDelete(id);
    res.status(200).json({ message: "Drawing deleted" });
  } catch (error) {
    console.log(error);
  }
};

export const updateDrawing = async (req, res) => {
  const id = req.params.id;
  const drawing = req.body;
  try {
    await drawingData.findByIdAndUpdate(id, drawing);
    res.status(200).json({ message: "Drawing updated" });
  } catch (error) {
    console.log(error);
  }
};
