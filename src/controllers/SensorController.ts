import { Request, Response } from "express";
import SensorServices from "../services/sensorServices";
class SensorController {
  public async getHumidityDaily(req: Request, res: Response) {
    try {
      const data = await SensorServices.getHumidityDaily();
      console.log("data: ", data);
      return res.status(200).send(data);
    } catch (error) {
      console.log(error);
      return res.status(404).send({ error: error });
    }
  }
}

const sensorController = new SensorController();
export default sensorController;
