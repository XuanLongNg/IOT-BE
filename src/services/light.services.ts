import MysqlConfig from "../configs/mysql.config";
import { Format_YYYY_MM_DD_HH_mm_ss } from "../utils/date";
import { RowDataPacket } from "mysql2";
const connection = MysqlConfig.getConnection();

class LightService {
  public async getDataDevice() {
    try {
      const query = "SELECT * FROM HistoryDevice;";
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
  public async updateDataDevice({
    id_device,
    status,
  }: {
    id_device: string;
    status: string;
  }) {
    try {
      const query = `insert into HistoryDevice(id_device, status, time) values("${id_device}", "${status}",  "${
        Format_YYYY_MM_DD_HH_mm_ss(new Date().toString()).time
      }")`;
      // console.log(query);

      await connection.promise().query(query);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
const lightService = new LightService();
export default lightService;
