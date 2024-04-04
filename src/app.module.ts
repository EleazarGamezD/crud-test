import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: ['.env'], // Ruta al archivo .env que contiene las variables de entorno
    isGlobal: true, // indica que las variables de entorno son globales
  }),
    UserModule,
  MongooseModule.forRoot(process.env.MONGODBATLAS), //? conexion a la base de datos en mongo atlas
    SeedModule,],

})
export class AppModule { }
