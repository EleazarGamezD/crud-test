import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/entities/user.entity';
import { SeedData } from './data/seed';


@Injectable()
export class SeedService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>) { }


  /**
   * Seed the database with user data.
   *
   * @return {Promise<string>} A message indicating successful creation of users.
   */
  async seed() {
    // Elimina todos los usuarios
    await this.userModel.deleteMany({})
    // Obtén los datos de los usuarios desde SeedData
    const usersData = new SeedData().user;
    // Crea los usuarios con la instruccion inserMany para reducir tiempo de ejecución
    await this.userModel.insertMany(usersData);
    return 'Usuarios creados exitosamente';
  } catch(error) {
    throw new Error(`Error al crear usuarios: ${error.message}`);
  }
}

