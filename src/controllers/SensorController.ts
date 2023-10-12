import { Request, Response } from "express";
import SensorServices from "../services/sensor.services";
import MqttService from "../services/mqtt.services";

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
      const data = {
        ...req.query,
        time: req.query.time as string,
      };
      const response = await SensorServices.getLuminanceByDate(data);
      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(404).send({ error: error });
    }
  }
  public async getHumidityByMonth(req: Request, res: Response) {
    try {
      const data = {
        ...req.query,
        time: req.query.time as string,
      };
      const response = await SensorServices.getHumidityByMonth(data);
      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(404).send({ error: error });
    }
  }
  public async getTemperatureByMonth(req: Request, res: Response) {
    try {
      const data = {
        ...req.query,
        time: req.query.time as string,
      };
      const response = await SensorServices.getTemperatureByMonth(data);
      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(404).send({ error: error });
    }
  }
  public async getLuminanceByMonth(req: Request, res: Response) {
    try {
      const data = {
        ...req.query,
        time: req.query.time as string,
      };
      const response = await SensorServices.getLuminanceByMonth(data);
      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(404).send({ error: error });
    }
  }
  public async getDustByMonth(req: Request, res: Response) {
    try {
      const data = {
        ...req.query,
        time: req.query.time as string,
      };
      const response = await SensorServices.getDustByMonth(data);
      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(404).send({ error: error });
    }
  }
  // public async updateSensorData(req: Request, res: Response) {
  //   try {
  //     MqttService.onMessage();
  //   } catch (error) {}
  // }
  public async getDataSensor(req: Request, res: Response) {
    try {
      const response = await SensorServices.getDataSensor();
      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(404).send({ error: error });
    }
  }
}

const sensorController = new SensorController();
export default sensorController;
