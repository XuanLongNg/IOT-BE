import express from "express";
import SensorController from "../controllers/SensorController";
const routes = express.Router();

routes.get("/api/getHumidityDaily", SensorController.getHumidityDaily);

export default routes;
