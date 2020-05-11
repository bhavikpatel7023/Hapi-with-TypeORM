import ServerManager from "./server";
import ConnectionManager from "./database";
import {Connection, getCustomRepository, getRepository, Repository} from "typeorm";
import "reflect-metadata";
import * as glob from 'glob'
import {User} from "./route/user/user.entity";
import {UserRepository} from "./route/user/user.repository";
import config from "./config/config";
import {ValidationResult} from "hapi-auth-jwt2";
import * as Hapi from "@hapi/hapi";
import SessionManager from "./common/sessionManager";
import * as functions from 'firebase-functions'
let server;
let connection: Connection;

const validate = async function (decoded, request: Hapi.Request, response: Hapi.ResponseToolkit) : Promise<ValidationResult> {
  let userRepository = getCustomRepository(UserRepository);
  let user: User = await userRepository.findOne(decoded.user.id);
  if(!user){
    return <ValidationResult>{ isValid: false }
  }
  if (user.id === decoded.user.id && user.authToken === request.headers.authorization) {
    SessionManager.setSession(decoded.user.email)
    return <ValidationResult>{ isValid: true }
  }
  return <ValidationResult>{ isValid: false }
};

const init = async () => {
  const serverManager: ServerManager = new ServerManager();
  connection= await new ConnectionManager().getConnection();
  server = await serverManager.startServer();
  server.auth.strategy('jwt', 'jwt',
      { key: config.jwtSecret, // Never Share your secret key
        validate: validate // validate function defined above//
        ,verifyOptions: { algorithms: [ 'HS256' ] }
      });
  server.auth.default("jwt");
  glob("**/*.route.ts", {}, function (er, files) {
    for(let file of files){
      require(__dirname+'/../'+ file).default(server,connection)
    }
  })

  glob("src/**/*.entity.ts", {}, function (er, files) {
    console.log(files)
  })
  await server.start();
  console.log('Server running on %s', server.info.uri);
}




process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});
init()

export const app = functions.https.onRequest(server);

