import express from 'express'; 
import routes from './routes';
import path from 'path';
import cors from 'cors';
import { errors } from 'celebrate'
import morgan from 'morgan'
import * as config from './config/host'

const app = express();
const port = 3333;

app.use(cors());
app.use(express.json());
app.use(routes);

app.use('/images', express.static(path.resolve(__dirname, '.', 'images'))); 
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads'))); 

app.use(errors())
app.use(morgan('dev'))
console.log(`Rodando em ${config.default.localhost}:${port}`);
app.listen(port);

