import { Request, Response } from 'express';
import knex from '../database/connection';
import * as config from '../config/dev'

class ItemsController {
    async index (request: Request , response: Response) {

        const items = await knex('items').select('*');
        const serializedItems = items.map(item => {
            return {
                id: item.id,
                title: item.title,
                image_url: `http://${config.default.host_dev}:3333/uploads/${item.image}`
            };
        })
        return response.json(serializedItems);
    };
}

export default ItemsController;