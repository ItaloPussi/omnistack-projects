import express from 'express'
import 'express-async-errors'
import cors from 'cors'
import path from 'path'
import routes from './routes'
import './database/connection'

const app = express()
app.use(express.json())
app.use(cors())
app.use(routes)
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))
app.listen(3333)

