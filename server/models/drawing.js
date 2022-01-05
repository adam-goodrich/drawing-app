import mongoose from "mongoose";

const drawingSchema = mongoose.Schema({
  title: String,
  createdBy: String,
  image: "",
  usersWithAccess: [],
});

const drawing = mongoose.model("drawing", drawingSchema);

export default drawing;
