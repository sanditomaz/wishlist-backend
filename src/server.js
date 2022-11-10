import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("rota");
app.use("rota2");

app.listen(process.env.PORT, () => {
  console.log(`listening on ${process.env.PORT}`);
});
