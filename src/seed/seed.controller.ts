import { Controller, Post, HttpCode } from '@nestjs/common';
import { SeedService } from './seed.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Seed')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) { }

  @Post()
  @HttpCode(200)
  @ApiResponse({ status: 200, description: 'seed executed', })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Backend Error check logs' })
  create() {
    return this.seedService.seed();
  }

}
