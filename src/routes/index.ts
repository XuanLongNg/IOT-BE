import express from "express";
import SensorController from "../controllers/SensorController";
const routes = express.Router();

routes.get("/api/getHumidityByDate", SensorController.getHumidityByDate);
routes.get("/api/getHumidityByMonth", SensorController.getHumidityByMonth);

routes.get("/api/getLuminanceByDate", SensorController.getLuminanceByDate);
routes.get("/api/getLuminanceByMonth", SensorController.getLuminanceByMonth);

routes.get("/api/getTemperatureByDate", SensorController.getTemperatureByDate);
routes.get(
  "/api/getTemperatureByMonth",
  SensorController.getTemperatureByMonth
);

export default routes;
