import MysqlConfig from "../configs/mysqlConfig";
import HistorySensorType from "../types/sensorType";
import { Format_YYYY_MM_DD_HH_mm_ss } from "../utils/date";
import { RowDataPacket } from "mysql2";
const connection = MysqlConfig.getConnection();
class SensorServices {
  public humidity: number[];
  public temperature: number[];
  public luminance: number[];
  public constructor() {
    this.humidity = [];
    this.temperature = [];
    this.luminance = [];
  }
  public async getHumidityDaily() {
    try {
      const query = "SELECT * FROM HistorySensor WHERE humidity IS NOT NULL;";
      const [data] = await connection.promise().query(query);
      let rowDataPacketArray = data as RowDataPacket[];
      return rowDataPacketArray.map((data: any) => {
        data = { ...data, time: Format_YYYY_MM_DD_HH_mm_ss(data.time).time };
        return data;
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
const sensorServices = new SensorServices();
export default sensorServices;
