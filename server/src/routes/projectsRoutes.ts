import { Router } from 'express'
import { body, param } from 'express-validator'
import { ProjectController } from '../controllers/ProjectController'

const router = Router()

router.get('/', ProjectController.test)

export default router
