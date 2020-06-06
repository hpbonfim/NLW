import { Request, Response } from 'express';
import knex from '../database/connection';
import * as host from '../config/dev'


class PointsController {

    async index(request: Request, response: Response) {
        // cidade, uf, items (Query Params)
        const { city, uf, items } = request.query;

        const parsedItems = String(items)
            .split(',')
            .map(item => Number(item.trim()))

        const points = await knex('points')
            .join('point_items', 'points.id', '=', 'point_items.point_id')
            .whereIn('point_items.item_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*');

        const serializedPoints = points.map(point => {
            return {
                ...point,
                image_url: `http://${host.default.host_dev}:3333/uploads/${point.image}`
            }
        })

        return response.json(serializedPoints)
    }

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const point = await knex('points').where('id', id).first();

        if (!point) {
            return response.status(400).json({ message: 'point not found' })
        };


        const serializedPoint = {
            ...point,
            image_url: `http://${host.default.host_dev}:3333/uploads/${point.image}`
        }

        /** 
         * SELECT * FROM items
         * JOIN point_items ON items_id = point_items.item_id
         * WHERE point_items.point_id = {id}
         * SELECT items_title
        */

        const items = await knex('items')
            .join('point_items', 'items.id', '=', 'point_items.item_id')
            .where('point_items.point_id', id)
            // .select('items.title')

        return response.json({ point: serializedPoint, items });
    }

    async create(request: Request, response: Response) {

        const {
            name, // request.body.name
            email, // request.body.email
            whatsapp, //
            latitude, //
            longitude, //
            city, //
            uf, //
            items //
        } = request.body;

        // aguarda todas os inserts serem concluídos com sucesso e se der erro em uma, todas as outras não serão realizadas
        const transaction = await knex.transaction();

        const pointData = {
            image: request.file.filename,
            name, // full sintax
            email, // short sintax = quando o nome da variável é igual o nome do objeto
            whatsapp, //
            latitude, //
            longitude, //
            city, //
            uf //
        };

        const insertedIds = await transaction('points').insert(pointData);

        const point_id = insertedIds[0];

        const pointItems = items
            .split(',')
            .map((item: string) => Number(item.trim()))
            .map((item_id: number) => {
                return {
                    item_id,
                    point_id,
                };
            });

        await transaction('point_items').insert(pointItems);

        await transaction.commit();

        return response.json({
            id: point_id,
            ...pointData
        });
    }
}

export default PointsController;