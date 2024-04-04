import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{
      name: User.name,
      schema: UserSchema,
    }
    ])
  ],
  exports: [
    MongooseModule //se exporta el modelo para poder ejecutar el seed
  ]
})
export class UserModule { }
