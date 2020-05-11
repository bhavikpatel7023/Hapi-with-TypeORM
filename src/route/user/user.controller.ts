import * as Hapi from '@hapi/hapi';
import { Connection, getCustomRepository } from "typeorm";
import { User } from "./user.entity";
import { UserRepository } from './user.repository';
import ResponseBuilder from '../../common/responseBuilder';
import * as jwt from "jsonwebtoken";
import config from "../../config/config";
import {EntityNotFoundError} from "typeorm/error/EntityNotFoundError";

export default class UserController {
  database: Connection;
  userRepository: UserRepository;

  constructor(database: Connection) {
    this.database = database;
    this.userRepository = getCustomRepository(UserRepository);
  }

  public async login(request: Hapi.Request, response: Hapi.ResponseToolkit) {
    try{

      let user :User = <User>request.payload;
      let email :string =  user.email
      let password :string =  user.password
      try {
        user = await this.userRepository.findOneOrFail({ where: { email } });
      } catch (error) {
        return new ResponseBuilder().setError(error).setMessage('User doesnt exist').setStatusCode(401).setStatus(false);
      }
      if (!user.checkIfUnencryptedPasswordIsValid(password)) {
        return new ResponseBuilder().setMessage('Invalid password').setStatusCode(401).setStatus(false);
      }
      delete user.authToken;
      const token = jwt.sign(
        { user },
        config.jwtSecret
      );
      user.authToken = token;
      await this.userRepository.update(user.id,user);
      let updatedUser:User = await this.userRepository.findOne(user.id);
      delete updatedUser.password;
      return new ResponseBuilder().setData(updatedUser);
    } catch (error) {
      console.log(error.stack);
      return new ResponseBuilder().setError(error);
    }
  }

  public async createUser(request: Hapi.Request, response: Hapi.ResponseToolkit) {
    try {
      const entityInstance = this.userRepository.create( <User>request.payload);
      entityInstance.hashPassword();
      let user : User = await this.userRepository.save(entityInstance);
      if(user){
        return new ResponseBuilder().setData(user);
      }else{
        return new ResponseBuilder().setStatus(false).setStatusCode(404).setMessage('No user found');
      }


    } catch (error) {
      console.log(error.stack);
      return new ResponseBuilder().setError(error);
    }
  }

  public async getUserbyId(request: Hapi.Request, response: Hapi.ResponseToolkit) {
    try {
      let user: User = await this.userRepository.findOneOrFail(request.params.id);
      return new ResponseBuilder().setData(user);
    } catch (error) {
      console.log(error.stack);
      let response = new ResponseBuilder().setError(error);
      if (error instanceof EntityNotFoundError){
        response.setMessage('No user exist')
      }
      return response
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
      user.id = userId;
      let updatedUser: any = await this.userRepository.update(userId,user)
      return new ResponseBuilder().setData(updatedUser);
    } catch (error) {
      console.log(error.stack);
      return new ResponseBuilder().setError(error);
    }
  }



}
