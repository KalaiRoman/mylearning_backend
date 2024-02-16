import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import ConnectDataBase from './middleware/DB/DbConnect.js';
import router from './routings/Allrouters.js';
dotenv.config();
// connect db
ConnectDataBase();
const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }))
app.use(cors({ credentials: true, origin: "http://localhost:3000" }))
app.use(morgan("dev"));

app.use("/le", router);
app.listen(process.env.PORT, () => {
    console.log(`Running Backend Server ${process.env.PORT}`)
});