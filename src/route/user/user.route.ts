import * as Hapi from '@hapi/hapi';
import * as Joi from '@hapi/joi';
import { Connection } from "typeorm";
import UserController from "./user.controller";
import {handleError} from "../../common/handleError";


export default function (
  server: Hapi.Server,
  database: Connection
) {

  const userController = new UserController(database);

  server.route({
    method: "POST",
    path: "/login",
    handler: (request: Hapi.Request, response: Hapi.ResponseToolkit) => {
      return userController.login(request, response);
    },
    options: {
      tags: ["api", "user"],
      description: "Login",
      auth: false,
      validate: {
        payload: Joi.object({
          email: Joi.string().min(6).max(50),
          password: Joi.string().min(6).max(20)
        })
      }
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
      auth: false,
      validate: {
        payload: Joi.object({
          firstName: Joi.string().min(2).max(30),
          lastName: Joi.string().min(2).max(30),
          email: Joi.string().min(6).max(50),
          password: Joi.string().min(6).max(20),
          dob: Joi.date().optional(),
          phoneNumber: Joi.string().min(9).max(12),
          isBusiness: Joi.boolean().default(false),
          isActive: Joi.boolean().default(true),
          profilePicture: Joi.string().min(3).max(10)
        }),
        failAction: handleError
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
      auth: false,
      // auth: {
      //   strategy: 'jwt'
      // },
      tags: ["api", "tasks"],
      description: "Get all user",
    }
  });

  server.route({
    method: "GET",
    path: "/user/{id}",
    handler: (request: Hapi.Request, response: Hapi.ResponseToolkit) => {
      return userController.getUserbyId(request, response);
    },
    options: {
      auth: {
        strategy: 'jwt'
      },
      tags: ["api", "tasks"],
      description: "Get user by id.",
      validate: {
        params: Joi.object({
          id: Joi.string().uuid()
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
          id: Joi.string().uuid()
        }),
        payload: Joi.object({
          firstName: Joi.string().min(2).max(30),
          lastName: Joi.string().min(2).max(30),
          email: Joi.string().min(6).max(50),
          password: Joi.string().min(6).max(20),
          dob: Joi.date().optional(),
          phoneNumber: Joi.string().min(9).max(12),
          isBusiness: Joi.boolean().default(false),
          isActive: Joi.boolean().default(true),
          isApproved: Joi.boolean(),
          profilePicture: Joi.string().min(3).max(10)
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
          id: Joi.string().uuid()
        })
      }
    }
  });

}  
