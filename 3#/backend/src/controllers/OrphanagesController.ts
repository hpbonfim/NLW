import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import * as Yup from 'yup'

import orphanageView from '../views/orphanages_view'

import Orphanage from '../models/Orphanage'

export default {
    async ListMany(request: Request, response: Response) {
        const orphanagesRepository = getRepository(Orphanage)

        const orphanages = await orphanagesRepository.find({
            relations: ['images'],
        })

        return response.json(orphanageView.renderMany(orphanages))
    },

    async ListOne(request: Request, response: Response) {
        const { id } = request.params

        const orphanagesRepository = getRepository(Orphanage)

        const orphanage = await orphanagesRepository.findOneOrFail(id, {
            relations: ['images'],
        })

        return response.json(orphanageView.render(orphanage))
    },

    async CreateOne(request: Request, response: Response) {
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends
        } = request.body

        const orphanagesRepository = getRepository(Orphanage)

        const requestImages = request.files as Express.Multer.File[]

        const images = requestImages.map(image => {
            return {
                path: image.filename
            }
        })

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
            images,
        }

        const schema = Yup.object().shape({
            name: Yup.string().required('Nome Obrigatório'),
            latitude: Yup.number().required('Latitude Obrigatório'),
            longitude: Yup.number().required('Longitude Obrigatório'),
            about: Yup.string().max(300).required('About Obrigatório'),
            instructions: Yup.string().required('Instruções Obrigatórios'),
            opening_hours: Yup.string().required('Horário Obrigatório'),
            open_on_weekends: Yup.boolean().required('Aberto aos Fins de semana Obrigatório'),
            images: Yup.array(Yup.object().shape({
                path: Yup.string().required('Arquivo Obrigatório'),
            })),
        })

        await schema.validate(data, { abortEarly: false })

        const orphanage = orphanagesRepository.create(data)

        await orphanagesRepository.save(orphanage)

        return response.status(201).json(orphanage)
    }
}