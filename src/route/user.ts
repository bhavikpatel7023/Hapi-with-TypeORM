import * as Hapi from '@hapi/hapi';
import * as Joi from '@hapi/joi';
import { Connection } from "typeorm";
import UserController from "../controller/user";


export default function (
  server: Hapi.Server,
  database: Connection
) {

  const userController = new UserController(database);
  server.route({
    method: 'GET',
    path: '/',
    options: {
      handler: userController.test,
      tags: ["api", "test"],
      description: "Test API"
    }
  });

  server.route({
    method: "POST",
    path: "/user",
    handler: (request: Hapi.Request, response: Hapi.ResponseToolkit) => {
      return userController.createUser(request, response);
    },
    options: {
      tags: ["api", "user"],
      description: "Insert user",
      validate: {
        payload: Joi.object({
          firstName: Joi.string().min(3).max(10),
          lastName: Joi.string().min(3).max(10),
          age: Joi.number().min(1).max(120)
        })
      }
    }
  });

  server.route({
    method: "GET",
    path: "/user",
    handler: (request: Hapi.Request, response: Hapi.ResponseToolkit) => {
      return userController.getAllUser(request, response);
    },
    options: {
      tags: ["api", "tasks"],
      description: "Get all user"
    }
  });

  server.route({
    method: "GET",
    path: "/user/{id}",
    handler: (request: Hapi.Request, response: Hapi.ResponseToolkit) => {
      return userController.getUserbyId(request, response);
    },
    options: {
      tags: ["api", "tasks"],
      description: "Get user by id.",
      validate: {
        params: Joi.object({
          id: Joi.number()
        })
      }
    }
  });

  server.route({
    method: "PUT",
    path: "/user/{id}",
    handler: (request: Hapi.Request, response: Hapi.ResponseToolkit) => {
      return userController.updateUserById(request, response);
    },
    options: {
      tags: ["api", "tasks"],
      description: "Update user by id.",
      validate: {
        params: Joi.object({
          id: Joi.number()
        }),
        payload: Joi.object({
          firstName: Joi.string().min(3).max(10),
          lastName: Joi.string().min(3).max(10),
          age: Joi.number().min(1).max(120)
        })
      }
    }
  });

  server.route({
    method: "DELETE",
    path: "/user/{id}",
    handler: (request: Hapi.Request, response: Hapi.ResponseToolkit) => {
      return userController.deleteUserById(request, response);
    },
    options: {
      tags: ["api", "tasks"],
      description: "Delete user by id.",
      validate: {
        params: Joi.object({
          id: Joi.number()
        })
      }
    }
  });

}  