import * as Hapi from '@hapi/hapi';
import * as Joi from '@hapi/joi';
import { Connection } from "typeorm";
import PostController from '../controller/post';


export default function (
  server: Hapi.Server,
  database: Connection
) {

  const postController = new PostController(database);

  server.route({
    method: "POST",
    path: "/user/{userId}/post",
    handler: (request: Hapi.Request, response: Hapi.ResponseToolkit) => {
      return postController.createPost(request, response);
    },
    options: {
      tags: ["api", "post"],
      description: "Insert post",
      validate: {
        params: Joi.object({
          userId: Joi.number()
        }),
        payload: Joi.object({
          content: Joi.string().min(3).max(10000)
        })
      }
    }
  });

  server.route({
    method: "GET",
    path: "/post",
    handler: (request: Hapi.Request, response: Hapi.ResponseToolkit) => {
      return postController.getAllPost(request, response);
    },
    options: {
      tags: ["api", "tasks"],
      description: "Get all post"
    }
  });

  server.route({
    method: "GET",
    path: "/user/{userId}/post",
    handler: (request: Hapi.Request, response: Hapi.ResponseToolkit) => {
      return postController.getAllPost(request, response);
    },
    options: {
      tags: ["api", "tasks"],
      description: "Get all post by userId",
      validate: {
        params: Joi.object({
          userId: Joi.number()
        })
      }
    }
  });

  server.route({
    method: "GET",
    path: "/post/{id}",
    handler: (request: Hapi.Request, response: Hapi.ResponseToolkit) => {
      return postController.getPostbyId(request, response);
    },
    options: {
      tags: ["api", "tasks"],
      description: "Get post by id.",
      validate: {
        params: Joi.object({
          id: Joi.number()
        })
      }
    }
  });

  server.route({
    method: "PUT",
    path: "/post/{id}",
    handler: (request: Hapi.Request, response: Hapi.ResponseToolkit) => {
      return postController.updatePostById(request, response);
    },
    options: {
      tags: ["api", "tasks"],
      description: "Update post by id.",
      validate: {
        params: Joi.object({
          id: Joi.number()
        }),
        payload: Joi.object({
          content: Joi.string().min(3).max(100000)
        })
      }
    }
  });

  server.route({
    method: "DELETE",
    path: "/post/{id}",
    handler: (request: Hapi.Request, response: Hapi.ResponseToolkit) => {
      return postController.deletePostById(request, response);
    },
    options: {
      tags: ["api", "tasks"],
      description: "Delete post by id.",
      validate: {
        params: Joi.object({
          id: Joi.number()
        })
      }
    }
  });

}  