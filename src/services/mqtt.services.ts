import * as mqtt from "mqtt";
import dotenv from "dotenv";
import { getEnv } from "../utils/getEnv";
import SensorServices from "./sensor.services";
import { Format_YYYY_MM_DD_HH_mm_ss } from "../utils/date";
import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
dotenv.config();
class MQTTService {
  private dataTopic: string = "esp32/dht";
  private temperatureTopic: string = "esp32/dht/temperature";
  private humidityTopic: string = "esp32/dht/humidity";
  private luminanceTopic: string = "esp32/bh1750/luminance";
  private lightControlTopic1: string = "esp32/led/control/1/1";
  private lightControlTopic2: string = "esp32/led/control/1/2";
  private fanControlTopic1: string = "esp32/led/control/2/1";
  private fanControlTopic2: string = "esp32/led/control/1/2";
  private warning: string = "esp32/led/warning";

  private client: mqtt.MqttClient;
  constructor() {
    this.client = mqtt.connect(getEnv("MQTT_HOST"));
    this.client.on("connect", () => {
      this.client.subscribe(this.temperatureTopic);
      this.client.subscribe(this.humidityTopic);
      this.client.subscribe(this.luminanceTopic);
      this.client.subscribe(this.lightControlTopic2);
      this.client.subscribe(this.fanControlTopic2);
      this.client.subscribe(this.dataTopic);
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
        topic == "esp32/led/control/1/2" ||
        topic == "esp32/led/control/2/2"
      ) {
        if (topic == "esp32/led/control/1/2")
          io.emit("led1", message.toString());
        else io.emit("led2", message.toString());
        return;
      } else if (
        topic == this.humidityTopic ||
        topic == this.temperatureTopic ||
        topic == this.luminanceTopic
      )
        return;
      console.log(topic);

      const time = Format_YYYY_MM_DD_HH_mm_ss(new Date().toString());
      const data = {
        id_sensor: "dht11",
        temperature: "0",
        humidity: "0",
        luminance: "0",
        dust: Math.round(Math.random() * 101).toString(),
        time: time.time,
      };
      let tmp = "";
      let index = 0;
      for (let i of message.toString()) {
        if (i == " ") {
          if (index == 0) {
            data.temperature = tmp;
          } else if (index == 1) {
            data.luminance = tmp;
          } else {
            data.humidity = tmp;
          }
          tmp = "";
          index++;
          continue;
        }
        tmp += i;
      }
      data.humidity = tmp;

      // console.log(data);

      SensorServices.updateDataSensor(data);
      io.emit("announce", data);
    });
  }
  public async publishMessage(message: string, topic: 1 | 2 | 3 | 4 | 5 | 6) {
    const topic_list = [
      this.temperatureTopic,
      this.humidityTopic,
      this.luminanceTopic,
      this.lightControlTopic1,
      this.fanControlTopic1,
      this.warning,
    ];
    // console.log("Find ", topic_list[topic - 1], message);
    this.client.publish(topic_list[topic - 1], message);
  }
}
const mqttService = new MQTTService();
export default mqttService;
