import { Router } from 'express'
import multer from 'multer'

import OrphanagesController from './controllers/OrphanagesController'
import uploadConfig from './config/upload'

const routes = Router()
const upload = multer(uploadConfig)

routes.get('/orphanages/:id', OrphanagesController.ListOne)
routes.get('/orphanages', OrphanagesController.ListMany)
routes.post('/orphanages', upload.array('images'), OrphanagesController.CreateOne)

export default routes