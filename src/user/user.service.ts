import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';

import { isValidObjectId, Model } from 'mongoose';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  constructor(

    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {

  }
  /**
   * A description of the entire function.
   *
   * @param {CreateUserDto} createUserDto - description of parameter
   * @return {Promise<any>} description of return value
   */
  async create(createUserDto: CreateUserDto) {
    createUserDto.name = createUserDto.name.toLowerCase();
    createUserDto.email = createUserDto.email.toLowerCase();
    createUserDto.surname = createUserDto.surname.toLowerCase();
    try {
      console.log(createUserDto);
      const newUSer = await this.userModel.create(createUserDto);
      return newUSer;
    } catch (error) {
      this.handleException(error)
    }
  }

  /**
   * Find all users.
   *
   * @return {Promise<User[]>} A promise that resolves with an array of users.
   */
  async findAll() {
    return await this.userModel.find();
  }

  /**
   * A function to find a user by id, email, or username.
   *
   * @param {string} id - The id, email, or username of the user to find
   * @return {Promise<User>} The user found
   */
  async findOne(id: string) {
    let user: User
    //busqueda por email
    if (!user) {
      id = id.toLowerCase()
      user = await this.userModel.findById({ email: id })
    }
    //busqueda por id
    if (!user && isValidObjectId(id)) {
      user = await this.userModel.findById(id)
    }
    //buqueda por nombre de usuario
    if (!user) {
      id = id.toLowerCase()
      user = await this.userModel.findOne({ name: id })
    }
    if (!user) {
      throw new BadRequestException(`user with id ${id} not found`)
    }
    return user;
  }

  /**
   * A description of the entire function.
   *
   * @param {string} id - description of parameter
   * @param {UpdateUserDto} updateUserDto - description of parameter
   * @return {Promise<User>} description of return value
   */
  async update(id: string, updateUserDto: UpdateUserDto) {

    //validamos si vienen o no las siguientes variables para no romper el sistema
    if (updateUserDto.name) {
      updateUserDto.name = updateUserDto.name.toLowerCase();
    }
    if (updateUserDto.email) {
      updateUserDto.email = updateUserDto.email.toLowerCase();
    }
    if (updateUserDto.surname) {
      updateUserDto.surname = updateUserDto.surname.toLowerCase();
    }

    const user = await this.userModel.findOne({ _id: id })
    if (!user) {
      throw new BadRequestException(`user with id ${id} not found`)
    }
    try {
      user.name = updateUserDto.name || user.name
      user.surname = updateUserDto.surname || user.surname
      user.email = updateUserDto.email || user.email
      user.age = updateUserDto.age || user.age
      user.country = updateUserDto.country || user.country
      user.city = updateUserDto.city || user.city
      user.hobbies = updateUserDto.hobbies || user.hobbies
      user.save()
    } catch (error) {
      this.handleException(error)
    }


    return user;
  }

  /**
   * 
   * @param {string} id - description of parameter
   * @return {string} description of return value
   */
  async remove(id: string) {
    this.userModel.deleteOne({ _id: id })
    return `The user with id #${id} has been deleted`;
  }


  /**
   * handleException function to handle errors.
   *
   * @param {any} error - the error to be handled
   * @return {void} throws a BadRequestException
   */
  private handleException(error: any) {
    throw new BadRequestException(`user exists in DB ${JSON.stringify(error.keyValue)}`)

  }
}
