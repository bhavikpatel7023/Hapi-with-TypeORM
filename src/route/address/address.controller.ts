import * as Hapi from '@hapi/hapi';
import { Connection, getCustomRepository } from "typeorm";
import { Address } from "./address.entity";
import { AddressRepository } from './address.repository';
import ResponseBuilder from '../../common/responseBuilder';

export default class AddressController {
  database: Connection;
  addressRepository: AddressRepository;

  constructor(database: Connection) {
    this.database = database;
    this.addressRepository = getCustomRepository(AddressRepository);
  }

  public async createAddress(request: Hapi.Request, response: Hapi.ResponseToolkit) {
    try {

      let entityInstance: Address = this.addressRepository.create(<Address>request.payload);
      let address: Address = await this.addressRepository.save(entityInstance);
      return new ResponseBuilder().setData(address);
    } catch (error) {
      console.log(error.stack);
      return new ResponseBuilder().setError(error);
    }
  }

  public async getAddressbyId(request: Hapi.Request, response: Hapi.ResponseToolkit) {
    try {
      let user: Address = await this.addressRepository.findOne(request.params.id);
      return new ResponseBuilder().setData(user);
    } catch (error) {
      console.log(error.stack);
      return new ResponseBuilder().setError(error);
    }
  }

  public async getAllAddress(request: Hapi.Request, response: Hapi.ResponseToolkit) {
    try {
      let userList: Address[] = await this.addressRepository.find()
      return new ResponseBuilder().setData(userList);
    } catch (error) {
      console.log(error.stack);
      return new ResponseBuilder().setError(error);
    }
  }

  public async deleteAddressById(request: Hapi.Request, response: Hapi.ResponseToolkit) {
    try {
      let deletedAddress:any = await this.addressRepository.delete(request.params.id)
      return new ResponseBuilder().setData(deletedAddress);
    } catch (error) {
      console.log(error.stack);
      return new ResponseBuilder().setError(error);
    }
  }

  public async updateAddressById(request: Hapi.Request, response: Hapi.ResponseToolkit) {
    try {
      const addressId: string = request.params.id;
      const address = <Address>request.payload;
      let updatedUser: any = await this.addressRepository.update(addressId, address)
      return new ResponseBuilder().setData(updatedUser);
    } catch (error) {
      console.log(error.stack);
      return new ResponseBuilder().setError(error);
    }
  }

}
