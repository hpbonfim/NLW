import { Request, Response } from 'express';
import knex from '../database/connection';
import * as config from '../config/host'

class ItemsController {
    async index (request: Request , response: Response) {

        const items = await knex('items').select('*');
        const serializedItems = items.map(item => {
            return {
                id: item.id,
                title: item.title,
                image_url: `http://${config.default.localhost}:3333/images/${item.image}`
            };
        })
        return response.json(serializedItems);
    };
}

export default ItemsController;