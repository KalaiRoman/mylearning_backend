import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import ConnectDataBase from './middleware/DB/DbConnect.js';
dotenv.config();
// connect db
ConnectDataBase();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    optionsSuccessStatus: 200
}))
app.use(morgan("dev"));
app.listen(process.env.PORT, () => {
    console.log(`Running Backend Server ${process.env.PORT}`)
});