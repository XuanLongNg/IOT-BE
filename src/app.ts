// import * as express from "express";
import express, { Request, Response } from "express";
const app = express();

app.get("*", (req: Request, res: Response) => {
  console.log("hello world");
  res.status(200).send({ message: "hello world" });
});
app.listen(4000, () => {
  console.log("Listening on http://localhost:4000");
});
