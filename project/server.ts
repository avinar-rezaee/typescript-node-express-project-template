import 'dotenv/config';
import cluster, { Worker } from "cluster";
import os from "os";
import { Server } from "http";
import express, { Application, Request, Response, NextFunction } from "express";
import config from './config';
import ip from "ip";
import bodyParser from "body-parser";
import { queryParser } from "express-query-parser";
import apis from './webServices/apis/apis';


const CPUs = os.cpus();

const app = express();
const port: number = config.consts.server.port;
const httpServer = new Server(app);
if (cluster.isPrimary) {
    console.log(`Cluster master ${process.pid} is running.`);

    cluster.setupPrimary();

    const online_workers: Worker[] = []
    for (const i in CPUs) {
        cluster.fork();
    }
    cluster.on('online', worker => {
        console.log('worker', worker.process.pid, 'is online');
        if (!online_workers.length) online_workers.push(worker);
    });
    cluster.on('exit', worker => {
        console.log('worker', worker.process.pid, 'died');
        cluster.fork();
        for (const i in cluster.workers) {
            console.log('worker', cluster.workers[i]?.process.pid, 'is online');
        }
    });

    cluster.on('message', async (worker, message) => {

    });
}
else {
    console.log(`Cluster worker ${process.pid} started`);

    httpServer.listen(port, () => {
        console.log(`Server is running on ${ip.address()}:${port}`);
    });

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(
        queryParser({
            parseNull: true,
            parseUndefined: true,
            parseBoolean: true,
            parseNumber: true
        })
    );

    app.use((req: Request, res: Response, next: NextFunction) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token");
        next();
    });


    apis(app);

    const url = new URL("https://www.w3schools.com/nodejs/nodejs_url.asp");
    const url2 = new URL("http://localhost:8080/default.htm?year=2017&month=february");
    const url3 = new URL("http://192.168.0.1:80");
    console.log(url);
    console.log(url2);
    console.log(url3);


}
