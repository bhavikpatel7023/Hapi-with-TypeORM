import * as Hapi from '@hapi/hapi';
import Inert = require('@hapi/inert');
import Vision = require('@hapi/vision');
import jwt = require('hapi-auth-jwt2');
import HapiSwagger = require('hapi-swagger');


export default class ServerManager{

    server:Hapi.Server;

    async startServer(){
            this.server = new Hapi.Server({
                debug: { request: ['error'] },
                port: 3000,
                host: 'localhost',
                routes: {
                    cors: {
                        origin: ["*"]
                    }
                }
            });

            const swaggerOptions: HapiSwagger.RegisterOptions = {
                debug: true,
                info: {
                    'title': 'Documentation'
                },
                securityDefinitions: {
                    jwt: {
                        name: 'Authorization',
                        in: 'header'
                    }
                }
            };
            
            const plugins: Array<Hapi.ServerRegisterPluginObject<any>> = [
                {
                    plugin: Inert
                },
                {
                    plugin: Vision
                },
                {
                    plugin: HapiSwagger,
                    options: swaggerOptions
                },
                {
                    plugin: jwt
                }
            ];
            await this.server.register(plugins);
            return this.server;        
    }

}
