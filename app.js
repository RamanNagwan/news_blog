import express from 'express';
import env from 'dotenv';
import dbConnection from './config/mongoDB.js';
import path from 'path';
import { fileURLToPath } from "url";
import router from './routes/admin.js';
import expressEjsLayouts from 'express-ejs-layouts';
import cookieParser from 'cookie-parser';

//dotenv config
env.config()

// Database connection
dbConnection();

const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Express ejs Layout
app.use(expressEjsLayouts);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set('view engine', 'ejs');

//Admin Router
app.use('/api/', router);

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});