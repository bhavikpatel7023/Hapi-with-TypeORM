// import Server from './server';
import ServerManager from "./server";
import * as userRoute from './route/user';
import ConnectionManager from "./database";
import { Connection } from "typeorm";
import "reflect-metadata";

const init = async () => {

  const server: ServerManager = new ServerManager()
  const connection: Connection = await new ConnectionManager().getConnection()
  // console.log(connection);
  
  userRoute.default(await server.startServer(),connection)

}

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});
init();



// import * as Server from "./server";
// import * as Database from "./database";
// import * as Configs from "./configurations";

// console.log(`Running environment ${process.env.NODE_ENV || "dev"}`);

// // Catch unhandling unexpected exceptions
// process.on("uncaughtException", (error: Error) => {
//   console.error(`uncaughtException ${error.message}`);
// });

// // Catch unhandling rejected promises
// process.on("unhandledRejection", (reason: any) => {
//   console.error(`unhandledRejection ${reason}`);
// });

// // Define async start function
// const start = async ({ config }) => {
//   try {
//     const server = await Server.init(config);
//     await server.start();
//     console.log("Server running at:", server.info.uri);
//   } catch (err) {
//     console.error("Error starting server: ", err.message);
//     throw err;
//   }
// };

// // Init Database
// const dbConfigs = Configs.getDatabaseConfig();
// const database = Database.init(dbConfigs);

// // Starting Application Server
// const serverConfigs = Configs.getServerConfigs();

// // Start the server
// start({ config: serverConfigs});
