import express from 'express'
import './database/connection'
import routes from './routes'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(express.json())
app.use(routes)
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))

app.listen(process.env.PORT || 3333)