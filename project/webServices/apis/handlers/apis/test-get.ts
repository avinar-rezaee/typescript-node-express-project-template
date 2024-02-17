import { Application, Request, Response } from "express";
import { getData } from "../../../../../project-core/GlobalFunctions";
import { RequestHandlerType } from "../../../../../project-core/GlobalTypesAndInterfaces";
import config from "../../../../config";



export default (app: Application) => {
    app.get('/api/test-get', async (req: Request, res: Response): Promise<RequestHandlerType> => {

        type Result = { foo: "bar" }
        try {

            const url = `${config.consts.serviceProviderServer.url}/api/test_get`;

            const result = await getData<Result>(url);
            res.status(200).send({ result }).end();


        } catch (error: any) {
            console.error(error);
            res.status(500).send({ error: 'خطایی پیش آمد' }).end();
        }
    });
}