import https, { RequestOptions as httpsRequestOptions } from "https";
import http, { ClientRequest, IncomingMessage, RequestOptions as httpRequestOptions } from "http";

export const postData = <Data, Response>(url: string, data: Data) => new Promise<Response>((resolve, reject) => {
    if (!/^(http|https)\:\/\/.*/.test(url)) return reject('invalid url');
    const Url = new URL(url);
    const dataToSend = typeof data == 'object' ? JSON.stringify(data) : data

    const requestOptions: httpsRequestOptions | httpRequestOptions = {
        hostname: Url.host,
        port: Url.port.length ? Url.port : Url.protocol == 'https:' ? 443 : 80,
        path: encodeURI(Url.pathname),
        method: 'POST',
        headers: {
            "Api-Key": "your api key",
            'Content-Type': 'application/json'
        }
    }

    const req: ClientRequest = (Url.protocol == 'https:' ? https : http).request(requestOptions, (res: IncomingMessage): void => {
        let data: string = '';
        res.on('data', (chunkOfData: string): string => data += chunkOfData);
        res.on('end', (): void => resolve(JSON.parse(data)));
    });
    req.on('error', (error: Error): void => reject(error));
    req.write(dataToSend);
    req.end();
});

export const getData = <Response>(url: string) => new Promise<Response>((resolve, reject) => {
    if (!/^(http|https)\:\/\/.*/.test(url)) return reject('invalid url');
    const Url = new URL(url);

    const requestOptions: httpsRequestOptions | httpRequestOptions = {
        hostname: Url.host,
        port: Url.port.length ? Url.port : Url.protocol == 'https:' ? 443 : 80,
        path: encodeURI(Url.pathname),
        method: 'GET',
        headers: {
            "Api-Key": "your api key",
            'Content-Type': 'application/json'
        }
    }

    const req: ClientRequest = (Url.protocol == 'https:' ? https : http).request(requestOptions, (res: IncomingMessage): void => {
        let data: string = '';
        res.on('data', (chunkOfData: string): string => data += chunkOfData);
        res.on('end', (): void => resolve(JSON.parse(data)));
    });
    req.on('error', (error: Error): void => reject(error));
    req.end();
});
