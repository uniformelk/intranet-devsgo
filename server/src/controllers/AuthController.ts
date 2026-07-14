import colors from 'colors'
import type { Request, Response } from "express"
import { validationResult } from 'express-validator'
import { Usuario } from '../models/users';

export class AuthController {

    static login = async (req: Request, res: Response) => {
        try {
            const { usuario, password } = req.body;
            const user = await Usuario.findOne({ where: { usuario } })
            if (!user) {
                const error = new Error('Usuario no encontrado');
                return res.status(404).json({ "response": error.message });
            }

            if (user.password !== password) {
                const error = new Error('Contraseña incorrecta');
                return res.status(401).json({ "response": error.message });
            }

            return res.status(200).send({
                "response": {
                    "id_usuario": user.id_usuario,
                    "usuario": user.usuario,
                    "nombre": user.nombres,
                    "apellido": user.apellidos,
                    "estado": user.estado,
                    "rol": user.rol,
                },
                "message": 'Usuario logueado correctamente',
            });
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error)
            console.error(colors.red.bold(`Error al iniciar sesión: ${errMsg}`))
            res.status(500).json({ message: 'Error al iniciar sesión', error: errMsg })
        }
    }

}
