import {
  Body,
  Controller,
  Logger,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { config } from 'dotenv';
import { CreateCategoryDto } from './dtos/create_category.dto';
config();

const END_POINT = process.env.RABBIT_URL || 'no_url';

@Controller('api/v1/categories')
export class AppController {
  private logger = new Logger(AppController.name);
  private clienteAdminBackend: ClientProxy;

  constructor() {
    this.clienteAdminBackend = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [END_POINT],
        queue: 'admin-backend',
        noAck: false,
      },
    });
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.clienteAdminBackend.emit('create-category', createCategoryDto);
  }
}
