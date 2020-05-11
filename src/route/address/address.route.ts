import * as Hapi from '@hapi/hapi';
import * as Joi from '@hapi/joi';
import { Connection } from "typeorm";
import AddressController from "./address.controller";


export default function (
  server: Hapi.Server,
  database: Connection
) {

  const addressController = new AddressController(database);

  server.route({
    method: "POST",
    path: "/address",
    handler: (request: Hapi.Request, response: Hapi.ResponseToolkit) => {
      return addressController.createAddress(request, response);
    },
    options: {
      tags: ["api", "address"],
      description: "Insert address",
      validate: {
        payload: Joi.object({
          street: Joi.string().min(1).max(30),
          unitNumber: Joi.string().optional().min(1).max(10),
          city: Joi.string().min(1).max(30),
          province: Joi.string().min(1).max(20),
          country: Joi.string().min(1).max(20),
          postalCode: Joi.string().min(1).max(10)
        })
      }
    }
  });

  server.route({
    method: "GET",
    path: "/address",
    handler: (request: Hapi.Request, response: Hapi.ResponseToolkit) => {
      return addressController.getAllAddress(request, response);
    },
    options: {
      tags: ["api", "tasks"],
      description: "Get all address"
    }
  });

  server.route({
    method: "GET",
    path: "/address/{id}",
    handler: (request: Hapi.Request, response: Hapi.ResponseToolkit) => {
      return addressController.getAddressbyId(request, response);
    },
    options: {
      tags: ["api", "address"],
      description: "Get address by id.",
      validate: {
        params: Joi.object({
          id: Joi.string().uuid()
        })
      }
    }
  });

  server.route({
    method: "PUT",
    path: "/address/{id}",
    handler: (request: Hapi.Request, response: Hapi.ResponseToolkit) => {
      return addressController.updateAddressById(request, response);
    },
    options: {
      tags: ["api", "address"],
      description: "Update address by id.",
      validate: {
        params: Joi.object({
          id: Joi.string().uuid()
        }),
        payload: Joi.object({
          id: Joi.string().uuid(),
          street: Joi.string().min(1).max(30),
          unitNumber: Joi.string().optional().min(1).max(10),
          city: Joi.string().min(1).max(30),
          province: Joi.string().min(1).max(20),
          country: Joi.string().min(1).max(20),
          postalCode: Joi.string().min(1).max(10)
        })
      }
    }
  });

  server.route({
    method: "DELETE",
    path: "/address/{id}",
    handler: (request: Hapi.Request, response: Hapi.ResponseToolkit) => {
      return addressController.deleteAddressById(request, response);
    },
    options: {
      tags: ["api", "address"],
      description: "Delete address by id.",
      validate: {
        params: Joi.object({
          id: Joi.string().uuid()
        })
      }
    }
  });

}  
