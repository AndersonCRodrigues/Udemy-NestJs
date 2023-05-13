import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateCategoryDto } from './dtos/create_category.dto';
import { ICategory } from './interfaces/category.interface';
import { CategoiesService } from './categoies.service';

@Controller('api/v1/categoies')
export class CategoiesController {
  constructor(private readonly categoriesService: CategoiesService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<ICategory> {
    return this.categoriesService.createCategory(createCategoryDto);
  }

  @Get()
  async getAllCategories(): Promise<ICategory> {
    return this.categoriesService.getAllCategories();
  }
}
