import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }



  @HttpCode(201)
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'User created successfully', type: User })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Backend Error check logs' })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @HttpCode(200)
  @ApiResponse({ status: 200, description: 'List of users', type: User, isArray: true })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Backend Error check logs' })
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':term')
  @ApiParam({ name: 'term', type: String, description: 'User name, email or id', required: true })
  @ApiResponse({ status: 200, description: 'User found', type: User })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Backend Error check logs' })
  findOne(@Param('term') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'User Updated', type: User })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Backend Error check logs' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'User Deleted' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Backend Error check logs' })
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
