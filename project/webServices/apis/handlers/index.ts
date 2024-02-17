import { Application, Request, Response } from "express";


export default (app: Application) => {
    app.get('/', (req: Request, res: Response): void => {
        res.send('hello world').end();
    })
}