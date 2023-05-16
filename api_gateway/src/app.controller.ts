import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
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
import { Observable } from 'rxjs';
import { UpdateCategoryDto } from './dtos/update_category.dto';
config();

const END_POINT = process.env.RABBIT_URL || 'no_url';

@Controller('api/v1/')
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

  @Post('categories')
  @UsePipes(ValidationPipe)
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    this.clienteAdminBackend.emit('create-category', createCategoryDto);
  }

  @Get('categories')
  getCategory(@Query('idCategory') _id: string): Observable<any> {
    return this.clienteAdminBackend.send('get-categories', _id || '');
  }

  @Patch('categories/:id')
  @UsePipes(ValidationPipe)
  updateCategorie(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): void {
    this.clienteAdminBackend.emit('update-category', {
      id,
      category: updateCategoryDto,
    });
  }
}
