import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
var app = express();
app.use(cors());
app.use(express.json());
app.use("rota");
app.use("rota2");
app.listen(process.env.PORT, function () {
    console.log("listening on ".concat(process.env.PORT));
});
