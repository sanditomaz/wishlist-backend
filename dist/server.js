import express from "express";
import cors from "cors";
import entry from "./routers/entry.route.js";
import movies from "./routers/movies.route.js";
import dotenv from "dotenv";
dotenv.config();
var app = express();
app.use(cors());
app.use(express.json());
app.use(entry);
app.use(movies);
app.listen(process.env.PORT, function () {
    console.log("listening on ".concat(process.env.PORT));
});
