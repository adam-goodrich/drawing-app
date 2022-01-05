import express from "express";
import { getUsers, createUser, deleteUser } from "../controllers/user.js";
import user from "../models/user.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/", createUser);
router.delete("/:id", deleteUser);

export default router;
