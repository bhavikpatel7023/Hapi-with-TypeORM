import * as Hapi from '@hapi/hapi';
import { Connection } from "typeorm";

export default function (
  server: Hapi.Server,
  database: Connection
) {

  server.route({
    method: 'GET',
    path: '/',
    options: {
      handler:  function(request: Hapi.Request, response: Hapi.ResponseToolkit) {
        return response.response('Hey, Server is up').code(200);
      },
      tags: ["api", "test"],
      description: "Test API"
    }
  });

}  
