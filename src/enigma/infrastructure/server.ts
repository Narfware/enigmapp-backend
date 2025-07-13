import express, { Express } from 'express';
import { createServer, Server as HttpServer } from 'node:http';
import { Server as SocketServer } from 'socket.io';
import bodyParser from 'body-parser';
import compress from 'compression'
import helmet from 'helmet'


export class Server {
    private _express: Express
    private _port: string
    private _httpServer?: HttpServer
    private _socketServer?: SocketServer

    constructor(port: string) {
        this._port = port
        this._express = express()
        this._express.use(bodyParser.json());
        this._express.use(bodyParser.urlencoded({ extended: true }));
        this._express.use(helmet.xssFilter());
        this._express.use(helmet.noSniff());
        this._express.use(helmet.hidePoweredBy());
        this._express.use(helmet.frameguard({ action: 'deny' }));
        this._express.use(compress());

        this._httpServer = createServer(this._express)
        this._socketServer = new SocketServer(this._httpServer)
    }


    async listenHttp(): Promise<void> {
        return new Promise(resolve => {
            this._httpServer = this._express.listen(this._port, () => {
                console.log(
                    `Running enigmApp in port ${this._port}`
                );
                resolve();
            });
        });
    }


    async stop(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (this._httpServer) {
                this._httpServer.close(error => {
                    if (error) {
                        return reject(error);
                    }
                    return resolve();
                });
            }

            return resolve();
        });
    }


    get httpServer() {
        return this._httpServer
    }

    get socketServer() {
        return this._socketServer
    }

}