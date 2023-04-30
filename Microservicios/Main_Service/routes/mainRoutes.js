import { Router } from "express";
import { mainController } from "../controller/mainController.js";

export const mainRouter = Router()

mainRouter.all('/:path1/:path2/path:3', mainController)