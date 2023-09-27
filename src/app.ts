import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import routes from "./routes";
import mqttService from "./services/mqtt.services";
import { Server } from "socket.io";
import * as http from "http";
import cors from "cors";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const corsOptions: cors.CorsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
};
app.use(cors(corsOptions));

const server = http.createServer(app);
app.use("/", routes);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});
io.on("connection", (socket) => {
  console.log("a user connected ", socket.id);
});

mqttService.onMessage(io);

server.listen(4000, () => {
  console.log("Listening on http://localhost:4000");
});
