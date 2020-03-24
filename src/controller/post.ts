import * as Hapi from '@hapi/hapi';
import { Connection, getCustomRepository } from "typeorm";
import ResponseBuilder from '../common/ResponseBuilder';
import { PostRepository } from '../repository/postRepository';
import { Post } from '../entity/Post';
import { UserRepository } from '../repository/userRepository';
import { User } from '../entity/User';


export default class PostController {
  database: Connection;
  postRepository: PostRepository;
  userRepository: UserRepository;

  constructor(database: Connection) {
    this.database = database;
    this.postRepository = getCustomRepository(PostRepository);
    this.userRepository = getCustomRepository(UserRepository);
  }

  public async createPost(request: Hapi.Request, response: Hapi.ResponseToolkit) {
    try {
      const userId: string = request.params.userId;
      const user: User = await this.userRepository.findOne(userId);
      const newpost = <Post>request.payload;
      newpost.user = user
      let post: Post = await this.postRepository.save(newpost);
      return new ResponseBuilder().setData(post);
    } catch (error) {
      console.log(error.stack);
      return new ResponseBuilder().setError(error);
    }
  }

  public async getPostbyId(request: Hapi.Request, response: Hapi.ResponseToolkit) {
    try {
      const id: string = request.params.id;
      let post: Post= await this.postRepository.findOne(id);
      return new ResponseBuilder().setData(post);
    } catch (error) {
      console.log(error.stack);
      return new ResponseBuilder().setError(error);
    }
  }

  public async getAllPost(request: Hapi.Request, response: Hapi.ResponseToolkit) {
    try {
      let postList: Post[] = []
      if (request.params.userId) {
        const userId = request.params.userId;     
        postList = await this.postRepository.find({ 
          where: [{ user: userId}] 
        });
      } else {
        postList = await this.postRepository.find()
      }
      return new ResponseBuilder().setData(postList);
    } catch (error) {
      console.log(error.stack);
      return new ResponseBuilder().setError(error);
    }
  }

  public async deletePostById(request: Hapi.Request, response: Hapi.ResponseToolkit) {
    try {
      const id = request.params.id;
      let deletedpost: any = await this.postRepository.delete(id)
      return new ResponseBuilder().setData(deletedpost);
    } catch (error) {
      console.log(error.stack);
      return new ResponseBuilder().setError(error);
    }
  }

  public async updatePostById(request: Hapi.Request, response: Hapi.ResponseToolkit) {
    try {
      const postId: string = request.params.id;
      const post = <Post>request.payload;
      let updatedpost: any = await this.postRepository.update(postId, post)
      return new ResponseBuilder().setData(updatedpost);
    } catch (error) {
      console.log(error.stack);
      return new ResponseBuilder().setError(error);
    }
  }

}