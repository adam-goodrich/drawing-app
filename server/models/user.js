import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email: String,
  username: String,
  password: String,
  firstname: String,
  lastname: String,
  drawings: [],
});

const user = mongoose.model("user", userSchema);

export default user;
