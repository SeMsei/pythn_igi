import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import loadRoutes from './loaders/routes.js';
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express();

const corsOptions = {
    origin: (origin, callback) => {
      if (!origin || origin === 'http://localhost:3000') {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    optionsSuccessStatus: 200
  }

app.use(cors(corsOptions));

const imagesFolder = path.join(__dirname, 'images');
app.use('/images', express.static(imagesFolder));
console.log(imagesFolder);
app.use(express.urlencoded({ extended: true, limit: '50mb', parameterLimit:50000 }));
app.use(express.json({limit: '50mb'}));


mongoose.connect('mongodb://127.0.0.1:27017/test');

app.use(bodyParser.json());
loadRoutes(app);

export default app;