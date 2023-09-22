import MysqlConfig from "../configs/mysqlConfig";
import HistorySensorType from "../types/sensorType";
import { Format_YYYY_MM_DD, Format_YYYY_MM_DD_HH_mm_ss } from "../utils/date";
import { RowDataPacket } from "mysql2";
const connection = MysqlConfig.getConnection();
class SensorServices {
  public async getHumidityByDate({ time }: { time: string }) {
    try {
      const query = `SELECT id, id_sensor, humidity, time FROM HistorySensor WHERE humidity IS NOT NULL and DATE(time) = '${
        Format_YYYY_MM_DD(time).time
      }';`;
      console.log(query);

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

  public async getTemperatureByDate({ time }: { time: string }) {
    try {
      const query = `SELECT id, id_sensor, temperature, time FROM HistorySensor WHERE temperature IS NOT NULL and DATE(time) = '${time}';`;
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
  public async getLuminanceByDate({ time }: { time: string }) {
    try {
      const query = `SELECT id, id_sensor, luminance, time FROM HistorySensor WHERE luminance IS NOT NULL and DATE(time) = '${time}';`;
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
  public async getHumidityByMonth() {
    try {
      const time = Format_YYYY_MM_DD(new Date().toString());
      console.log(time.time, time.days);

      const query = `SELECT id, id_sensor, humidity, time FROM HistorySensor WHERE humidity IS NOT null and DATE_FORMAT(time, '%Y-%c') = '${
        time.years + "-" + time.months
      }';`;
      console.log(query);

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

  public async getTemperatureByMonth() {
    try {
      const time = Format_YYYY_MM_DD(new Date().toString());

      const query = `SELECT id, id_sensor, temperature, time FROM HistorySensor WHERE temperature IS NOT null and DATE_FORMAT(time, '%Y-%c') = '${
        time.years + "-" + time.months
      }';`;
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
  public async getLuminanceByMonth() {
    try {
      const time = Format_YYYY_MM_DD(new Date().toString());

      const query = `SELECT id, id_sensor, luminance, time FROM HistorySensor WHERE luminance IS NOT null and DATE_FORMAT(time, '%Y-%c') = '${
        time.years + "-" + time.months
      }';`;
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
