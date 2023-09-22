import { Request, Response } from "express";
import SensorServices from "../services/sensorServices";
class SensorController {
  public async getHumidityByDate(req: Request, res: Response) {
    try {
      const data = {
        ...req.query,
        time: req.query.time as string,
      };
      const response = await SensorServices.getHumidityByDate(data);
      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(404).send({ error: error });
    }
  }
  public async getTemperatureByDate(req: Request, res: Response) {
    try {
      const data = {
        ...req.query,
        time: req.query.time as string,
      };
      const response = await SensorServices.getTemperatureByDate(data);
      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(404).send({ error: error });
    }
  }
  public async getLuminanceByDate(req: Request, res: Response) {
    try {
      const response = await SensorServices.getLuminanceByDate();
      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(404).send({ error: error });
    }
  }
  public async getHumidityByMonth(req: Request, res: Response) {
    try {
      const response = await SensorServices.getHumidityByMonth();
      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(404).send({ error: error });
    }
  }
  public async getTemperatureByMonth(req: Request, res: Response) {
    try {
      const response = await SensorServices.getTemperatureByMonth();
      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(404).send({ error: error });
    }
  }
  public async getLuminanceByMonth(req: Request, res: Response) {
    try {
      const response = await SensorServices.getLuminanceByMonth();
      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(404).send({ error: error });
    }
  }
}

const sensorController = new SensorController();
export default sensorController;
