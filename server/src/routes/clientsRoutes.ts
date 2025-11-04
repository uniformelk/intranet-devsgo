import { Router } from 'express'
import { body, param } from 'express-validator'
import { ClientController } from '../controllers/ClientController'
import { handleInputErrors } from '../middleware/validation'

const router = Router()

router.post('/create', 
    body('id_cliente').notEmpty().isNumeric().withMessage('El ID del cliente es obligatorio y debe ser numérico'),
    body('nombre_cliente').notEmpty().isString().withMessage('El nombre del cliente es obligatorio'),
    body('password').notEmpty().isString().isMD5().withMessage('La contraseña es obligatoria y debe estar en formato MD5'),
    body('estado').notEmpty().isNumeric().withMessage('El estado es obligatorio y debe ser numérico').isIn([0, 1]).withMessage('El estado debe ser 0 o 1'),
    body('usuario_creacion').notEmpty().isString().withMessage('El usuario de creación es obligatorio'),
    handleInputErrors,
    ClientController.createClient
)

export default router
