import * as Hapi from '@hapi/hapi';
import {Connection} from "typeorm";
import { User } from "../entity/User";


export default class UserController {
  database: Connection;

  constructor(database: Connection) {
    this.database = database;
  }

  public async test(request: Hapi.Request, response: Hapi.ResponseToolkit) {  
      return response.response('test').code(200);
   
  }

  public async createUser(request: Hapi.Request, response: Hapi.ResponseToolkit) {

    const newUser =  <User> request.payload;

    try {
      let user: User = await this.database.getRepository(User).save(newUser)
      return response.response(user).code(200);
    } catch (error) {
      console.log(error.stack);
      return response.response(error.stack).code(500);
    }
  }

  public async getUserbyId(request: Hapi.Request, response: Hapi.ResponseToolkit) {
    try {
      let user: User = await User.findOne(1);
      console.log(user);
      return response.response(user).code(200);
    } catch (error) {
      console.log(error.stack);
      return response.response(error.stack).code(500);
    }
  }

  public async getAllUser(request: Hapi.Request, response: Hapi.ResponseToolkit) {
    try {
      let userList: User[] = await User.find();
      console.log(userList);
      
      return response.response(userList).code(200);
    } catch (error) {
      console.log(error.stack);
      return response.response(error.stack).code(500);
    }
  }


}