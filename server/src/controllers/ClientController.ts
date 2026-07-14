import colors from 'colors'
import type { Request, Response } from "express"
import { validationResult } from 'express-validator'
import { Cliente } from '../models/client'

export class ClientController {

    static createClient = async (req: Request, res: Response) => {
        // Validation
        const { id_cliente } = req.body;

        // Validation to check if user already exists
        const userExist = await Cliente.findOne({ where: { id_cliente } })
        if (userExist) {
            const error = new Error('El usuario ya esta registrado')
            return res.status(409).json({ "response": error.message })
        }

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        try {
            const client = new Cliente(req.body)
            await client.save()
            return res.status(200).send({ "response": "Cliente creado correctamente" })
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error)
            console.error(colors.red.bold(`Error al crear el cliente: ${errMsg}`))
            res.status(500).json({ message: 'Error al crear el cliente', error: errMsg })
        }
    }

    static getAllClients = async (req: Request, res: Response) => {
        try {
            const clients = await Cliente.findAll({ attributes: ['id_cliente', 'nombre_cliente', 'estado'] })
            return res.status(200).json({ "response": clients });
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error)
            console.error(colors.red.bold(`Error al obtener los clientes: ${errMsg}`))
            return res.status(500).json({ message: 'Error al obtener los clientes', error: errMsg })
        }
    }

    static getActiveClients = async (req: Request, res: Response) => {
        try {
            const clients = await Cliente.findAll({ where: { estado: 1 }, attributes: ['id_cliente', 'nombre_cliente', 'estado'] })
            return res.status(200).json({ "response": clients });
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error)
            console.error(colors.red.bold(`Error al obtener los clientes activos: ${errMsg}`))
            return res.status(500).json({ message: 'Error al obtener los clientes activos', error: errMsg })
        }
    }

}