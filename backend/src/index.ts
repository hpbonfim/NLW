import express from 'express'; 
import routes from './routes';
import path from 'path';
import cors from 'cors';

const app = express();
const port = 3333;

app.use(cors());
app.use(express.json());
app.use(routes);

app.use('/uploads', express.static(path.resolve(__dirname, '.', 'uploads'))); 

console.log(`Running on the port ${port}`);
app.listen(port);
