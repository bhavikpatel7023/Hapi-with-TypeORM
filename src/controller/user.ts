import * as Hapi from '@hapi/hapi';
import { Connection, getCustomRepository } from "typeorm";
import { User } from "../entity/User";
import { UserRepository } from '../repository/userRepository';
import ResponseBuilder from '../common/ResponseBuilder';


export default class UserController {
  database: Connection;
  userRepository: UserRepository;

  constructor(database: Connection) {
    this.database = database;
    this.userRepository = getCustomRepository(UserRepository);
  }

  public async test(request: Hapi.Request, response: Hapi.ResponseToolkit) {
    return response.response('test').code(200);

  }

  public async createUser(request: Hapi.Request, response: Hapi.ResponseToolkit) {

    const newUser = <User>request.payload;

    try {
      let user: User = await this.userRepository.save(newUser);
      return new ResponseBuilder().setData(user);
    } catch (error) {
      console.log(error.stack);
      return new ResponseBuilder().setError(error);
    }
  }

  public async getUserbyId(request: Hapi.Request, response: Hapi.ResponseToolkit) {
    try {
      let user: User = await this.userRepository.findOne(request.params.id);
      return new ResponseBuilder().setData(user);
    } catch (error) {
      console.log(error.stack);
      return new ResponseBuilder().setError(error);
    }
  }

  public async getAllUser(request: Hapi.Request, response: Hapi.ResponseToolkit) {
    try {
      let userList: User[] = await this.userRepository.find()
      return new ResponseBuilder().setData(userList);
    } catch (error) {
      console.log(error.stack);
      return new ResponseBuilder().setError(error);
    }
  }

  public async deleteUserById(request: Hapi.Request, response: Hapi.ResponseToolkit) {
    try {
      let deletedUser: any = await this.userRepository.delete(request.params.id)
      return new ResponseBuilder().setData(deletedUser);
    } catch (error) {
      console.log(error.stack);
      return new ResponseBuilder().setError(error);
    }
  }

  public async updateUserById(request: Hapi.Request, response: Hapi.ResponseToolkit) {
    try {
      const userId: string = request.params.id;
      const user = <User>request.payload;
      let updatedUser: any = await this.userRepository.update(userId, user)
      return new ResponseBuilder().setData(updatedUser);
    } catch (error) {
      console.log(error.stack);
      return new ResponseBuilder().setError(error);
    }
  }

}