import * as mqtt from "mqtt";
import dotenv from "dotenv";
import { getEnv } from "../utils/getEnv";
import SensorServices from "./sensor.services";
import { Format_YYYY_MM_DD_HH_mm_ss } from "../utils/date";
import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
dotenv.config();
class MQTTService {
  private temperatureTopic: string = "esp32/dht/temperature";
  private humidityTopic: string = "esp32/dht/humidity";
  private luminanceTopic: string = "esp32/led/luminance";
  private lightControlTopic: string = "esp32/led/control/1";
  private fanControlTopic: string = "esp32/led/control/2";

  private client: mqtt.MqttClient;
  constructor() {
    this.client = mqtt.connect(getEnv("MQTT_HOST"));
    this.client.on("connect", () => {
      this.client.subscribe(this.temperatureTopic);
      this.client.subscribe(this.humidityTopic);
      this.client.subscribe(this.luminanceTopic);
      this.client.subscribe(this.lightControlTopic);
      this.client.subscribe(this.fanControlTopic);

      console.log("Connected MQTT");
    });
    // console.log("Connected MQTT");
  }
  public getClient(): mqtt.MqttClient {
    return this.client;
  }
  public onMessage(
    io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
  ) {
    this.client.on("message", (topic, message) => {
      // console.log(topic, message.toString());
      if (
        topic !== "esp32/dht/temperature" &&
        topic !== "esp32/dht/humidity" &&
        topic !== "luminance"
      )
        return;
      const time = Format_YYYY_MM_DD_HH_mm_ss(new Date().toString());
      const data = {
        temperature:
          topic === "esp32/dht/temperature" ? message.toString() : undefined,
        humidity:
          topic === "esp32/dht/humidity" ? message.toString() : undefined,
        luminance: topic === "luminance" ? message.toString() : undefined,
        time: time.time,
      };
      console.log(data);

      SensorServices.updateDataSensor(data);
      io.emit("announce", data);
    });
  }
  public async publishMessage(message: string, topic: 1 | 2 | 3 | 4 | 5) {
    const topic_list = [
      this.temperatureTopic,
      this.humidityTopic,
      this.luminanceTopic,
      this.lightControlTopic,
      this.fanControlTopic,
    ];
    console.log("Find ", topic_list[topic - 1], message);
    this.client.publish(topic_list[topic - 1], message);
  }
}
const mqttService = new MQTTService();
export default mqttService;
