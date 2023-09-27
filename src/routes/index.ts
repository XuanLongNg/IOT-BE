import express from "express";
import SensorController from "../controllers/SensorController";
import LightController from "../controllers/LightController";
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

routes.post("/api/control_led", LightController.control_led);
routes.get("/api/getDataDevice", LightController.getDataDevice);

routes.get("/api/getDataSensor", SensorController.getDataSensor);

export default routes;
