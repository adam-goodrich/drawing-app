import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import usersRoutes from "./routes/user.js";
import drawingsRoutes from "./routes/drawing.js";

const app = express();

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

app.use(cors());

app.use(bodyParser.json({ limit: "20mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));

app.use("/users", usersRoutes);
app.use("/drawings", drawingsRoutes);

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

const CONNECTION_URL =
  "mongodb+srv://agoodrich:1234Naya@drawing.assf0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const PORT = process.env.PORT || 8080;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Database connected on port: ${PORT}`);
  })
  .catch((err) => {
    console.log("Error connecting to database", err);
  });
