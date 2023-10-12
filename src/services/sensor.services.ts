import MysqlConfig from "../configs/mysql.config";
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
      const query = `SELECT id, id_sensor, temperature, time FROM HistorySensor WHERE temperature IS NOT NULL and DATE(time) = '${
        Format_YYYY_MM_DD(time).time
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
  public async getLuminanceByDate({ time }: { time: string }) {
    try {
      const query = `SELECT id, id_sensor, luminance, time FROM HistorySensor WHERE luminance IS NOT NULL and DATE(time) = '${
        Format_YYYY_MM_DD(time).time
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
  public async getHumidityByMonth({ time }: { time: string }) {
    try {
      const timeFormat = Format_YYYY_MM_DD(time);

      const query = `SELECT id, id_sensor, humidity, time FROM HistorySensor WHERE humidity IS NOT null and DATE_FORMAT(time, '%Y-%c') = '${
        timeFormat.years + "-" + timeFormat.months
      }';`;
      // console.log(query);

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

  public async getTemperatureByMonth({ time }: { time: string }) {
    try {
      const timeFormat = Format_YYYY_MM_DD(time);

      const query = `SELECT id, id_sensor, temperature, time FROM HistorySensor WHERE temperature IS NOT null and DATE_FORMAT(time, '%Y-%c') = '${
        timeFormat.years + "-" + timeFormat.months
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
  public async getLuminanceByMonth({ time }: { time: string }) {
    try {
      const timeFormat = Format_YYYY_MM_DD(time);

      const query = `SELECT id, id_sensor, luminance, time FROM HistorySensor WHERE luminance IS NOT null and DATE_FORMAT(time, '%Y-%c') = '${
        timeFormat.years + "-" + timeFormat.months
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
  public async getDataSensor() {
    try {
      const query = "SELECT * FROM HistorySensor;";
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
  public async updateDataSensor({
    id_sensor,
    temperature,
    humidity,
    luminance,
    time,
    dust,
  }: {
    id_sensor: string;
    temperature?: string;
    humidity?: string;
    luminance?: string;
    time: string;
    dust?: string;
  }) {
    try {
      const query = `insert into HistorySensor(id_sensor, temperature, humidity, luminance, dust, time)
      values("dht11", ${temperature ? '"' + temperature + '"' : null}, ${
        humidity ? '"' + humidity + '"' : null
      }, ${luminance ? '"' + luminance + '"' : null}, ${
        dust ? '"' + dust + '"' : null
      }, "${Format_YYYY_MM_DD_HH_mm_ss(time).time}")`;
      // console.log(query);

      await connection.promise().query(query);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  public async getDustByMonth({ time }: { time: string }) {
    try {
      const timeFormat = Format_YYYY_MM_DD(time);

      const query = `SELECT id, id_sensor, dust, time FROM HistorySensor WHERE dust IS NOT null and DATE_FORMAT(time, '%Y-%c') = '${
        timeFormat.years + "-" + timeFormat.months
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
