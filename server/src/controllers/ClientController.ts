import colors from 'colors'
import type { Request, Response } from "express"
import { validationResult } from 'express-validator'
import Cliente from '../models/cliente'

export class ClientController {

    static createClient = async (req: Request, res: Response) =>{
        // Validation
        const {id_cliente} = req.body;

        // Validation to check if user already exists
        const userExist = await Cliente.findOne({where: {id_cliente}})
        if(userExist){
            const error = new Error('El usuario ya esta registrado')
            res.status(409).json({error: error.message})
            return
        }
        
        
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        
        try{
            const client = new Cliente(req.body)
            await client.save()
            res.status(201).send('Cliente creado correctamente')
        }catch(error){
            const errMsg = error instanceof Error ? error.message : String(error)
            console.error(colors.red.bold(`Error al crear el cliente: ${errMsg}`))
            res.status(500).json({ message: 'Error al crear el cliente', error: errMsg })
        }
    }

}