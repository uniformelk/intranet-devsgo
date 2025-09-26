import express from 'express'
import dotenv from 'dotenv'
import projectRoutes from './routes/projectsRoutes'
import healthRoutes from './routes/healthRoutes'
import { connectDB } from './config/db'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

app.use('/api/health', healthRoutes)
app.use('/api/projects', projectRoutes)

export default app
