// import * as express from "express";
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
// import multer from "multer";
import routes from "./routes";
// const upload = multer();
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(upload.array());
app.use("/", routes);
app.listen(4000, () => {
  console.log("Listening on http://localhost:4000");
});
