import express from 'express';
import dotenv from 'dotenv';
import projectRoutes from './routes/projectsRoutes';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/projects', projectRoutes)

export default app;