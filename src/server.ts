import * as Hapi from '@hapi/hapi';
import Inert = require('@hapi/inert');
import Vision = require('@hapi/vision');
import HapiSwagger = require('hapi-swagger');


export default class ServerManager{

    server:Hapi.Server;

    async startServer(){
            this.server = new Hapi.Server({
                port: 3000,
                host: 'localhost'
            });

            const swaggerOptions: HapiSwagger.RegisterOptions = {
                info: {
                    title: 'Test API Documentation'
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
                }
            ];
            await this.server.register(plugins);
            await this.server.start();
            console.log('Server running on %s', this.server.info.uri);
            return this.server;        
    }
}



// import Hapi = require('@hapi/hapi');
// // import * as Boom from "boom";
// import { IPlugin } from "./plugins/interfaces";
// import { IServerConfigurations } from "./configurations";

// export async function init(
//   configs: IServerConfigurations
// ): Promise<Hapi.Server> {
//   try {
//     const port = process.env.PORT || configs.port;
//     const server = new Hapi.Server({
//       debug: { request: ['error'] },
//       port: port,
//       routes: {
//         cors: {
//           origin: ["*"]
//         }
//       }
//     });

//     if (configs.routePrefix) {
//       server.realm.modifiers.route.prefix = configs.routePrefix;
//     }

//     //  Setup Hapi Plugins
//     const plugins: Array<string> = configs.plugins;
//     const pluginOptions = {
//       serverConfigs: configs
//     };

//     let pluginPromises: Promise<any>[] = [];

//     plugins.forEach((pluginName: string) => {
//       var plugin: IPlugin = require("./plugins/" + pluginName).default();
//       console.log(
//         `Register Plugin ${plugin.info().name} v${plugin.info().version}`
//       );
//       pluginPromises.push(plugin.register(server));
//     });

//     await Promise.all(pluginPromises);

//     console.log("All plugins registered successfully.");

//     console.log("Routes registered sucessfully.");

//     return server;
//   } catch (err) {
//     console.log("Error starting server: ", err);
//     throw err;
//   }
// }
