import { Application, Request, Response } from "express";
import { postData } from "../../../../../project-core/GlobalFunctions";
import { RequestHandlerType } from "../../../../../project-core/GlobalTypesAndInterfaces";
import config from "../../../../config";



export default (app: Application) => {
    app.post('/api/test-post', async (req: Request, res: Response): Promise<RequestHandlerType> => {

        type DataToSend = { message: string }
        type Result = { youSent: DataToSend }
        type Body = { messageToServer?: string }
        try {
            const { messageToServer }: Body = req.body;

            if (!messageToServer || typeof messageToServer != 'string') return res.status(400).send('bad request').end();


            const dataToSend: DataToSend = { message: messageToServer }
            const url = `${config.consts.serviceProviderServer.url}/api/test_post`;

            const result = await postData<DataToSend, Result>(url, dataToSend);
            res.status(200).send({ result }).end();


        } catch (error: any) {
            console.error(error);
            res.status(500).send({ error: 'خطایی پیش آمد' }).end();
        }
    });
}