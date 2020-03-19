import * as Hapi from '@hapi/hapi';
import * as Joi from '@hapi/joi';
import {Connection} from "typeorm";
import UserController from "../controller/user";


export default function (
    server :Hapi.Server,
    database: Connection
  ) {
    // console.log(database);
    
    const userController = new UserController(database);
  
    server.route([{
      method: 'GET',
      path: '/',
      options: {
        handler: userController.test,
        tags: ["api", "test"],
        description: "Test API"
      }
    }]);

    server.route({
      method: "POST",
      path: "/user",
      handler: (request: Hapi.Request, response: Hapi.ResponseToolkit) => {  
        return userController.createUser(request,response);
      },
      options: {
        tags: ["api", "user"],
        description: "Insert user",
        validate: {
          payload: Joi.object({
            firstName: Joi.string().min(3).max(10),
            lastName: Joi.string().min(3).max(10),
            age: Joi.number().min(1).max(3)
        })
        }
      }
    });

    server.route({
      method: "GET",
      path: "/user",
      options: {
        handler: userController.getAllUser,
        tags: ["api", "tasks"],
        description: "Get all user"
      }
    });

    server.route({
      method: "GET",
      path: "/user/{id}",
      options: {
        handler: userController.getUserbyId,
        tags: ["api", "tasks"],
        description: "Get user by id.",
        validate: {
          params: Joi.object({
            id: Joi.number()
        })
        }
      }
    });

  }  