import express from "express";
import { addRealty, getAllRealty } from "./../controllers/realtyController";

const realtyRouter = express.Router();

realtyRouter.get("/", getAllRealty);
realtyRouter.post("/", addRealty);

export default realtyRouter;
