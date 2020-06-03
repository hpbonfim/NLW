import express from 'express';


import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

// index (mostrar todos), show (mostrar um), create, delete, update

const routes = express.Router();
const pointsController = new PointsController();
const itemsController = new ItemsController();

routes.get('/', (request, response) => {
    return response.json('Hello: World');
});

routes.get('/items', itemsController.index);

routes.post('/points', pointsController.create);
routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);


export default routes

// Service Pattern
// Repository Pattern (Data Mapper)