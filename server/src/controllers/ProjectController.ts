import colors from 'colors'
import type { Request, Response } from "express"

export class ProjectController {

    static test(req: Request, res: Response) {
        res.send("🚀 API funcionando correctamente");
    }
}