import { Request, Response } from "express";
import DeviceServices from "../services/light.services";
import MqttService from "../services/mqtt.services";

class LightController {
  public async control_led(req: Request, res: Response) {
    try {
      const id_device = req.body.number === 1 ? "led1" : "led2";
      const status = req.body.message === "1" ? "on" : "off";
      const data = {
        ...req.body,
        id_device: id_device,
        status: status,
      };
      console.log("Light: ", data);
      await MqttService.publishMessage(data.message, data.number == 1 ? 4 : 5);
      await DeviceServices.updateDataDevice(data);

      return res.status(200).send({ message: data.message });
    } catch (error) {
      console.log(error);
      return res.status(404).send({ error: error });
    }
  }
  public async getDataDevice(req: Request, res: Response) {
    try {
      const response = await DeviceServices.getDataDevice();
      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(404).send({ error: error });
    }
  }
  public async warningLed(req: Request, res: Response) {
    try {
      console.log(req.body.message);

      const response = await MqttService.publishMessage(req.body.message, 6);
      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(404).send({ error: error });
    }
  }
}

const lightController = new LightController();
export default lightController;
