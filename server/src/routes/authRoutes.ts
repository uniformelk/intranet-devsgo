import { Router } from 'express'
import { body, param } from 'express-validator'
import { AuthController } from '../controllers/AuthController'
import { handleInputErrors } from '../middleware/validation'


const router = Router()

router.post('/login',
    body('usuario').notEmpty().isString().withMessage('El usuario es obligatorio'),
    body('password').notEmpty().isString().withMessage('La contraseña es obligatoria'),
    body('password').isMD5().withMessage('Formato de contraseña incorrecto'),
    handleInputErrors,
    AuthController.login
)

export default router
